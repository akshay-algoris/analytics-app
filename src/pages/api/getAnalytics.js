// pages/api/getAnalytics.js
import { db, collection, addDoc } from '../../../firebaseConfig'
import { getDocs } from "firebase/firestore";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const snapshot = await getDocs(collection(db, "analytics"));
            const data = snapshot.docs.map((doc) => doc.data());
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch data", details: error.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
