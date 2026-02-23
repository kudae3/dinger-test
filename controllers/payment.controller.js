// import { getPaymentToken } from "../services/dinger.service.js";

import { getPaymentToken } from "../services/dinger.mock.js";

export const createPayment = async (req, res) => {

    try {
        const token = await getPaymentToken();
        console.log(token);
        res.json({
            message: "Token received",
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating payment",
            error: error.message
        });

    }

};