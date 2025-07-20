export const dynamic = 'force-dynamic';

function splitTextIntoChunks(text: string, maxLength: number = 400): string[] {
  const lines = text.split('\n');
  const chunks: string[] = [];
  let currentChunk = '';

  for (const line of lines) {
    if (line.length > maxLength) {
      // If a single line is too long, split it by sentences
      const sentences = line.split(/[.!?]+/).filter(Boolean);
      for (const sentence of sentences) {
        if ((currentChunk + sentence).length < maxLength) {
          currentChunk += sentence + '. ';
        } else {
          if (currentChunk.trim()) chunks.push(currentChunk.trim());
          currentChunk = sentence + '. ';
        }
      }
    } else if ((currentChunk + line).length < maxLength) {
      currentChunk += line + '\n';
    } else {
      if (currentChunk.trim()) chunks.push(currentChunk.trim());
      currentChunk = line + '\n';
    }
  }
  
  if (currentChunk.trim()) chunks.push(currentChunk.trim());
  return chunks;
}

// Helper function to translate a single chunk
async function translateChunk(text: string, targetLang: string): Promise<string> {
  const encodedText = encodeURIComponent(text);
  
  const response = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${targetLang}`,
    {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    }
  );

  if (!response.ok) {
    throw new Error(`Translation failed: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.responseStatus === 200 || data.responseStatus === '200') {
    return data.responseData.translatedText;
  } else {
    throw new Error(`Translation API error: ${data.responseDetails}`);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, targetLang } = body;
    
    if (!text) {
      return Response.json({ translatedText: 'No text provided' }, { status: 400 });
    }

    const targetLanguage = targetLang || 'ur';
    
    // Split text into manageable chunks
    const chunks = splitTextIntoChunks(text, 400);

    
    // Translate each chunk with a small delay between requests
    const translatedChunks: string[] = [];
    
    for (let i = 0; i < chunks.length; i++) {
      try {
        console.log(`Translating chunk ${i + 1}/${chunks.length}`);
        const translatedChunk = await translateChunk(chunks[i], targetLanguage);
        translatedChunks.push(translatedChunk);
        
        // Small delay to avoid rate limiting (except for last chunk)
        if (i < chunks.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error(`Error translating chunk ${i + 1}:`, error);
        // If one chunk fails, use original text for that chunk
        translatedChunks.push(chunks[i]);
      }
    }
    
    const translatedText = translatedChunks.join('\n');
    console.log('Translation completed successfully');
    
    return Response.json({ translatedText });

  } catch (error) {
    console.error("Translation error:", error);
    return Response.json({ 
      translatedText: 'Translation error occurred' 
    }, { status: 500 });
  }
}
