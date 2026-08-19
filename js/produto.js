/**
 * LÓGICA DA PÁGINA DE VITRINE / DETALHES DO PRODUTO
 * Suporta troca dinâmica de imagem ao selecionar opções/cores.
 */

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sku = urlParams.get('sku');

    if (!sku) {
        window.location.href = 'produtos.html';
        return;
    }

    loadProductDetails(sku);
});

function loadProductDetails(sku) {
    const container = document.getElementById('product-container');

    let product = null;
    if (typeof getVitrineProductBySku === 'function') {
        product = getVitrineProductBySku(sku);
    } else {
        const raw = localStorage.getItem("artesdec_produtos");
        const products = raw ? JSON.parse(raw) : [];
        product = products.find(p => p.sku === sku || p.id === sku);
    }

    if (!product) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 100px 20px;">
                <i class="fas fa-search fa-3x" style="color: #cbd5e1; margin-bottom: 20px;"></i>
                <h2>Produto não encontrado</h2>
                <p style="color: #64748b; margin-top: 10px;">O material solicitado não está disponível no catálogo atual.</p>
                <a href="produtos.html" class="btn-buy" style="max-width: 240px; margin: 30px auto; text-decoration: none;">Voltar para o Catálogo</a>
            </div>
        `;
        return;
    }

    renderDetails(product);
}

function renderDetails(p) {
    const container = document.getElementById('product-container');
    const capaImg = p.imagemCapa || p.imagem || 'https://via.placeholder.com/800x800?text=Sem+Imagem';
    const catNome = p.categoriaNome || p.categoria || 'Materiais';

    let selectedOption = null;

    // Render interactive options chips with thumbnail
    let optionsHtml = '';
    if (p.opcoes && p.opcoes.length > 0) {
        selectedOption = p.opcoes[0]; // Default to first option
        optionsHtml = `
            <div class="options-selection-box" style="margin-bottom: 25px;">
                <label style="display: block; font-size: 0.9rem; font-weight: 700; color: #0E2954; margin-bottom: 10px;">
                    Selecione a Opção / Cor desejada:
                </label>
                <div class="options-grid" style="display: flex; gap: 10px; flex-wrap: wrap;">
                    ${p.opcoes.map((opt, idx) => `
                        <div class="option-chip ${idx === 0 ? 'active' : ''}" data-idx="${idx}" style="display: flex; align-items: center; gap: 8px; padding: 8px 14px; border: 2px solid ${idx === 0 ? '#0E2954' : '#e2e8f0'}; background: ${idx === 0 ? '#f0f4fa' : 'white'}; border-radius: 12px; cursor: pointer; transition: 0.2s;">
                            ${opt.imagem ? `<img src="${opt.imagem}" style="width: 28px; height: 28px; border-radius: 6px; object-fit: cover;">` : ''}
                            <span style="font-size: 0.88rem; font-weight: 600; color: #1e293b;">${opt.nome}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="product-gallery">
            <img src="${(selectedOption && selectedOption.imagem) ? selectedOption.imagem : capaImg}" alt="${p.nome}" id="main-img">
        </div>
        <div class="product-info">
            <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 15px;">
                <span class="cat-badge" style="background: #0E2954; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.78rem; font-weight: 700; text-transform: uppercase;">${catNome}</span>
                ${p.sku ? `<span class="sku-badge" style="margin-bottom: 0;">SKU: ${p.sku}</span>` : ''}
            </div>
            <h1>${p.nome}</h1>
            
            <div class="product-description" style="margin-top: 20px;">
                ${p.descricao || 'Material de alta performance fornecido com padrão de qualidade e durabilidade garantida.'}
            </div>

            <div class="buy-box" style="margin-top: 30px;">
                <h3 style="font-size: 1.1rem; color: #0E2954; margin-bottom: 15px;">Solicitar Orçamento Personalizado</h3>
                
                ${optionsHtml}

                <button id="btn-request-wpp" class="btn-buy" style="background: #25D366; border: none; cursor: pointer; width: 100%;">
                    <i class="fab fa-whatsapp" style="font-size: 1.4rem;"></i> Solicitar Orçamento no WhatsApp
                </button>
                <div style="margin-top: 14px; text-align: center; font-size: 0.82rem; color: #64748b;">
                    <i class="fas fa-truck"></i> Entregamos em Mogi das Cruzes e toda região
                </div>
            </div>

            <div style="margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="background: white; padding: 15px; border-radius: 12px; border: 1px solid #eee; display: flex; align-items: center; gap: 12px; font-size: 0.88rem;">
                    <i class="fas fa-certificate" style="color: #0E2954; font-size: 1.2rem;"></i>
                    Garantia e Qualidade
                </div>
                <div style="background: white; padding: 15px; border-radius: 12px; border: 1px solid #eee; display: flex; align-items: center; gap: 12px; font-size: 0.88rem;">
                    <i class="fas fa-headset" style="color: #0E2954; font-size: 1.2rem;"></i>
                    Suporte Técnico 40 Anos
                </div>
            </div>
        </div>
    `;

    document.title = `${p.nome} | Vitrine Artes e Decorações`;

    // Handle Image Switching on Option Click
    const optionChips = document.querySelectorAll(".option-chip");
    optionChips.forEach(chip => {
        chip.addEventListener("click", function() {
            optionChips.forEach(c => {
                c.style.borderColor = '#e2e8f0';
                c.style.background = 'white';
            });
            this.style.borderColor = '#0E2954';
            this.style.background = '#f0f4fa';

            const idx = parseInt(this.dataset.idx);
            selectedOption = p.opcoes[idx];

            const mainImg = document.getElementById("main-img");
            if (mainImg && selectedOption && selectedOption.imagem) {
                mainImg.src = selectedOption.imagem;
            }
        });
    });

    // WhatsApp Click Handler
    document.getElementById("btn-request-wpp").addEventListener("click", () => {
        let msg = `Olá! Gostaria de solicitar um orçamento para o material *${p.nome}*.\n`;
        if (selectedOption) {
            msg += `*Opção/Cor Escolhida:* ${selectedOption.nome}\n`;
        }
        msg += `\n_Vim pelo catálogo visual do site._`;

        const encoded = encodeURIComponent(msg);
        window.open(`https://wa.me/5511999201062?text=${encoded}`, '_blank');
    });
}
