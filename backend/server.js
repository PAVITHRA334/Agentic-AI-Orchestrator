const express = require('express');
const cors = require('cors');
const Groq = require("groq-sdk");

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your actual key
const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

const HISTORY_LIMIT = 100;

app.post('/decide', async (req, res) => {
    const { liveData } = req.body;
    const data = Number(liveData);

    try {
        // AI Call - Attempting to get decision from Llama 3
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a smart city energy agent. The historical limit is 100 units. Give a 1-sentence smart decision."
                },
                {
                    role: "user",
                    content: `The current live data is ${data} units. Compare with limit 100 and suggest an action.`
                }
            ],
            model: "llama3-8b-8192",
        });

        const aiDecision = chatCompletion.choices[0].message.content;
        res.json({ decision: aiDecision });

    } catch (error) {
        // Fallback Logic - If AI is busy/offline, this runs
        console.log("AI Offline, using Local Agent Logic");
        let localDecision = "";
        
        if (data > 100) {
            localDecision = `⚠️ ALERT: Current usage (${data}) exceeds limit! Suggesting load shedding in Sector A.`;
        } else if (data > 80) {
            localDecision = `ℹ️ WARNING: Usage at ${data} units. Optimizing grid distribution.`;
        } else {
            localDecision = `✅ STABLE: System optimal at ${data} units. No action required.`;
        }
        
        res.json({ decision: localDecision });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Sparkle Stars Backend on port ${PORT}`));