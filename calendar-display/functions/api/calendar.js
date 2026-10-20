export async function onRequestGet() {
  const ICAL_URL = "https://calendar.google.com/calendar/ical/mvgrosskreuz%40gmail.com/private-6967b2d9e8dded3b802e8e991539c06e/basic.ics";

  try {
    const res = await fetch(ICAL_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    if (!res.ok) {
      return new Response(`Upstream error: ${res.statusText}`, { status: res.status });
    }

    const icalData = await res.text();

    return new Response(icalData, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=300"
      }
    });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
