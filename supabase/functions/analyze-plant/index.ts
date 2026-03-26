import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, description } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const messages: any[] = [
      {
        role: "system",
        content: `You are an agricultural plant health analyzer for AgriPio. Analyze plant images/descriptions and provide:
1. Health status: Healthy, Disease Detected, Nutrient Deficiency, Pest Damage, or Water Stress
2. Confidence level (0-100%)
3. Specific diagnosis if unhealthy
4. Actionable advice (3-5 steps)
5. IP tip related to the solution

Respond in JSON format:
{
  "status": "Healthy|Disease|Deficiency|Pest|WaterStress",
  "confidence": 85,
  "diagnosis": "description",
  "advice": ["step1", "step2", "step3"],
  "ipTip": "If you develop a unique treatment, document it as a trade secret!"
}`
      },
      {
        role: "user",
        content: imageBase64 
          ? [
              { type: "text", text: description || "Analyze this plant's health" },
              { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
            ]
          : description || "General plant health check"
      }
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("Plant analysis error:", response.status, t);
      return new Response(JSON.stringify({ error: "Analysis failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "{}";
    
    // Try to parse JSON from the response
    let result;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      result = jsonMatch ? JSON.parse(jsonMatch[0]) : { status: "Unknown", confidence: 0, diagnosis: content, advice: [], ipTip: "" };
    } catch {
      result = { status: "Unknown", confidence: 0, diagnosis: content, advice: ["Please try again with a clearer image"], ipTip: "" };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-plant error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
