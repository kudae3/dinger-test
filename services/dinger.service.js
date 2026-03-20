import axios from "axios";

const BASE_URL = process.env.DINGER_BASE_URL || "https://api.dinger.asia/";

const projectName = "sannkyi staging";
const apiKey = "m7v9vlk.eaOE1x3k9FnSH-Wm6QtdM1xxcEs";
const merchantName = "mtktest";

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