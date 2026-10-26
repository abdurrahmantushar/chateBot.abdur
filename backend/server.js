
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
}));

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio Chatbot API is running.",
  });
});

app.post("/ask", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await ai.interactions.create({
      model: "gemini-3.5-flash-lite",
      input: message,
    });

    res.json({
      success: true,
      reply: response.output_text,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
