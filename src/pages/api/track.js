import { db, collection, addDoc } from '../../../firebaseConfig'

export default async function handler(req, res) {
    // Set CORS headers for all requests
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight (OPTIONS) request
    if (req.method === "OPTIONS") {
        res.status(200).end(); // Respond to preflight
        return;
    }

    if (req.method === "POST") {
        try {
            const { event, data, timestamp, userAgent } = req.body;

            await addDoc(collection(db, "analytics"), {
                event,
                data,
                timestamp: timestamp || new Date().toISOString(),
                userAgent, // Log the User-Agent
                userAgent: req.headers["user-agent"], // Capture User-Agent
            });
            console.log("Received Event:", { event, data, timestamp, userAgent });
            res.status(200).json({ message: "Event logged successfully" });
        } catch (error) {
            console.error("Error processing request:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
