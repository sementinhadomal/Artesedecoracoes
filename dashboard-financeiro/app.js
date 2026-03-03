// State Management
let financialData = JSON.parse(localStorage.getItem('financialData')) || {};

// Migration Logic (Old format to Unified format)
if (financialData.sales || financialData.expenses) {
    const oldEntries = [];
    if (financialData.sales) {
        financialData.sales.forEach(s => oldEntries.push({ ...s, type: 'sale', category: 'Venda - Balcão', categoryId: 'venda_balcao', status: 'paid' }));
    }
    if (financialData.expenses) {
        financialData.expenses.forEach(e => oldEntries.push({ ...e, type: 'expense', category: 'Gasto - Loja', categoryId: 'gasto_loja' }));
    }
    financialData = { entries: oldEntries };
    localStorage.setItem('financialData', JSON.stringify(financialData));
}

if (!financialData.entries) financialData.entries = [];

// Current Page Context
let currentPage = 'main';

const PAGE_CONFIG = {
    'main': { title: 'Página Principal', type: 'summary' },
    // Canais de Venda
    'venda_balcao': { title: 'Frente de Balcão', type: 'sale', category: 'Venda - Balcão' },
    'venda_shibata': { title: 'Supermercado Shibata', type: 'sale', category: 'Venda - Shibata' },
    'venda_shopee': { title: 'Shopee', type: 'sale', category: 'Venda - Shopee' },
    'venda_ml': { title: 'Mercado Livre', type: 'sale', category: 'Venda - ML' },
    // Categorias de Produtos
    'venda_drywall': { title: 'Drywall', type: 'sale', category: 'Venda - Drywall' },
    'venda_divisorias': { title: 'Divisórias', type: 'sale', category: 'Venda - Divisórias' },
    'venda_papel': { title: 'Papel de Parede', type: 'sale', category: 'Venda - Papel de Parede' },
    'venda_persianas': { title: 'Persianas', type: 'sale', category: 'Venda - Persianas' },
    'venda_espelhos': { title: 'Espelhos e Box', type: 'sale', category: 'Venda - Espelhos/Box' },
    'venda_hidraulica': { title: 'Hidráulica', type: 'sale', category: 'Venda - Hidráulica' },
    'venda_eletrica': { title: 'Elétrica', type: 'sale', category: 'Venda - Elétrica' },
    'venda_ferramentas': { title: 'Ferramentas', type: 'sale', category: 'Venda - Ferramentas' },
    'venda_geral': { title: 'Materiais em Geral', type: 'sale', category: 'Venda - Materiais Geral' },
    // Despesas
    'gasto_loja': { title: 'Contas da Loja', type: 'expense', category: 'Gasto - Loja' },
    'gasto_familia': { title: 'Contas Família', type: 'expense', category: 'Gasto - Família' },
    'gasto_funcionarios': { title: 'Funcionários', type: 'expense', category: 'Gasto - Funcionários' }
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    updateDate();
    renderPage();
});

function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date-display').innerText = new Date().toLocaleDateString('pt-BR', options);
}

function saveData() {
    localStorage.setItem('financialData', JSON.stringify(financialData));
    renderPage();
}

// Navigation Logic
function switchPage(pageId) {
    currentPage = pageId;

    // Update active class in sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('onclick').includes(`'${pageId}'`)) {
            item.classList.add('active');
        }
    });

    renderPage();
}

function renderPage() {
    const config = PAGE_CONFIG[currentPage];
    document.getElementById('page-title').innerText = config.title;

    // Update Form visibility and labels
    const statusGroup = document.getElementById('status-group');
    const formContainer = document.getElementById('form-container');
    const submitBtn = document.getElementById('submit-btn');

    if (config.type === 'summary') {
        formContainer.style.display = 'none';
        document.getElementById('stat-label').innerText = 'Consolidado';
        document.getElementById('stat-label-exp').innerText = 'Consolidado';
    } else {
        formContainer.style.display = 'block';
        statusGroup.style.display = config.type === 'expense' ? 'block' : 'none';
        submitBtn.innerText = config.type === 'sale' ? 'Registrar Venda' : 'Registrar Gasto';
        document.getElementById('stat-label').innerText = config.title;
        document.getElementById('stat-label-exp').innerText = config.title;
    }

    renderDashboard();
    renderHistory();
}

