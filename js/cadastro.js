document.addEventListener("DOMContentLoaded", function () {
    const typeBtns = document.querySelectorAll(".type-btn");
    const tipoCadastroInput = document.getElementById("tipo-cadastro");
    const docLabel = document.getElementById("label-documento");
    const docInput = document.getElementById("input-documento");
    const b2bNotice = document.getElementById("b2b-notice");
    const cadastroForm = document.getElementById("cadastro-form");

    // ---- Máscara de Telefone ----
    const phoneInput = document.getElementById("input-telefone");
    if (phoneInput) {
        phoneInput.addEventListener("input", function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    // ---- CEP Autocompletar (ViaCEP) ----
    const cepInput = document.getElementById("input-cep");
    if (cepInput) {
        cepInput.addEventListener("blur", function (e) {
            let cep = e.target.value.replace(/\D/g, '');
            if (cep.length === 8) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(res => res.json())
                    .then(data => {
                        if (!data.erro) {
                            document.getElementById("input-rua").value = data.logradouro || '';
                            document.getElementById("input-bairro").value = data.bairro || '';
                            document.getElementById("input-cidade").value = data.localidade || '';
                        }
                    });
            }
        });
    }

    // ---- Toggle PF / PJ ----
    typeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            typeBtns.forEach(t => t.classList.remove("active"));
            btn.classList.add("active");

            const type = btn.dataset.type;
            tipoCadastroInput.value = type;

            if (type === "PJ") {
                docLabel.innerText = "CNPJ";
                docInput.placeholder = "00.000.000/0000-00";
                b2bNotice.style.display = "block";
            } else {
                docLabel.innerText = "CPF";
                docInput.placeholder = "000.000.000-00";
                b2bNotice.style.display = "none";
            }
        });
    });

    // ---- Envio do Formulário (WhatsApp + localStorage) ----
    if (cadastroForm) {
        cadastroForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const tipo = tipoCadastroInput.value;
            const nome = document.getElementById("input-nome").value.trim();
            const email = document.getElementById("input-email").value.trim();
            const tel = document.getElementById("input-telefone").value.trim();
            const doc = docInput.value.trim();
            const cep = document.getElementById("input-cep").value.trim();
            const rua = document.getElementById("input-rua").value.trim();
            const num = document.getElementById("input-numero").value.trim();
            const bairro = document.getElementById("input-bairro").value.trim();
            const cidade = document.getElementById("input-cidade").value.trim();
            const interesse = document.getElementById("input-interesse").value;

            // ===== SALVAR NO LOCALSTORAGE =====
            const lead = {
                id: Date.now(),
                origem: "cadastro",
                tipo: tipo,
                nome: nome,
                documento: doc,
                email: email,
                telefone: tel,
                endereco: `${rua}, ${num} - ${bairro}, ${cidade} (CEP: ${cep})`,
                interesse: interesse,
                status: "novo",
                data: new Date().toISOString()
            };

            const leads = JSON.parse(localStorage.getItem("artesdec_leads") || "[]");
            leads.unshift(lead);
            localStorage.setItem("artesdec_leads", JSON.stringify(leads));
            // ==================================

            // ---- Mensagem WhatsApp Estilo Orçamento ----
            let message = "";
            if (tipo === "PJ") {
                message += `Olá! Sou da empresa *${nome}* e acabei de realizar o cadastro no site da Artes & Decorações.\n\n`;
                message += `📋 *DADOS DO CADASTRO EMPRESARIAL (PJ)*:\n`;
                message += `• *Razão Social / Empresa:* ${nome}\n`;
                message += `• *CNPJ:* ${doc}\n`;
                message += `• *E-mail:* ${email}\n`;
                message += `• *Telefone/WhatsApp:* ${tel}\n`;
                message += `• *Endereço de Faturamento/Obra:* ${rua}, ${num} - ${bairro}, ${cidade} (CEP: ${cep})\n`;
                message += `• *Principal Interesse:* ${interesse}\n\n`;
                message += `_Gostaria de atendimento e informações sobre a tabela corporativa._`;
            } else {
                message += `Olá! Me chamo *${nome}* e acabei de realizar meu cadastro no site da Artes & Decorações.\n\n`;
                message += `📋 *DADOS DO CADASTRO (Pessoa Física)*:\n`;
                message += `• *Nome:* ${nome}\n`;
                message += `• *CPF:* ${doc}\n`;
                message += `• *E-mail:* ${email}\n`;
                message += `• *Telefone/WhatsApp:* ${tel}\n`;
                message += `• *Endereço:* ${rua}, ${num} - ${bairro}, ${cidade} (CEP: ${cep})\n`;
                message += `• *Principal Interesse:* ${interesse}\n\n`;
                message += `_Gostaria de solicitar um orçamento._`;
            }

            const encodedMessage = encodeURIComponent(message);
            const waLink = `https://wa.me/5511999201062?text=${encodedMessage}`;

            window.open(waLink, '_blank');
        });
    }
});
