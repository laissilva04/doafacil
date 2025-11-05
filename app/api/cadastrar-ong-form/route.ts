import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 30px;">
        <table align="center" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="background-color: #8e51ff; padding: 10px; text-align: center;">
              <img src="https://i.imgur.com/o6OND8v.png" alt="Logo DoaFácil" width="210" style="display: block; margin: 0 auto;" />
              <h1 style="color: white; font-size: 22px; margin-top: 10px;">Novo Cadastro de Instituição</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; color: #333;">
              <p style="font-size: 16px;">Olá,</p>
              <p style="font-size: 16px;">
                Um novo cadastro de instituição foi enviado pelo formulário <strong>DoaFácil</strong>:
              </p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <h3 style="color: #ff8c00;">Informações da Instituição</h3>
              <p><strong>Nome:</strong> ${data.name}</p>
              <p><strong>Descrição:</strong> ${data.description}</p>
              <p><strong>Endereço:</strong> ${data.address}, ${data.city} - ${data.state}</p>
              <p><strong>Telefone:</strong> ${data.phone}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Site:</strong> ${data.website || "—"}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <h3 style="color: #00916e;">Responsável e Dados Legais</h3>
              <p><strong>Nome do Responsável:</strong> ${data.responsibleName}</p>
              <p><strong>CPF:</strong> ${data.responsibleCpf}</p>
              <p><strong>CNPJ:</strong> ${data.cnpj}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <h3 style="color: #0077b6;">Atuação e Doações</h3>
              <p><strong>Categorias:</strong> ${data.categories.join(", ")}</p>
              <p><strong>Tipos de Doações Aceitas:</strong> ${data.acceptedDonations.join(", ")}</p>
              <p><strong>Horário de Funcionamento:</strong> ${data.operatingHours || "—"}</p>
              <p><strong>Informações Adicionais:</strong> ${data.additionalInfo || "—"}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 14px; color: #666;">
                Este e-mail foi enviado automaticamente pelo sistema DoaFácil.<br/>
                Não é necessário respondê-lo.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f1f1f1; text-align: center; padding: 10px;">
              <p style="font-size: 12px; color: #777;">&copy; ${new Date().getFullYear()} DoaFácil • Todos os direitos reservados</p>
            </td>
          </tr>
        </table>
      </div>
    `;

    const emailText = `
Novo Cadastro de Instituição - DoaFácil

Nome: ${data.name}
Descrição: ${data.description}
Endereço: ${data.address}, ${data.city} - ${data.state}
Telefone: ${data.phone}
Email: ${data.email}
Site: ${data.website || "—"}

Responsável: ${data.responsibleName}
CPF: ${data.responsibleCpf}
CNPJ: ${data.cnpj}

Categorias: ${data.categories.join(", ")}
Doações Aceitas: ${data.acceptedDonations.join(", ")}
Horário de Funcionamento: ${data.operatingHours || "—"}
Informações Adicionais: ${data.additionalInfo || "—"}

—
Mensagem automática do sistema DoaFácil
    `;

    // Envio pelo SendGrid
    await sgMail.send({
      to: process.env.RECEIVER_EMAIL!,
      from: process.env.RECEIVER_EMAIL!, // precisa estar verificado no SendGrid
      subject: `Novo Cadastro: ${data.name}`,
      text: emailText,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json(
      { success: false, error: "Erro ao enviar e-mail" },
      { status: 500 }
    );
  }
}