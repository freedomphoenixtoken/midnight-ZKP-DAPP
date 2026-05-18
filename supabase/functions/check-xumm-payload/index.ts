import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'GET') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    })
  }

  try {
    const xummApiKey = Deno.env.get('XUMM_API_KEY') || Deno.env.get('VITE_XUMM_API_KEY')
    const xummApiSecret = Deno.env.get('XUMM_API_SECRET') || Deno.env.get('VITE_XUMM_API_SECRET')

    const url = new URL(req.url)
    const uuid = url.searchParams.get('uuid')
    
    if (!uuid) {
      return new Response(
        JSON.stringify({ error: 'Missing uuid parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Use Xumm REST API directly via fetch (avoid SDK native dependencies)
    const auth = btoa(`${xummApiKey}:${xummApiSecret}`)

    const response = await fetch(`https://xumm.app/api/v1/platform/payload/${uuid}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Xumm API error:', errorText)
      return new Response(
        JSON.stringify({ error: 'Xumm API request failed', details: errorText }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const payloadStatus = await response.json()

    return new Response(
      JSON.stringify({
        signed: payloadStatus.meta.signed,
        cancelled: payloadStatus.meta.cancelled,
        expired: payloadStatus.meta.expired,
        resolved: payloadStatus.meta.resolved,
        account: payloadStatus.response?.account || null,
        txid: payloadStatus.response?.txid || null
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error checking Xumm payload:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to check Xumm payload', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
