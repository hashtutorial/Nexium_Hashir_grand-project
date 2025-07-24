export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = body.input;
    const payload = {
      title: "Recipe Request",
      content: input
    };

    const webhookRes = await fetch('http://localhost:5678/webhook/recipe-generator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload), 
    });

    if (!webhookRes.ok) {
      console.error("Webhook request failed:", webhookRes.statusText);
      return Response.json({ recipe: 'Failed to fetch recipe.' }, { status: 500 });
    }

  
    const data = await webhookRes.json();

    const recipe = data.recipe || 'No recipe returned.';

    return Response.json({ recipe });
  } catch (error) {
    console.error("Server error:", error);
    return Response.json({ recipe: 'Server error occurred.' }, { status: 500 });
  }
}


