import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.DINGER_BASE_URL;
const projectName = process.env.DINGER_PROJECT_NAME;
const apiKey = process.env.DINGER_API_KEY;
const merchantName = process.env.DINGER_MERCHANT_NAME || "PayT";
const normalizedBaseUrl = (BASE_URL || '').replace(/\/+$/, '');

export const getPaymentToken = async () => {
    console.log(BASE_URL);
    
    const response = await axios.get(`${normalizedBaseUrl}/api/token`, {
        params: {
            projectName,
            apiKey,
            merchantName
        }
    });
    console.log('Token Response', response);
    return response.data.response.paymentToken;

};