/**
 * VITRINE STORE — Artes e Decorações
 * Gerenciador centralizado de produtos, variações e categorias dinâmicas.
 */

const DEFAULT_VITRINE_CATEGORIES = [
    { id: "pisos", nome: "Pisos", emoji: "🪵" },
    { id: "forros", nome: "Forros", emoji: "🏗️" },
    { id: "drywall", nome: "Drywall", emoji: "🧱" },
    { id: "divisorias", nome: "Divisórias", emoji: "🚪" },
    { id: "persianas", nome: "Persianas", emoji: "🪟" },
    { id: "papel-parede", nome: "Papel de Parede", emoji: "🎨" },
    { id: "ferramentas", nome: "Ferramentas", emoji: "🛠️" }
];

function getVitrineCategories() {
    const raw = localStorage.getItem("artesdec_categorias");
    if (!raw) {
        localStorage.setItem("artesdec_categorias", JSON.stringify(DEFAULT_VITRINE_CATEGORIES));
        return DEFAULT_VITRINE_CATEGORIES;
    }
    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.length === 0) {
            localStorage.setItem("artesdec_categorias", JSON.stringify(DEFAULT_VITRINE_CATEGORIES));
            return DEFAULT_VITRINE_CATEGORIES;
        }
        return parsed;
    } catch (e) {
        return DEFAULT_VITRINE_CATEGORIES;
    }
}

function saveVitrineCategories(cats) {
    localStorage.setItem("artesdec_categorias", JSON.stringify(cats));
}

const DEFAULT_VITRINE_PRODUCTS = [
    {
        id: "piso-01",
        sku: "PISO-LAM-01",
        nome: "Piso Laminado Durafloor Unique",
        categoria: "pisos",
        categoriaNome: "Pisos",
        descricao: "Piso laminado de alta resistência a riscos e impactos, perfeito para ambientes residenciais e comerciais. Possui acabamento sofisticado com padrão amadeirado natural e tecnologia de instalação rápida por encaixe sem cola.",
        imagemCapa: "img/services/piso-laminado.jpg",
        opcoes: [
            {
                nome: "Carvalho Munique",
                imagem: "https://images.unsplash.com/photo-1581850518616-bcb8077fa2aa?auto=format&fit=crop&w=800&q=80"
            },
            {
                nome: "Nogueira Ferrara",
                imagem: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
            },
            {
                nome: "Ipê Amarelo",
                imagem: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80"
            }
        ],
        destaque: true
    },
    {
        id: "piso-02",
        sku: "PISO-VIN-02",
        nome: "Piso Vinílico LVT Click",
        categoria: "pisos",
        categoriaNome: "Pisos",
        descricao: "Piso vinílico 100% impermeável com textura agradável e excelente isolamento acústico. Ideal para cozinhas, salas, quartos e escritórios. Fácil limpeza e resistente à umidade.",
        imagemCapa: "https://images.unsplash.com/photo-1581850518616-bcb8077fa2aa?auto=format&fit=crop&w=800&q=80",
        opcoes: [
            {
                nome: "Cinza Concreto",
                imagem: "https://images.unsplash.com/photo-1581850518616-bcb8077fa2aa?auto=format&fit=crop&w=800&q=80"
            },
            {
                nome: "Carvalho Rústico",
                imagem: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
            }
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
        imagemCapa: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80",
        opcoes: [
            {
                nome: "Modelo Frisotelado 200mm (Branco)",
                imagem: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80"
            },
            {
                nome: "Modelo Liso Plastificado",
                imagem: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
            }
        ],
        destaque: true
    },
    {
        id: "drywall-01",
        sku: "DRY-ST-01",
        nome: "Chapa Drywall Standard (ST)",
        categoria: "drywall",
        categoriaNome: "Drywall",
        descricao: "Chapa de gesso acartonado para execução de paredes internas, forros e revestimentos secos em áreas secas. Proporciona superfície lisa pronta para receber pintura ou acabamentos.",
        imagemCapa: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
        opcoes: [
            {
                nome: "Espessura 12.5mm (1.20x2.40m)",
                imagem: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80"
            },
            {
                nome: "Espessura 15.0mm (1.20x2.40m)",
                imagem: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80"
            }
        ],
        destaque: true
    },
    {
        id: "div-01",
        sku: "DIV-EUC-01",
        nome: "Divisória Eucatex Naval / Formiplac",
        categoria: "divisorias",
        categoriaNome: "Divisórias",
        descricao: "Painéis de divisória com miolo colmeia e acabamento melamínico de alta resistência. Ideais para organização de escritórios, salas de reunião e ambientes comerciais.",
        imagemCapa: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        opcoes: [
            {
                nome: "Painel Branco Neve",
                imagem: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
            },
            {
                nome: "Painel Areia Jundiaí",
                imagem: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
            },
            {
                nome: "Painel Cinza Ocidental",
                imagem: "https://images.unsplash.com/photo-1581850518616-bcb8077fa2aa?auto=format&fit=crop&w=800&q=80"
            }
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
        imagemCapa: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        opcoes: [
            {
                nome: "Tecido Branco",
                imagem: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
            },
            {
                nome: "Tecido Bege",
                imagem: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80"
            },
            {
                nome: "Tecido Cinza Grafite",
                imagem: "https://images.unsplash.com/photo-1581850518616-bcb8077fa2aa?auto=format&fit=crop&w=800&q=80"
            }
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
        imagemCapa: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=80",
        opcoes: [
            {
                nome: "Estampa Geométrica Gold",
                imagem: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=80"
            },
            {
                nome: "Estampa Cimento Queimado",
                imagem: "https://images.unsplash.com/photo-1581850518616-bcb8077fa2aa?auto=format&fit=crop&w=800&q=80"
            }
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
