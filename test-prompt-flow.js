// Test complet du flux multilingue
const testFlow = async () => {
  const brief = "Create a Facebook post aimed at engaging the audience for Smartcore Express, a delivery service from the USA to Haiti in just 3 to 5 days, respecting 5 hashtags, professional tone, targeted audience, 3 distinct variations, with a clear CTA in each.";
  
  console.log("🔍 Step 1: Parse Intent");
  const parseResponse = await fetch("http://localhost:3001/api/parse-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ brief })
  });
  
  const { intent } = await parseResponse.json();
  console.log("Intent detected:", intent);
  
  console.log("\n🔧 Step 2: Prompt Builder");
  const promptResponse = await fetch("http://localhost:3001/api/prompt-builder", {
    method: "POST", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ intent, brief })
  });
  
  if (!promptResponse.ok) {
    console.error("Prompt builder error:", await promptResponse.text());
    return;
  }
  
  const promptData = await promptResponse.json();
  console.log("Generated prompt:", promptData.prompt);
  
  console.log("\n🎯 Step 3: Generate");
  const generateResponse = await fetch("http://localhost:3001/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: promptData.prompt,
      options: { seoBoost: true, maxHashtags: 5 }
    })
  });
  
  if (!generateResponse.ok) {
    console.error("Generation error:", await generateResponse.text());
    return;
  }
  
  const result = await generateResponse.json();
  console.log("Generated variants:");
  result.variants.forEach((variant, i) => {
    console.log(`\nVariant ${i + 1}:`);
    console.log(variant);
  });
};

testFlow().catch(console.error);

