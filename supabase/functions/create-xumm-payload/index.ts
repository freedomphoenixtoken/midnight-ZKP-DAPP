import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    })
  }

  try {
    const xummApiKey = Deno.env.get('XUMM_API_KEY') || Deno.env.get('VITE_XUMM_API_KEY')
    const xummApiSecret = Deno.env.get('XUMM_API_SECRET') || Deno.env.get('VITE_XUMM_API_SECRET')

    console.log('Environment check - XUMM_API_KEY:', !!xummApiKey)
    console.log('Environment check - XUMM_API_SECRET:', !!xummApiSecret)

    if (!xummApiKey || !xummApiSecret) {
      return new Response(
        JSON.stringify({ error: 'Xumm API credentials not configured on server' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const body = await req.json()
    const { destination, memoData, memoFormat, memoType, returnUrl, identifier } = body

    // Use Xumm REST API directly via fetch (avoid SDK native dependencies)
    const auth = btoa(`${xummApiKey}:${xummApiSecret}`)
    
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
    }

    const response = await fetch('https://xumm.app/api/v1/platform/payload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify(payloadBody)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Xumm API error:', errorText)
      return new Response(
        JSON.stringify({ error: 'Xumm API request failed', details: errorText }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const payload = await response.json()

    return new Response(
      JSON.stringify({
        uuid: payload.uuid,
        qrUrl: payload.refs.qr_png,
        deepLinkUrl: payload.next.always,
        websocketUrl: payload.refs.websocket_status,
        pushed: payload.pushed
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error creating Xumm payload:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to create Xumm payload', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
