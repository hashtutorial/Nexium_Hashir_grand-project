import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    //Create Supabase client for route handler with cookies
    const supabase = createRouteHandlerClient({ cookies });
    
    //Get the current user from session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return Response.json({ 
        success: false, 
        error: 'Unauthorized' 
      }, { status: 401 });
    }

    const body = await req.json();
    const input = body.input;
    const userId = user.id;
    
    const payload = {
      title: "Recipe Request",
      content: input
    };
    
    const webhookRes = await fetch('https://hashir123.app.n8n.cloud/webhook/summarize-blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload), 
    });
    
    if (!webhookRes.ok) {
      throw new Error(`n8n webhook failed: ${webhookRes.status}`);
    }
    
    const data = await webhookRes.json();

    //Parse the recipe text to extract structured data
    const recipeText = data.recipe || 'No recipe returned.';
    
    //Extract title (first line that looks like a title)
    const titleMatch = recipeText.match(/^(.+?)(?:\n|$)/);
    const title = titleMatch ? titleMatch[1].trim() : 'Untitled Recipe';
    
    //Extract ingredients (text between "Ingredients:" and "Instructions:")
    const ingredientsMatch = recipeText.match(/Ingredients?:\s*\n([\s\S]*?)(?:\n\s*(?:Instructions?|For the|$))/i);
    let ingredients: string[] = [];
    if (ingredientsMatch) {
      ingredients = ingredientsMatch[1]
        .split('\n')
        .map((line: string) => line.trim())
        .filter((line: string) => line && (line.startsWith('*') || line.startsWith('-') || line.match(/^\d+/)))
        .map((line: string) => line.replace(/^[\*\-]\s*/, '').replace(/^\d+\.?\s*/, '').trim())
        .filter((line: string) => line.length > 0);
    }
    
    // Extract steps (text after "Instructions:")
    const instructionsMatch = recipeText.match(/Instructions?:\s*\n([\s\S]*?)$/i);
    let steps: string[] = [];
    if (instructionsMatch) {
      steps = instructionsMatch[1]
        .split('\n')
        .map((line: string) => line.trim())
        .filter((line: string) => line && (line.match(/^\d+\./) || line.length > 20))
        .map((line: string) => line.replace(/^\d+\.?\s*/, '').trim())
        .filter((line: string) => line.length > 0);
    }
    
    const recipeData = {
      user_id: userId,
      title: title,
      ingredients: ingredients,
      steps: steps,
      translated_urdu: null 
    };

    // Insert recipe into Supabase
    const { data: insertedRecipe, error: insertError } = await supabase
      .from('recipes')
      .insert([recipeData])
      .select()
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      throw new Error(`Failed to save recipe: ${insertError.message}`);
    }

    // Return the saved recipe data
    return Response.json({ 
      success: true,
      recipe: insertedRecipe,
      message: 'Recipe saved successfully'
    });

  } catch (error) {
    console.error("Server error:", error);
    return Response.json({ 
      success: false,
      error: 'Server error occurred.',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
