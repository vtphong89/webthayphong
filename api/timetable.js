export default async function handler(request, response) {
  const sheetUrl = process.env.TIMETABLE_SHEET_URL;

  if (!sheetUrl) {
    return response.status(500).json({ error: 'TIMETABLE_SHEET_URL is not configured' });
  }

  try {
    const res = await fetch(sheetUrl);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const data = await res.text();
    
    response.setHeader('Content-Type', 'text/csv; charset=utf-8');
    // Cache for 5 minutes
    response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    return response.status(200).send(data);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
