import express from "express";
import dotenv from "dotenv";

dotenv.config();

 const app = express();
 const PORT = process.env.PORT || 3000;

 app.use(express.json());

//  app.get("/apl/herlth",(req, res)=>{
//     res.json({
//         "message server is working",

//     });
 
// });

// app.post("/api/ask",(req,res)=>{
//     const question = req.body.question;
//     res.json({
//         message : "question received",
//         yourQuestion: question
//     });
// });

// app.listen(PORT,()=>{
//     console.log(`Server running at http://localhost:${PORT}`);
// });

mport express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;


const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    })
  : null;


app.use(express.json());
app.use(express.static("public"));


app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is working!",
  });
});


app.post("/api/name", (req, res) => {
  const name = req.body.name;

  if (!name || !name.trim()) {
    return res.status(400).json({
      error: "Please enter your name.",
    });
  }

  
  console.log("User entered:", name);

  
  res.json({
    message: `Hello, ${name.trim()}data`,
  });
});


app.post("/api/ask", async (req, res) => {
  try {
    const question = req.body.question;

    if (!question || !question.trim()) {
      return res.status(400).json({
        error: "Please enter a question.",
      });
    }

    if (!ai) {
      return res.status(500).json({
        error: "API key is missing in .env",
      });
    }

    const result = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: question.trim(),
    });

    console.log("Gemini question:", question.trim());

    res.json({
      answer: result.text,
    });
  } catch (error) {
    console.error("Gemini error:", error.message);

    res.status(500).json({
      error: "Gemini AI request failed. Please try again.",
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
