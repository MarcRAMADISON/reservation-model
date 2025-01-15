// src/app/api/sendMail/route.ts

import { Resend } from 'resend';

const resend = new Resend('re_S9aGiw9x_8prpabNze9hPyia3iQCDmdb9');

// Fonction POST exportée pour accepter les requêtes POST
export async function POST(req) {
  try {
    const { to, subject, html } = await req.json(); // Récupérer les données JSON envoyées dans le corps de la requête

    // Envoi de l'email via Resend
    const result = await resend.emails.send({
      from: 'noreply@jdadiffusion.fr',//'onboarding@resend.dev',
      to,
      subject,
      html,
    });

    // Réponse de succès
    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    });
  } catch (error) {
    // En cas d'erreur, retournez une erreur avec le message
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
      }
    );
  }
}
