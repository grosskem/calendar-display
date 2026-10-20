export async function onRequestGet(context) {
  // Paste your full secret iCal link here (ensure it is wrapped in quotes)
  const ICAL_URL = "https://calendar.google.com/calendar/ical/mvgrosskreuz%40gmail.com/private-6967b2d9e8dded3b802e8e991539c06e/basic.ics";

  try {
    const upstreamResponse = await fetch(ICAL_URL, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/calendar, text/plain, */*"
      }
    });

    if (!upstreamResponse.ok) {
      return new Response(`Google responded with error status: ${upstreamResponse.status} ${upstreamResponse.statusText}`, {
        status: upstreamResponse.status,
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    const icsData = await upstreamResponse.text();

    return new Response(icsData, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store, no-cache, must-revalidate"
      }
    });
  } catch (err) {
    return new Response(`Fetch failed inside Cloudflare: ${err.message}`, {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
}
