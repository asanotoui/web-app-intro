// 家計簿データをlocalStorageから取得（なければ空配列）
let records = JSON.parse(localStorage.getItem('kakeiboRecords') || '[]');

// 月ごとのリストを取得
function getMonths() {
    const months = new Set(records.map(r => r.date.slice(0, 7)));
    return Array.from(months).sort().reverse();
}

// 月選択肢を更新
function updateMonthSelect() {
    const select = document.getElementById('month-select');
    select.innerHTML = '';
    const months = getMonths();
    months.forEach(month => {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month;
        select.appendChild(option);
    });
    // デフォルトは今月
    if (months.length && !select.value) select.value = months[0];
}

// 記録テーブルを描画
function renderTable() {
    const tbody = document.getElementById('records-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    const month = document.getElementById('month-select').value;
    const filtered = records.filter(r => r.date.startsWith(month));
    filtered.forEach(r => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = r.date;
        row.insertCell(1).textContent = r.category;
        row.insertCell(2).textContent = r.amount;
        row.insertCell(3).textContent = r.type === 'income' ? '収入' : '支出';
    });
    updateTotals(filtered);
}

// 合計計算
function updateTotals(filtered) {
    let totalIncome = 0, totalExpense = 0;
    filtered.forEach(r => {
        if (r.type === 'income') totalIncome += Number(r.amount);
        else totalExpense += Number(r.amount);
    });
    document.getElementById('total-income').textContent = totalIncome;
    document.getElementById('total-expense').textContent = totalExpense;
    document.getElementById('balance').textContent = totalIncome - totalExpense;
}

// 追加時の処理
document.getElementById('kakeibo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    records.push({ date, category, amount, type });
    localStorage.setItem('kakeiboRecords', JSON.stringify(records));
    updateMonthSelect();
    renderTable();
    this.reset();
});

// 月切り替え時の処理
document.getElementById('month-select').addEventListener('change', renderTable);

// 初期化
updateMonthSelect();
renderTable();