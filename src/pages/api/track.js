import { db, collection, addDoc } from '../../../firebaseConfig'

export default async function handler(req, res) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "POST") {
        const { event, data, timestamp } = req.body;
        const userAgent = req.headers["user-agent"]; // Extract User-Agent from headers
        try {
            await addDoc(collection(db, "analytics"), {
                event,
                data,
                timestamp: timestamp || new Date().toISOString(),
                userAgent, // Log the User-Agent
                userAgent: req.headers["user-agent"], // Capture User-Agent
            });
            res.status(200).json({ message: "Event logged successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to log event" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
