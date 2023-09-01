const express = require("express");
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
const dotenv = require("dotenv");
const ejs = require("ejs");

dotenv.config();
const API_KEY = process.env.API_KEY;
const MODEL_NAME = "models/chat-bison-001";

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const app = express();
const PORT = process.env.PORT || 3000;

let conversationHistory = [];

async function medicalChatbot(prompt) {
  // Chatbot code here
}

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { chatMessages: conversationHistory });
});

app.post("/", async (req, res) => {
  const userInput = req.body.user_input;

  if (userInput.toLowerCase() === "exit") {
    conversationHistory.push("You: " + userInput);
    conversationHistory.push("Medical Chatbot: Goodbye! Take care.");
  } else {
    conversationHistory.push("You: " + userInput);
    const prompt = conversationHistory.join("\n");

    const response = await medicalChatbot(prompt);
    conversationHistory.push("Medical Chatbot: " + response);
  }

  res.render("index", { chatMessages: conversationHistory });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
