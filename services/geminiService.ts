import { GoogleGenAI } from "@google/genai";
import { AccessLog } from '../types';

export const analyzeSystemHealth = async (logs: AccessLog[]): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Demo Mode: API Key not found. Ensure process.env.API_KEY is set for live AI analysis. \n\n(Simulated Response): System analysis detects sporadic sync failures with ZKTeco devices in the basement sector. Recommend checking network latency for Device dev_3.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const logSummary = logs.map(l => 
      `[${l.timestamp}] ${l.device} (${l.deviceType}): ${l.action} - ${l.details}`
    ).join('\n');

    const prompt = `
      Analyze the following access control logs for a commercial real estate system.
      Identify any security risks, hardware malfunctions, or patterns of failure.
      Keep it brief (under 50 words) and professional.
      
      Logs:
      ${logSummary}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Analysis complete. No anomalies detected.";
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return "AI Analysis unavailable at this moment.";
  }
};