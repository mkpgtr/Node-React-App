const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000
const dotenv = require('dotenv');
const {MONGO_URI} = require('./db/connect')
const authRoute = require('./routes/auth_route.js')
const salesRoute = require('./routes/sale_routes.js')
const authMiddleware = require('./middleware/auth_middleware')

mongoose.connect(MONGO_URI)
mongoose.connection.on('connected',()=>{
    console.log('connected')
})
mongoose.connection.on('error',(error)=>{
    console.log('some error while connecting to DB')
})


app.use(cors());
app.use(express.json());

// !  I have not used this anywhere. not removing it for the fear of breaking my nice working code.
dotenv.config();

require('./models/user_model');


app.use('/api/auth',authRoute);

// ! this is so important! whenever the request comes, it must go through the authMiddleware. I love this idea of nodeJS.
// ! it's like some guard who is registered who is coming.
// ! also it helps us to know which user is logged in after we verify the jwt token.
app.use('/api/sales',authMiddleware,salesRoute);

app.listen(PORT,()=>{
    console.log(`App running on ${PORT}`)
    console.log(MONGO_URI)
})
