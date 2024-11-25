import type { APIRoute } from 'astro';

interface CounterRequest {
  id: string;
  hostname: string;
  pathname: string;
  referrer: string;
  title: string;
  screenRes: string;
  utcoffset: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json() as CounterRequest;
    
    const response = await fetch("https://counter.dev/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Counter.dev responded with ${response.status}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage 
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}; 