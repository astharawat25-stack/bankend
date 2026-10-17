
 import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Test route
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Ask Gemini route
app.post("/api/ask", async (req, res) => {
    const question = req.body.question;

    if (!question || !question.trim()) {
      return res.status(400).json({
        error: "Please enter a question."
      });
    }

    if (!ai) {
      return res.status(500).json({
        error: "API key is missing in .env"
      });
    }

    const result = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: question.trim()
    });

    res.json({ answer: result.text });
  }  catch (error) {
    console.error("Gemini error:", error.message);
    res.status(500).json({
      error: "Gemini could not answer. Please try again."
    });
  }
)};

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


