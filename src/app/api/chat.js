// pages/api/chat.js
import { Configuration, OpenAIApi } from 'openai';
import React from 'react';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Store API key in environment variable
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003", // Example model
        prompt: prompt,
        max_tokens: 100,
      });

      const answer = response.data.choices[0].text.trim();
      res.status(200).json({ answer });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
