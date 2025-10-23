import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.post("/skill", async (req, res) => {
  const userMessage = req.body.userRequest.utterance;

  const aiResponse = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userMessage }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );

  const answer = aiResponse.data.choices[0].message.content;

  res.json({
    version: "2.0",
    template: {
      outputs: [{ simpleText: { text: answer } }],
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

