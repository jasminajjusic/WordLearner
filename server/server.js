require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({ token: process.env.CO_API_KEY });
const app = express();

app.use(cors());
app.use(express.json());

app.post("/generate-words", async (req, res) => {
  const { language = "Bosnian", count = 5 } = req.body;

  try {
    const prompt = `Generate ${count} simple English words for a language learning game. 
Also provide their translation in ${language}. 
Return the response strictly as a JSON array of objects with "question" and "answer" fields. Example:
[
  { "question": "Dog", "answer": "Pas" }
]`;

    const response = await cohere.chat({
      model: "command-xlarge-nightly",
      message: prompt,
      temperature: 0.7,
    });

    let words;
    try {
      words = JSON.parse(response.text);
    } catch (e) {
      const firstBracket = response.text.indexOf("[");
      const lastBracket = response.text.lastIndexOf("]");
      if (firstBracket !== -1 && lastBracket !== -1) {
        const jsonString = response.text.substring(
          firstBracket,
          lastBracket + 1
        );
        words = JSON.parse(jsonString);
      } else {
        return res
          .status(500)
          .json({ error: "Cannot parse JSON from AI response" });
      }
    }

    res.json({ words });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
