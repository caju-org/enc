// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const RESEND_API_KEY = "re_fjXYdnwK_883aTKw5TBz1R2zc9KiUuj21";

const handler = async (_request: Request): Promise<Response> => {
  const req = await _request.json();
  console.log(req.moderators);
  console.log(req.route.name);
  console.log(req.route.grade.uiaa);
  const html = `A nova via ${req.route.name} foi adicionada agora há pouco,
    com grau ${req.route.grade.uiaa} ela precisa ser aprovada por um dos
    moderadores, você pode olhar nesse link:`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'Caju.rocks <no-reply@mail.caju.rocks>',
      to: req.moderators,
      subject: 'a new route was added, can you check it out?',
      html: html,
    }),
  })

  const data = await res.json()

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  return new Response(JSON.stringify({"oi": "tudo bom?"}), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

serve(handler)


// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
