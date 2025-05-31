import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ValidationResults } from "@/lib/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const VALIDATION_PROMPT = `You are an expert startup advisor and investor with deep knowledge of business analysis, market research, and startup ecosystems. 

Analyze the following startup idea and provide a comprehensive evaluation. Be realistic, balanced, and constructive in your analysis.

STARTUP IDEA:
{IDEA}

Please respond with a detailed analysis in the following JSON format. Be specific and provide actionable insights:

{
  "overallScore": <number between 0-100>,
  "marketPotential": {
    "score": <number between 0-100>,
    "description": "<detailed 2-3 sentence analysis of market potential>",
    "marketSize": "<estimated TAM/SAM with brief explanation>",
    "growth": "<estimated market growth rate with context>"
  },
  "competition": {
    "level": "<Low|Medium|High>",
    "analysis": "<2-3 sentence analysis of competitive landscape>",
    "competitors": ["<list of 2-4 real or potential competitors>"]
  },
  "strengths": ["<list 3-5 key strengths of this idea>"],
  "weaknesses": ["<list 3-4 main weaknesses or challenges>"],
  "opportunities": ["<list 3-4 opportunities for growth or expansion>"],
  "risks": ["<list 3-4 significant risks to be aware of>"],
  "recommendations": ["<list 4-5 specific, actionable recommendations>"],
  "viabilityFactors": {
    "technical": <score 0-100 for technical feasibility>,
    "financial": <score 0-100 for financial viability>,
    "market": <score 0-100 for market readiness>,
    "team": <score 0-100 for team requirements/difficulty>
  }
}

Important guidelines:
- Be realistic and honest in your assessment
- Consider current market trends and conditions
- Provide specific, actionable insights rather than generic advice
- Base scores on realistic evaluation criteria
- Include real competitors when possible
- Consider both B2B and B2C implications where relevant
- Factor in current economic conditions and technology trends

Respond only with valid JSON matching the exact structure above.`;

export async function POST(request: NextRequest) {
  try {
    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { idea } = body;

    // Validate input
    if (!idea || typeof idea !== "string" || idea.trim().length < 10) {
      return NextResponse.json(
        {
          error:
            "Please provide a detailed startup idea (at least 10 characters)",
        },
        { status: 400 }
      );
    }

    // Prepare the prompt
    const prompt = VALIDATION_PROMPT.replace("{IDEA}", idea.trim());

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using GPT-4o for better structured output
      messages: [
        {
          role: "system",
          content:
            "You are an expert startup advisor. Respond only with valid JSON matching the requested structure.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }, // Ensures JSON response
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error("No response from OpenAI");
    }

    // Parse and validate the response
    let validationResults: ValidationResults;
    try {
      validationResults = JSON.parse(responseContent);
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError);
      throw new Error("Invalid response format from AI");
    }

    // Basic validation of the response structure
    if (!validationResults.overallScore || !validationResults.marketPotential) {
      throw new Error("Incomplete response from AI");
    }

    return NextResponse.json({ results: validationResults });
  } catch (error) {
    console.error("Validation API error:", error);

    // Return appropriate error responses
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json(
          { error: "API configuration error" },
          { status: 500 }
        );
      }
      if (
        error.message.includes("quota") ||
        error.message.includes("billing")
      ) {
        return NextResponse.json(
          { error: "API quota exceeded. Please try again later." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to validate startup idea. Please try again." },
      { status: 500 }
    );
  }
}
