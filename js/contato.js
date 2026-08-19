document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contato-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("cont-nome").value;
        const tel = document.getElementById("cont-tel").value;
        const email = document.getElementById("cont-email").value;
        const msg = document.getElementById("cont-msg").value;

        // ===== SALVAR NO LOCALSTORAGE =====
        const lead = {
            id: Date.now(),
            origem: "contato",
            tipo: "Contato",
            nome: nome,
            telefone: tel,
            email: email,
            mensagem: msg,
            status: "novo",
            data: new Date().toISOString()
        };

        const leads = JSON.parse(localStorage.getItem("artesdec_leads") || "[]");
        leads.unshift(lead);
        localStorage.setItem("artesdec_leads", JSON.stringify(leads));
        // ==================================

        // ---- Mensagem WhatsApp ----
        let message = `*💬 NOVA MENSAGEM DE CONTATO*\n\n`;
        message += `*Nome:* ${nome}\n`;
        message += `*Telefone:* ${tel}\n`;
        message += `*E-mail:* ${email}\n\n`;
        message += `*Mensagem:*\n${msg}`;

        const encodedMessage = encodeURIComponent(message);
        const waLink = `https://wa.me/5511999201062?text=${encodedMessage}`;

        alert("Mensagem recebida! Você será redirecionado para o nosso WhatsApp.");
        window.open(waLink, "_blank");
        form.reset();
    });
});
