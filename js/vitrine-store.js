/**
 * VITRINE STORE — Artes e Decorações
 * Gerenciador centralizado de produtos da vitrine no localStorage.
 */

const DEFAULT_VITRINE_PRODUCTS = [
    {
        id: "piso-01",
        sku: "PISO-LAM-01",
        nome: "Piso Laminado Durafloor Unique",
        categoria: "pisos",
        categoriaNome: "Pisos Laminados",
        descricao: "Piso laminado de alta resistência a riscos e impactos, perfeito para ambientes residenciais e comerciais. Possui acabamento sofisticado com padrão amadeirado natural e tecnologia de instalação rápida por encaixe sem cola.",
        imagem: "img/services/piso-laminado.jpg",
        variantes: [
            { nome: "Cores / Acabamentos", valores: ["Carvalho Munique", "Nogueira Ferrara", "Ipê Amarelo", "Cumaru"] },
            { nome: "Espessura", valores: ["7mm", "8mm"] }
        ],
        destaque: true
    },
    {
        id: "piso-02",
        sku: "PISO-VIN-02",
        nome: "Piso Vinílico LVT Click",
        categoria: "pisos",
        categoriaNome: "Pisos Vinílicos",
        descricao: "Piso vinílico 100% impermeável com textura agradável e excelente isolamento acústico. Ideal para cozinhas, salas, quartos e escritórios. Fácil limpeza e resistente à umidade.",
        imagem: "https://images.unsplash.com/photo-1581850518616-bcb8077fa2aa?auto=format&fit=crop&w=800&q=80",
        variantes: [
            { nome: "Cores", valores: ["Cinza Concreto", "Carvalho Rústico", "Nogueira Clara"] },
            { nome: "Espessura", valores: ["3mm", "4.2mm Click"] }
        ],
        destaque: true
    },
    {
        id: "forro-01",
        sku: "FORRO-PVC-01",
        nome: "Forro de PVC Frisotelado Branco",
        categoria: "forros",
        categoriaNome: "Forros",
        descricao: "Forro de PVC de alta qualidade, auto-extinguível, imune a cupins e umidade. Ideal para residências, escritórios e áreas comerciais. Não necessita de pintura e possui longa durabilidade.",
        imagem: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80",
        variantes: [
            { nome: "Modelo", valores: ["Frisotelado 200mm", "Liso Plastificado"] },
            { nome: "Espessura", valores: ["8mm", "10mm"] },
            { nome: "Comprimento", valores: ["3.00m", "4.00m", "6.00m"] }
        ],
        destaque: true
    },
    {
        id: "forro-02",
        sku: "FORRO-MOD-02",
        nome: "Forro Modular Mineral Acústico",
        categoria: "forros",
        categoriaNome: "Forros",
        descricao: "Forro modular removível com alto índice de absorção acústica e refletância luminosa. Excelente opção para auditórios, hospitais, escritórios e ambientes corporativos.",
        imagem: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        variantes: [
            { nome: "Borda", valores: ["Tegular", "Lay-in (Reto)"] },
            { nome: "Dimensão", valores: ["618x618mm", "1250x625mm"] }
        ],
        destaque: false
    },
    {
        id: "drywall-01",
        sku: "DRY-ST-01",
        nome: "Chapa Drywall Standard (ST)",
        categoria: "drywall",
        categoriaNome: "Drywall",
        descricao: "Chapa de gesso acartonado para execução de paredes internas, forros e revestimentos secos em áreas secas. Proporciona superfície lisa pronta para receber pintura ou acabamentos.",
        imagem: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
        variantes: [
            { nome: "Espessura", valores: ["12.5mm", "15mm"] },
            { nome: "Dimensão", valores: ["1.20x2.40m", "1.20x1.80m"] }
        ],
        destaque: true
    },
    {
        id: "drywall-02",
        sku: "DRY-RU-02",
        nome: "Chapa Drywall Resistente à Umidade (RU Verde)",
        categoria: "drywall",
        categoriaNome: "Drywall",
        descricao: "Chapa de gesso com aditivos hidrofugantes especialmente desenvolvida para áreas úmidas como banheiros, lavabos e cozinhas. Proteção superior contra umidade e fungos.",
        imagem: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
        variantes: [
            { nome: "Espessura", valores: ["12.5mm"] },
            { nome: "Dimensão", valores: ["1.20x2.40m"] }
        ],
        destaque: false
    },
    {
        id: "div-01",
        sku: "DIV-EUC-01",
        nome: "Divisória Eucatex Naval / Formiplac",
        categoria: "divisorias",
        categoriaNome: "Divisórias",
        descricao: "Painéis de divisória com miolo colmeia e acabamento melamínico de alta resistência. Ideais para organização de escritórios, salas de reunião e ambientes comerciais.",
        imagem: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        variantes: [
            { nome: "Cores dos Painéis", valores: ["Branco Neve", "Areia Jundiaí", "Cinza Ocidental", "Ovo"] },
            { nome: "Cor dos Perfis", valores: ["Alumínio Anodizado", "Preto", "Branco"] }
        ],
        destaque: true
    },
    {
        id: "persiana-01",
        sku: "PERS-ROLO-01",
        nome: "Persiana Rolô Tela Solar (Screen 3%)",
        categoria: "persianas",
        categoriaNome: "Persianas",
        descricao: "Persiana estilo Rolô com tecido técnico tela solar. Bloqueia raios UV e calor preservando a visibilidade para o ambiente externo. Design moderno e funcional.",
        imagem: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        variantes: [
            { nome: "Cores", valores: ["Branco", "Bege", "Cinza", "Preto"] },
            { nome: "Acionamento", valores: ["Manual por Corrente", "Motorizado"] }
        ],
        destaque: true
    },
    {
        id: "papel-01",
        sku: "PAPEL-VIN-01",
        nome: "Papel de Parede Vinílico Texturizado",
        categoria: "papel-parede",
        categoriaNome: "Papel de Parede",
        descricao: "Papel de parede vinílico super lavável com textura em alto relevo. Ideal para renovar salas, quartos e corredores com elegância e praticidade.",
        imagem: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=80",
        variantes: [
            { nome: "Estilo", valores: ["Geométrico", "Cimento Queimado", "Floral Clássico", "Tijolo 3D"] }
        ],
        destaque: false
    }
];

function getVitrineProducts() {
    const raw = localStorage.getItem("artesdec_produtos");
    if (!raw) {
        localStorage.setItem("artesdec_produtos", JSON.stringify(DEFAULT_VITRINE_PRODUCTS));
        return DEFAULT_VITRINE_PRODUCTS;
    }
    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.length === 0) {
            localStorage.setItem("artesdec_produtos", JSON.stringify(DEFAULT_VITRINE_PRODUCTS));
            return DEFAULT_VITRINE_PRODUCTS;
        }
        return parsed;
    } catch (e) {
        return DEFAULT_VITRINE_PRODUCTS;
    }
}

function saveVitrineProducts(products) {
    localStorage.setItem("artesdec_produtos", JSON.stringify(products));
}

function getVitrineProductBySku(sku) {
    const products = getVitrineProducts();
    return products.find(p => p.sku === sku || p.id === sku);
}
