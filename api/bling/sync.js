// Utiliza o fetch nativo do Node.js (Vercel Node 18+)

const BLING_API_KEY = process.env.BLING_API_KEY || '92dffb27273336f7e9a8c34b5e57eb01329c776c72d81a693c69c7de42e29c7f098c5e06';

module.exports = async (req, res) => {
    // Verificar autenticação (Token JWT no cookie)
    const token = req.cookies.auth_token;
    if (!token) {
        return res.status(401).json({ message: 'Não autorizado' });
    }

    try {
        // Busca paginada (exemplo simplificado do Bling v2)
        const response = await fetch(`https://bling.com.br/Api/v2/produtos/json/?apikey=${BLING_API_KEY}&imagem=S`);
        const data = await response.json();

        if (data.retorno && data.retorno.produtos) {
            // Retorna os produtos formatados para o dashboard
            const formattedProducts = data.retorno.produtos.map(p => ({
                sku: p.produto.codigo,
                nome: p.produto.descricao,
                preco: p.produto.preco,
                estoque: p.produto.estoqueAtual,
                imagem: p.produto.urlImagem,
                categoria: p.produto.categoria?.descricao || 'Geral',
                lastUpdate: new Date().toISOString()
            }));

            return res.status(200).json({
                products: formattedProducts,
                syncDate: new Date().toISOString()
            });
        }

        return res.status(404).json({ message: 'Nenhum produto encontrado no Bling' });
    } catch (error) {
        console.error('Erro na sincronização Bling:', error);
        return res.status(500).json({ message: 'Erro interno na sincronização' });
    }
};
