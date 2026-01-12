export default async function handler(request, response) {
    const { classId } = request.query;

    // Map class IDs to Environment Variables
    const quantityMap = {
        '12C1': process.env.SHEET_STUDENTS_12C1,
        '11B1': process.env.SHEET_STUDENTS_11B1,
        // Add more classes here if needed, corresponding to env vars
    };

    const sheetUrl = quantityMap[classId];

    if (!sheetUrl) {
        return response.status(404).json({ error: 'Class ID not found or not configured' });
    }

    try {
        const res = await fetch(sheetUrl);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.text();

        response.setHeader('Content-Type', 'text/csv; charset=utf-8');
        // Cache for 1 hour (students list doesn't change often)
        response.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
        return response.status(200).send(data);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}