// Data Logic
function handleSubmit() {
    const amountInput = document.getElementById('amount');
    const descInput = document.getElementById('desc');
    const amount = parseFloat(amountInput.value);
    const desc = descInput.value;
    const status = document.getElementById('status').value;
    const config = PAGE_CONFIG[currentPage];

    if (isNaN(amount) || amount <= 0 || !desc) return alert('Por favor, preencha valor e descrição');

    const entry = {
        id: Date.now(),
        amount: amount,
        desc: desc,
        type: config.type,
        category: config.category,
        categoryId: currentPage,
        status: config.type === 'expense' ? status : 'paid',
        date: new Date().toISOString()
    };

    financialData.entries.unshift(entry);

    amountInput.value = '';
    descInput.value = '';

    saveData();
}

function toggleStatus(id) {
    const index = financialData.entries.findIndex(e => e.id === id);
    if (index !== -1) {
        financialData.entries[index].status = financialData.entries[index].status === 'paid' ? 'pending' : 'paid';
        saveData();
    }
}

function deleteEntry(id) {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
        financialData.entries = financialData.entries.filter(e => e.id !== id);
        saveData();
    }
}

function renderHistory() {
    const list = document.getElementById('history-list');
    list.innerHTML = '';

    let filteredEntries = financialData.entries;
    if (currentPage !== 'main') {
        filteredEntries = financialData.entries.filter(e => e.categoryId === currentPage);
    } else {
        // Show last 20 from all categories on main page
        filteredEntries = financialData.entries.slice(0, 20);
    }

    filteredEntries.forEach(entry => {
        const date = new Date(entry.date).toLocaleDateString('pt-BR');
        const badgeClass = entry.status === 'paid' ? 'badge-paid' : 'badge-pending';
        const statusText = entry.status === 'paid' ? 'Pago' : 'Pendente';
        const isExpense = entry.type === 'expense';
        const amountClass = isExpense ? 'amount-negative' : 'amount-positive';
        const prefix = isExpense ? '-' : '+';

        list.innerHTML += `
            <div class="item-row ${entry.type}">
                <div class="item-info">
                    <div class="title">${entry.desc}</div>
                    <div class="date">
                        ${date} | <strong>${entry.category || 'Geral'}</strong>
                        ${isExpense ? `| <span class="badge ${badgeClass}" onclick="toggleStatus(${entry.id})" style="cursor:pointer">${statusText}</span>` : ''}
                        | <i class="fas fa-trash" onclick="deleteEntry(${entry.id})" style="cursor:pointer; font-size: 0.8rem; margin-left: 5px; color: #94a3b8 hover:color: #ef4444"></i>
                    </div>
                </div>
                <div class="${amountClass}">${prefix} R$ ${entry.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            </div>
        `;
    });
}

// Dashboard Calculation
function renderDashboard() {
    let sales = financialData.entries.filter(e => e.type === 'sale');
    let expenses = financialData.entries.filter(e => e.type === 'expense');

    if (currentPage !== 'main') {
        sales = sales.filter(e => e.categoryId === currentPage);
        expenses = expenses.filter(e => e.categoryId === currentPage);
    }

    const totalRevenue = sales.reduce((sum, s) => sum + s.amount, 0);
    const totalPaidExpenses = expenses.filter(e => e.status === 'paid').reduce((sum, e) => sum + e.amount, 0);
    const totalPendingExpenses = expenses.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0);

    const totalExpenses = totalPaidExpenses + totalPendingExpenses;
    const balance = totalRevenue - totalPaidExpenses - totalPendingExpenses;

    document.getElementById('total-revenue').innerText = `R$ ${totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById('total-expenses').innerText = `R$ ${totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById('to-pay').innerText = `R$ ${totalPendingExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById('projected-balance').innerText = `R$ ${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    // Style balance
    const balEl = document.getElementById('projected-balance');
    if (balEl) {
        balEl.className = balance >= 0 ? 'value amount-positive' : 'value amount-negative';
    }
}
