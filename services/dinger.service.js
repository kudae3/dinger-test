import axios from "axios";

const BASE_URL = "https://staging.dinger.asia";

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

    return response.data.token.paymentToken;

};