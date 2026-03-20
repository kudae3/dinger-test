import NodeRSA from 'node-rsa';
import axios from 'axios';
import { getPaymentToken } from '../services/dinger.service.js';

export const createPayment = async (req, res) => {
    
    const pubKey = `-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJtu2coOqkFaaxLtlnb6DAQRvw
    +6l9iwm6RZlGrAf6IUnZiJavYi60hTveLkFbeYLvvLcFyIGddQDUJBCvEOIk7Gwg
    F6pPRlV9k5g7CDyHbqsjudOix+ElD2XkAiUeYWAK++uRVBqcE/xxwNMDoRwyYqoC
    /OifZf0pH7PA3XCUyQIDAQAB
    -----END PUBLIC KEY-----`;

    try {
        // GET TOKEN
        const token = await getPaymentToken();
        if (!token) return res.status(500).json({ message: "Failed to get token" });    
        console.log("Token:", token);

        // GET DATA FROM POST BODY
        const data = req.body;
        if (!data) return res.status(400).json({ message: "No payload provided" });

        // ENCRYPT DATA
        const key = new NodeRSA();
        key.importKey(pubKey, 'pkcs8-public');
        key.setOptions({ encryptionScheme: 'pkcs1' });

        const encryptedStr = key.encrypt(JSON.stringify(data), 'base64');
        console.log("Encrypted payload:", encryptedStr);

        // Call PAY API
        const response = await axios.post(
            `${process.env.DINGER_BASE_URL}/api/pay`,
            { payload: encryptedStr },
            {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("Pay API response:", response.data);

        res.json({
            message: "Payment created",
            token,
            payload: encryptedStr,
            payResponse: response.data
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creating payment",
            error: error
        });
    }

};