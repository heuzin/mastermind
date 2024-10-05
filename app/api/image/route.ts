import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) return new NextResponse("UnAuthorized", { status: 401 });

    if (!client.apiKey)
      return new NextResponse("OpenAI API Key Not Configured", { status: 500 });

    if (!prompt) return new NextResponse("Prompt is Required", { status: 400 });

    if (!amount) return new NextResponse("Amount is Required", { status: 400 });

    if (!resolution)
      return new NextResponse("Resolution is Required", { status: 400 });

    const response = await client.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
