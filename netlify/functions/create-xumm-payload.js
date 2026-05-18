export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const xummApiKey = process.env.XUMM_API_KEY || process.env.VITE_XUMM_API_KEY;
    const xummApiSecret = process.env.XUMM_API_SECRET || process.env.VITE_XUMM_API_SECRET;

    console.log('Environment check - XUMM_API_KEY:', !!xummApiKey);
    console.log('Environment check - XUMM_API_SECRET:', !!xummApiSecret);

    if (!xummApiKey || !xummApiSecret) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Xumm API credentials not configured on server' })
      };
    }

    const body = event.body ? JSON.parse(event.body) : {};
    const { destination, memoData, memoFormat, memoType, returnUrl, identifier } = body;

    // Use Xumm REST API directly via fetch (avoid SDK native dependencies)
    const auth = Buffer.from(`${xummApiKey}:${xummApiSecret}`).toString('base64');
    
    const payloadBody = {
      txjson: {
        TransactionType: 'Payment',
        Amount: '1',
        Destination: destination || 'rUn84CUYdNtszELcFJo51NUfs8ocw5Sj2L',
        Memos: [{
          Memo: {
            MemoData: memoData || Buffer.from('WALLET_VERIFICATION').toString('hex').toUpperCase(),
            MemoFormat: memoFormat || Buffer.from('VERIFICATION').toString('hex').toUpperCase(),
            MemoType: memoType || Buffer.from('ZK_DAPP').toString('hex').toUpperCase()
          }
        }]
      },
      options: {
        force_network: 'TESTNET',
        return_url: {
          web: returnUrl || 'https://mignight-zkp-dapp.netlify.app/?wallet=connected'
        }
      },
      custom_meta: {
        identifier: identifier || 'ignition-zkp-wallet-connection',
        instruction: 'Sign this transaction to verify your wallet ownership for Ignition ZKPs'
      }
    };

    const response = await fetch('https://xumm.app/api/v1/platform/payload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify(payloadBody)
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

    const payload = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        uuid: payload.uuid,
        qrUrl: payload.refs.qr_png,
        deepLinkUrl: payload.next.always,
        websocketUrl: payload.refs.websocket_status,
        pushed: payload.pushed
      })
    };
  } catch (error) {
    console.error('Error creating Xumm payload:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to create Xumm payload', details: error.message })
    };
  }
};
