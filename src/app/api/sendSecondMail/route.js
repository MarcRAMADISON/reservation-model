// src/app/api/sendSecondMail/route.ts

import { Resend } from "resend";

const resend = new Resend("re_S9aGiw9x_8prpabNze9hPyia3iQCDmdb9");

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email"); // Extraire l'email du lien
    const type = searchParams.get("type");

    if (!email) {
      return new Response("Email manquant", { status: 400 });
    }

    let result

    if (type === "valider") {
      // Envoi du second email
      result = await resend.emails.send({
        from: 'noreply@jdadiffusion.fr', // TO-DO: decomment when test finished : "noreply@mydomain.com",
        to: email,
        subject: "Réservation confirmée",
        html: ' <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 20px; max-width: 600px; margin: 20px auto;"><h1 style="color: #007bff; font-size: 24px;">Bonjour ,</h1><p style="color:#000;">Nous sommes heureux de vous confirmer que votre réservation chez <strong>JDA DIffusion</strong> a bien été prise en compte. 🎉</p><p style="color:#000;">Nous avons hâte de vous accueillir et de vous offrir une expérience exceptionnelle ! Si vous avez des questions ou souhaitez apporter des modifications à votre réservation, n"hésitez pas à nous contacter.</p><div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #ddd;"><p style="margin: 5px 0;">📞 <strong>33256479895</strong></p><p style="margin: 5px 0;">📧 <strong style="color:#000">jdadiffusion@gmail.com</strong></p></div><p style="margin-top: 20px; text-align: center; font-size: 14px; color: #666;">À très bientôt chez <strong>JDA DIffusion</strong> !</p><p style="margin-top: 10px; text-align: center; font-size: 14px; color: #666;">Bien cordialement, <br> L’équipe <strong>JDA DIffusion</strong></p></div>',
      });
    } else {
      result = await resend.emails.send({
        from: 'noreply@jdadiffusion.fr', // TO-DO: decomment when test finished : "noreply@mydomain.com",
        to: email,
        subject: "Réservation non acceptée",
        html: `<div style="background-color: #fff; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 20px; max-width: 600px; margin: 20px auto;"><h1 style="color: #dc3545; font-size: 24px;">Bonjour ,</h1><p style="color:#000;">Nous tenons à vous informer que, malheureusement, votre demande de réservation n’a pas été validée.</p><div style="background-color: #f8d7da; border-left: 4px solid #dc3545; padding: 10px 15px; margin: 15px 0; border-radius: 4px;"><p style="margin: 5px 0;color=#000;">Cela peut être dû à plusieurs raisons, telles que :</p><ul style="margin: 10px 0; padding-left: 20px; list-style-type: disc;"><li>Une disponibilité limitée pour la période souhaitée</li><li>Des contraintes sur les services ou options demandées</li></ul></div><p style="color:#000;">Nous serions ravis de vous aider à trouver une nouvelle plage horaire ou de répondre à toute autre demande.</p><div style="background-color: #f1f1f1; border-left: 4px solid #007bff; padding: 10px 15px; margin: 15px 0; border-radius: 4px;"><p style="margin: 5px 0;color:#000;"><strong>Voici des alternatives possibles :</strong></p><ul style="margin: 10px 0; padding-left: 20px; list-style-type: disc;"><li>Nouvelle date/heure</li><li>Changer le nombre de personne</li></ul></div><p style="color:#000;">Si vous avez des questions ou souhaitez reprogrammer votre réservation, n’hésitez pas à nous contacter.</p><div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #ddd;"><p style="margin: 5px 0;">📞 <strong>3325698745</strong></p><p style="margin: 5px 0;">📧 <strong>Contact@jdadiffusion.fr</strong></p></div><p style="margin-top: 20px; text-align: center; font-size: 14px; color: #666;">Merci pour votre compréhension, et nous espérons vous accueillir bientôt chez <strong>JDA Diffusion</strong>.</p><p style="margin-top: 10px; text-align: center; font-size: 14px; color: #666;">Cordialement, <br> L’équipe <strong>JDA Diffusion</strong></p></div>`,
      });
    }

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
      }
    );
  }
}
