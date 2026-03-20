import NodeRSA from 'node-rsa';
import axios from 'axios';
import { getPaymentToken } from '../services/dinger.service.js';
import dotenv from 'dotenv';
dotenv.config();

export const createPayment = async (req, res) => {
    
    const pubKey = `-----BEGIN PUBLIC KEY-----
        MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgupjRRaxErhsnFD/6tWrgONUq7H9Td+gcBZ0rfg75v5pStPNxBYx7/C6pDKzRPGSo/1R+1eQnLdsxbGOykhUCpgoDLzCOtqjGSsx0xLAXa4ZNpij+wJ3yUlGWgNDnPcHy2mr2Q9vRbM/rTlemLuNRnPNYZeg9TH3yPB2Xv91B4QIDAQAB
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
            `${process.env.DINGER_BASE_URL}api/pay`,
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