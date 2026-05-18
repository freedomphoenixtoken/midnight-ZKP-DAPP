export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const xummApiKey = process.env.XUMM_API_KEY || process.env.VITE_XUMM_API_KEY;
    const xummApiSecret = process.env.XUMM_API_SECRET || process.env.VITE_XUMM_API_SECRET;

    const uuid = event.queryStringParameters?.uuid;
    if (!uuid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing uuid parameter' })
      };
    }

    // Use Xumm REST API directly via fetch (avoid SDK native dependencies)
    const auth = Buffer.from(`${xummApiKey}:${xummApiSecret}`).toString('base64');

    const response = await fetch(`https://xumm.app/api/v1/platform/payload/${uuid}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Xumm API error:', errorText);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: 'Xumm API request failed', details: errorText })
      };
    }

    const payloadStatus = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        signed: payloadStatus.meta.signed,
        cancelled: payloadStatus.meta.cancelled,
        expired: payloadStatus.meta.expired,
        resolved: payloadStatus.meta.resolved,
        account: payloadStatus.response?.account || null,
        txid: payloadStatus.response?.txid || null
      })
    };
  } catch (error) {
    console.error('Error checking Xumm payload:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to check Xumm payload', details: error.message })
    };
  }
};
