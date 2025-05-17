/**
 * This module contains specialized prompts and parsers for English language exercises
 * Separating these from the main ProcessingHelper to simplify maintenance
 */

// Extraction prompt for OpenAI - used to analyze screenshots of English exercises
export const OpenAIEnglishExtractionPrompt = {
  system: `You are an assistant specialized in analyzing English language exercises.
Extract all relevant information from screenshot images and respond ONLY with valid JSON.
DO NOT include explanations, markdown formatting, or any other text in your response.

The JSON MUST include these fields:
- exercise_type: type of exercise (reading, grammar, vocabulary, etc.)
- instructions: exercise instructions or directions
- content_to_analyze: text content being analyzed
- questions: array of questions or tasks to complete`,

  user: `Extract all details from these English language exercise screenshots.
Return ONLY a valid parseable JSON object with the following structure:
{
  "exercise_type": "reading/grammar/vocabulary/etc.",
  "instructions": "exercise instructions here",
  "content_to_analyze": "text content to analyze here",
  "questions": ["question1", "question2"]
}

Just return the JSON. Do not include any other text, explanation, or formatting.`
};

// Extraction prompt for Anthropic Claude
export const AnthropicEnglishExtractionPrompt = `Please analyze these English language exercise screenshots and extract all information.
Return ONLY a valid JSON object with this structure. No explanations or other content:

{
  "exercise_type": "reading/grammar/vocabulary/etc.",
  "instructions": "exercise instructions here",
  "content_to_analyze": "text content to analyze here",
  "questions": ["question1", "question2"]
}`;

// Extraction prompt for Gemini
export const GeminiEnglishExtractionPrompt = `Extract all details from these English language exercise screenshots.
Return ONLY a valid parseable JSON object with the following structure:
{
  "exercise_type": "reading/grammar/vocabulary/etc.",
  "instructions": "exercise instructions here",
  "content_to_analyze": "text content to analyze here",
  "questions": ["question1", "question2"]
}

Just return the JSON. Do not include any other text, explanation, or formatting.`;

// Solution generation for English exercises - OpenAI
export const OpenAIEnglishSolutionPrompt = `You are an expert English language tutor.
I'll provide you with an English exercise, and I need your detailed answer.

EXERCISE TYPE: {{exercise_type}}

INSTRUCTIONS: {{instructions}}

CONTENT TO ANALYZE: {{content_to_analyze}}

QUESTIONS: {{questions}}

Provide a structured response with:
1. Direct answers to all questions
2. Grammatical explanations where relevant
3. Key language concepts demonstrated
4. Alternative expressions (if applicable)

Use clear, thorough explanations suitable for English learners.`;

// Solution generation for English exercises - Claude
export const AnthropicEnglishSolutionPrompt = `Act as an English language tutor answering this exercise:

EXERCISE TYPE: {{exercise_type}}

INSTRUCTIONS: {{instructions}}

CONTENT TO ANALYZE: {{content_to_analyze}}

QUESTIONS: {{questions}}

Structure your response with these sections:
1. ANSWERS: Clear, direct responses to all questions
2. EXPLANATIONS: Grammatical analysis and reasoning
3. KEY CONCEPTS: Important language principles demonstrated
4. ALTERNATIVES: Other ways to express the same ideas (if relevant)`;

// Solution generation for English exercises - Gemini
export const GeminiEnglishSolutionPrompt = `You are an expert English language tutor.
I'll provide you with an English exercise, and I need your detailed answer.

EXERCISE TYPE: {{exercise_type}}

INSTRUCTIONS: {{instructions}}

CONTENT TO ANALYZE: {{content_to_analyze}}

QUESTIONS: {{questions}}

Provide a structured response with:
1. Direct answers to all questions
2. Grammatical explanations where relevant
3. Key language concepts demonstrated
4. Alternative expressions (if applicable)

Use clear, thorough explanations suitable for English learners.`;

// Helper function to replace tokens in prompts
export function fillEnglishPromptTemplate(template: string, data: any): string {
  return template
    .replace('{{exercise_type}}', data.exercise_type || 'English exercise')
    .replace('{{instructions}}', data.instructions || 'No specific instructions provided')
    .replace('{{content_to_analyze}}', data.content_to_analyze || 'No content provided')
    .replace('{{questions}}', Array.isArray(data.questions) 
      ? data.questions.join('\n') 
      : (data.questions || 'No specific questions provided'));
}

// Extract sections from English answer responses
export function parseEnglishResponse(responseText: string): { 
  answer: string, 
  explanation: string, 
  keyPoints: string[], 
  alternatives: string 
} {
  // Extract answer section
  const answerRegex = /(?:Answer[s]?:|Response:|Solution:|1\.)([\s\S]*?)(?:(?:2\.|Explanation[s]?:|Analysis:|Key Points:|Key Concepts:|Alternative[s]?:|$))/i;
  const answerMatch = responseText.match(answerRegex);
  const answer = answerMatch && answerMatch[1] 
    ? answerMatch[1].trim() 
    : "Answer not found in the response";

  // Extract explanation section
  const explanationRegex = /(?:2\.|Explanation[s]?:|Analysis:|Reasoning:)([\s\S]*?)(?:(?:3\.|Key Points:|Key Concepts:|Alternative[s]?:|$))/i;
  const explanationMatch = responseText.match(explanationRegex);
  const explanation = explanationMatch && explanationMatch[1] 
    ? explanationMatch[1].trim() 
    : "";
  
  // Extract key points section
  const keyPointsRegex = /(?:3\.|Key Points:|Key Concepts:|Important Points:)([\s\S]*?)(?:(?:4\.|Alternative[s]?:|$))/i;
  const keyPointsMatch = responseText.match(keyPointsRegex);
  let keyPoints: string[] = [];
  
  if (keyPointsMatch && keyPointsMatch[1]) {
    // Extract bullet points or numbered items
    const bulletPoints = keyPointsMatch[1].match(/(?:^|\n)\s*(?:[-*•]|\d+\.)\s*(.*)/g);
    if (bulletPoints) {
      keyPoints = bulletPoints.map(point => 
        point.replace(/^\s*(?:[-*•]|\d+\.)\s*/, '').trim()
      ).filter(Boolean);
    } else {
      // If no bullet points found, split by newlines and filter empty lines
      keyPoints = keyPointsMatch[1].split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
    }
  }
  
  // Extract alternatives section
  const alternativesRegex = /(?:4\.|Alternative[s]?:|Other Ways to Express:|Other Expressions:)([\s\S]*?)(?:$)/i;
  const alternativesMatch = responseText.match(alternativesRegex);
  const alternatives = alternativesMatch && alternativesMatch[1] 
    ? alternativesMatch[1].trim() 
    : "";

  return {
    answer,
    explanation,
    keyPoints: keyPoints.length > 0 ? keyPoints : ["Key language concepts in this exercise"],
    alternatives
  };
}