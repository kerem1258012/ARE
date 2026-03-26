import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const GROQ_API_URL = "https://api.groq.com/v1/llama3.3/completions";

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: text, max_tokens: 150 })
    });

    const data = await response.json();
    const reply = data.output || data.completion || "Cevap alınamadı";

    res.status(200).json({ reply });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
