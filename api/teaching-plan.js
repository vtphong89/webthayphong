export default async function handler(request, response) {
    const { grade } = request.query;

    // Map grade keys to Environment Variables
    const sheetMap = {
        'lop11': process.env.SHEET_TEACHING_PLAN_11,
        'lop12': process.env.SHEET_TEACHING_PLAN_12,
    };

    const sheetUrl = sheetMap[grade];

    if (!sheetUrl) {
        return response.status(404).json({ error: 'Grade or Plan ID not found or not configured' });
    }

    try {
        // Note: If the original URL was pubhtml, we might need to handle it differently, 
        // but assuming we want CSV output as per config.js comments.
        // Ideally, the Env Var should be the CSV publish link.
        // If it's a pubhtml link, we might verify if appending output=csv works, but let's assume valid CSV link in Env Var.

        const res = await fetch(sheetUrl);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.text();

        response.setHeader('Content-Type', 'text/csv; charset=utf-8');
        // Cache for 10 minutes
        response.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
        return response.status(200).send(data);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}
