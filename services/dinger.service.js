import axios from "axios";

const BASE_URL = process.env.DINGER_BASE_URL;
const projectName = process.env.DINGER_PROJECT_NAME;
const apiKey = process.env.DINGER_API_KEY;
const merchantName = process.env.DINGER_MERCHANT_NAME || "PayT";

export const getPaymentToken = async () => {
    const response = await axios.get(`${BASE_URL}/api/token`, {
        params: {
            projectName,
            apiKey,
            merchantName
        }
    });
    console.log('Token Response', response);
    return response.data.token.paymentToken;

};