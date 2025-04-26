import { NextResponse, NextRequest } from "next/server";
import { GoogleGenAI } from "@google/genai";


export async function POST(req: NextRequest){
    try {
        const body = await req.json() 
        const { message } = body
        const ai = new GoogleGenAI({ apiKey : process.env.GEMINI_API_KEY})
        
        const config = {
            responseMimeType : 'text/plain'
        }

        const model = 'gemini-2.0-flash';
    
        const contents = [{
            role : 'user',
            parts : [
                {
                    text: message
                }
            ]
        }]
        
        const aiResponse = await ai.models.generateContent({
            model: model,
            contents: contents,
            config : config
        })

        return NextResponse.json({ response : aiResponse.text})
    } catch (error){
        console.log(error)
    }
}