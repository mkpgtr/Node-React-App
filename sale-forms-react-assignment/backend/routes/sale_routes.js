const express = require('express');
const router = express.Router();
const Sale = require('../models/sale_model.js')

router.post('/add-sale', async (req, res) => {

    const { product_name, quantity, amount } = req.body;

    if(!product_name || !quantity || ! amount){

        return res.status(404).json({msg:'empty values not allowed.'})
    }



    // ! a lot of things remain commented because I was experimenting and I want to document my process so leaving them as they are


    // if(!product_name || !quantity || !amount){
    //     throw new Error()
    // }

    try {

        const sale = await Sale.create({ product_name, quantity: parseInt(quantity), amount: parseInt(amount)  });
        res.status(201).json({ sale, msg: 'Sale added Successfully' });
    } catch (error) {
        res.status(404).json({ msg: error })
    }



})

router.get('/top-five', async (req, res) => {

    // let today = new Date()

    
    // let tomorrow = new Date();
    // tomorrow.setDate(today.getDate() + 1)

    // let yesterday = new Date();
    // yesterday.setDate(today.getDate() - 1)

    // let todayObject = {
    //     year: today.getFullYear(),
    //     month: today.getMonth(),
    //     date: today.getDate()
    // }

    // let tomorrowObject = {
    //     year: tomorrow.getFullYear(),
    //     month: tomorrow.getMonth(),
    //     date: tomorrow.getDate()
    // }

//     const date = new Date();
// const month = date.getMonth(); // ! 02
// const year = date.getFullYear(); // ! this gives 2023
// const startDate = new Date(year, month, date.getDate());
// const endDate = new Date(year, month, date.getDate()+1); // ! this gives 2023-02-08:30:00.000Z








// ! descending order arrangement on the amount field arranges the documents according to the highest amounts

// ! because we want only top five records we limit the documents with limit(5) after fetching all documents in descending order

    const documentsFromToday = await Sale.find({}).sort({amount:'desc'}).limit(5) // ! this will arrange the documents received in descending order



    res.send({ documentsFromToday, msg: "top five from the backend" });
})

router.get('/revenue-today', async(req, res) => {
    const date = new Date();
    const month = date.getMonth(); // ! 02
    const year = date.getFullYear(); // ! this gives 2023
    const startDate = new Date(year, month, date.getDate());
    const endDate = new Date(year, month, date.getDate()+1); // ! this gives 2023-02-08:30:00.000Z
    
    
    
    const filters = {
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
    }

   try {
    // const documentsFromToday = await Sale.find({}).where(filters).sort({amount:'desc'})
    // const revenue = await Sale.find({}).where(filters).sort({amount:'desc'});
    // ! this sum_val field with be received in the frontend component where we get today's revenue
    const revenue = await Sale.aggregate([
        // ! these filters will help us to find today's revenue. after midnight, they will be reset for the next day.
        {$match:filters},
       {$group:{_id:null, sum_val:{$sum:"$amount"}}}
    ]);


    res.status(200).json({ revAmount:revenue });
    
   } catch (error) {
    res.status(404).json({msg:error})
   }
})


module.exports = router;