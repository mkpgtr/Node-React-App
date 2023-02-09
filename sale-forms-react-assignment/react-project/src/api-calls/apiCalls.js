import axios from 'axios'
const baseURL = 'http://localhost:5000'



// ! this utility function is called whenever we need the token

// ! earlier while I was trying to get the token by defining once on the top of the file, sometimes the token was undefined
// ! but now whenever we need the token we can get it by calling prepareHeaders
const prepareHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user?.token;
    // ! we will send this with axios to the backend so that our backend will know which user it is.
    // ! the token is long string that is secure. we run the jwt.verify function in the backend to know which user it is.
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    return config;

}












export const registerUser = async (data) => {
    try {
        return await axios.post(`${baseURL}/api/auth/register`, data)
    } catch (error) {
        return error.response
    }
}

export const loginUser = async (data) => {
    try {
        return await axios.post(`${baseURL}/api/auth/login`, data)
    } catch (error) {
        return error.response
    }
}

export const addSaleAxiosCall = async (data) => {
    const config = prepareHeaders();

    try {
        return await axios.post(`${baseURL}/api/sales/add-sale`, data, config)

    } catch (error) {
        return error.response
    }
}

export const getTopFiveApiCall = async () => {

    const config = prepareHeaders();
    try {
        return await axios.get(`${baseURL}/api/sales/top-five`, config)

    } catch (error) {
        return error.response
    }
}

export const getTodaysRevenue = async () => {

    const config = prepareHeaders()
    try {
        return await axios.get(`${baseURL}/api/sales/revenue-today`, config)

    } catch (error) {
        return error.response
    }
}