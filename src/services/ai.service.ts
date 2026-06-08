import OpenAI from "openai";

import { aiResponseSchema } from "../validations/analysis.validation";

import ApiError from "../utils/ApiError";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const analyzeTranscript = async (transcript: any[]) => {
  const formattedTranscript = transcript
    .map((entry) => `[${entry.timestamp}] ${entry.speaker}: ${entry.text}`)
    .join("\n");

  const prompt = `
You are an AI meeting assistant.

Analyze ONLY the provided transcript.

STRICT RULES:
- Do NOT invent information
- Do NOT infer missing details
- Use ONLY transcript content
- Every output MUST include citations
- Return valid JSON only
- No markdown formatting

Required JSON structure EXACTLY:

{
  "summary": [
    {
      "text": "string",
      "citations": [
        {
          "timestamp": "string"
        }
      ]
    }
  ],
  "actionItems": [
    {
      "task": "string",
      "assignee": "string",
      "citations": [
        {
          "timestamp": "string"
        }
      ]
    }
  ],
  "decisions": [
    {
      "text": "string",
      "citations": [
        {
          "timestamp": "string"
        }
      ]
    }
  ],
  "followUps": [
    {
      "text": "string",
      "citations": [
        {
          "timestamp": "string"
        }
      ]
    }
  ]
}

Return ONLY valid JSON.
No markdown.
No explanation.
No extra text.

Transcript:
${formattedTranscript}
`;

  let completion;

  try {
    completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0,
    });
  } catch (error: any) {
    throw new ApiError(500, "AI_SERVICE_ERROR", error.message);
  }

  const responseText = completion.choices[0].message.content
    ?.replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  if (!responseText) {
    throw new ApiError(500, "AI_RESPONSE_ERROR", "Empty AI response");
  }

  let parsed;

  try {
    parsed = JSON.parse(responseText);
  } catch {
    throw new ApiError(500, "AI_RESPONSE_ERROR", "Invalid AI JSON response");
  }

  const validated = aiResponseSchema.safeParse(parsed);

  if (!validated.success) {
    throw new ApiError(
      500,
      "AI_VALIDATION_ERROR",
      "AI response validation failed",
    );
  }

  return validated.data;
};
