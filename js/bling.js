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

        const imagem = p.imagemCapa || p.imagem || 'https://via.placeholder.com/400x300?text=Sem+Imagem';
        const nome = p.nome || 'Material';
        const catName = p.categoriaNome || getCategoryName(p.categoria);
        const desc = p.descricao
            ? (p.descricao.length > 85 ? p.descricao.substring(0, 85) + "..." : p.descricao)
            : 'Material de alta qualidade para obra e acabamento.';

        const waMsg = encodeURIComponent(`Olá! Quero saber o valor do produto *${nome}*.`);
        const waUrl = `https://wa.me/5511999201062?text=${waMsg}`;
        const prodUrl = `produto.html?sku=${p.sku || p.id}`;

        card.innerHTML = `
            <div class="product-card-img" onclick="window.location.href='${prodUrl}'">
                <span class="card-cat-badge">${catName}</span>
                <img src="${imagem}" alt="${nome}" loading="lazy">
            </div>
            <div class="product-card-body">
                <h4 onclick="window.location.href='${prodUrl}'" style="cursor:pointer;">${nome}</h4>
                <p class="product-card-desc" onclick="window.location.href='${prodUrl}'" style="cursor:pointer;">${desc}</p>
                <div class="card-buttons-row">
                    <a href="${prodUrl}" class="btn-card-view">
                        <i class="fas fa-eye"></i> Visualizar Produto
                    </a>
                    <a href="${waUrl}" target="_blank" onclick="event.stopPropagation();" class="btn-card-price-wpp">
                        <i class="fab fa-whatsapp"></i> Solicitar Valor
                    </a>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}
