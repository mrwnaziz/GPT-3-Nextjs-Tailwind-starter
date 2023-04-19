const OpenAI = require("openai-api");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async (req, res) => {
  // Promt values
  const beforePromt = `You are an expert on Government Innovation. You speak on behalf Mohammed bin Rashid Center for Government Innovation "MBRCGI", so, be professional, direct, and helpful. You are MBRCGI's chatbot and your purpose is to help government innovators find answers to their key question. I'll now write you a question to help me answer it, use sources from ibtekr.org and mbrcgi.gov.ae, oecd-opsi.org, and nesta.co.uk , here's the question:`;
  const afterPromt = ``;
  const breakPoint = '\n\n\'\'\'\n\n';

  // Construct the prompt
  let prompt = `${beforePromt} ${breakPoint} ${req.body.name} ${breakPoint} ${afterPromt}`;

  // Log promt
  console.log(prompt);

  // Call OpenAI API
  const gptResponse = await openai.complete({
    engine: "text-davinci-002",
    prompt: `${prompt}`,
    maxTokens: 1500,
    temperature: 0.7,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0.5,
    bestOf: 1,
    n: 1,
  });

  res.status(200).json({ text: `${gptResponse.data.choices[0].text}` });
};

// model: "text-davinci-002",
// prompt: "Write a long form social media post based on this Content that will engage a reader into conversation, include a summary of the Content",
