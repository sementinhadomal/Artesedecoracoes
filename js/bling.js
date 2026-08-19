/**
 * ARTES E DECORAÇÕES — VITRINE VISUAL DE PRODUTOS
 * Carrega e exibe os produtos cadastrados no painel administrativo.
 */

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});

function getCategoryName(cat) {
    const map = {
        'pisos': 'Pisos',
        'forros': 'Forros',
        'drywall': 'Drywall',
        'divisorias': 'Divisórias',
        'persianas': 'Persianas',
        'papel-parede': 'Papel de Parede',
        'ferramentas': 'Ferramentas'
    };
    return map[cat] || 'Geral';
}

function loadProducts() {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    // Tentar carregar do Vitrine Store ou LocalStorage
    let products = [];
    if (typeof getVitrineProducts === 'function') {
        products = getVitrineProducts();
    } else {
        const raw = localStorage.getItem("artesdec_produtos");
        products = raw ? JSON.parse(raw) : [];
    }

    renderProducts(products);
}

function renderProducts(products) {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    grid.innerHTML = "";

    const activeCategory = document.querySelector('.cat-tag.active')?.dataset.category || 'all';

    let filteredProducts = products;
    if (activeCategory && activeCategory !== 'all') {
        filteredProducts = products.filter(p => p.categoria === activeCategory);
    }

    const rc = document.getElementById('results-count');
    if (rc) rc.textContent = filteredProducts.length + ' material(is)';

    const noResults = document.getElementById('no-results');

    if (filteredProducts.length === 0) {
        if (noResults) noResults.style.display = 'block';
        return;
    }

    if (noResults) noResults.style.display = 'none';

    filteredProducts.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.setAttribute("data-name", p.nome || '');
        card.setAttribute("data-category", p.categoria || 'all');

        const imagem = p.imagem || 'https://via.placeholder.com/400x300?text=Sem+Imagem';
        const nome = p.nome || 'Material';
        const catName = p.categoriaNome || getCategoryName(p.categoria);
        const desc = p.descricao
            ? (p.descricao.length > 90 ? p.descricao.substring(0, 90) + "..." : p.descricao)
            : 'Material de alta qualidade para obra e acabamento.';

        // Render variants preview tags
        let variantsHtml = '';
        if (p.variantes && p.variantes.length > 0) {
            const firstVar = p.variantes[0];
            const vals = firstVar.valores ? firstVar.valores.slice(0, 3).join(', ') : '';
            variantsHtml = `<div class="product-variant-preview"><i class="fas fa-sliders-h"></i> ${firstVar.nome}: <strong>${vals}</strong></div>`;
        }

        card.onclick = () => window.location.href = `produto.html?sku=${p.sku || p.id}`;

        card.innerHTML = `
            <div class="product-card-img">
                <span class="card-cat-badge">${catName}</span>
                <img src="${imagem}" alt="${nome}" loading="lazy">
            </div>
            <div class="product-card-body">
                <h4>${nome}</h4>
                <p class="product-card-desc">${desc}</p>
                ${variantsHtml}
                <button type="button" class="product-card-btn">
                    <i class="fas fa-eye"></i> Ver Vitrine & Orçamento
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}
