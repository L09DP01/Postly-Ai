import { NextResponse } from "next/server";
import { z } from "zod";
import { openai } from "@/lib/ai/openai";
import { PARSE_INTENT_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { ParseIntentReqSchema, IntentSchema } from "@/lib/zod-schemas";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { brief } = ParseIntentReqSchema.parse(body);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: PARSE_INTENT_SYSTEM_PROMPT },
        { role: "user", content: brief },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const rawIntent = completion.choices[0]?.message?.content ?? "{}";
    const parsedIntent = IntentSchema.parse(JSON.parse(rawIntent));

    return NextResponse.json({ intent: parsedIntent });
  } catch (error) {
    console.error("Error in /api/parse-intent:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request data", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to parse intent" }, { status: 500 });
  }
}