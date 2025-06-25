document.getElementById('kakeibo-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // 入力値取得
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const amount = Number(document.getElementById('amount').value);
    const type = document.querySelector('input[name="type"]:checked').value;

    // テーブルに追加
    const table = document.getElementById('records-table').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.insertCell(0).textContent = date;
    row.insertCell(1).textContent = category;
    row.insertCell(2).textContent = amount;
    row.insertCell(3).textContent = type === 'income' ? '収入' : '支出';

    // 合計計算
    updateTotals();

    // フォームリセット
    this.reset();
});

// 合計計算関数
function updateTotals() {
    let totalIncome = 0;
    let totalExpense = 0;
    const rows = document.getElementById('records-table').getElementsByTagName('tbody')[0].rows;
    for (let i = 0; i < rows.length; i++) {
        const amount = Number(rows[i].cells[2].textContent);
        const type = rows[i].cells[3].textContent;
        if (type === '収入') {
            totalIncome += amount;
        } else {
            totalExpense += amount;
        }
    }
    document.getElementById('total-income').textContent = totalIncome;
    document.getElementById('total-expense').textContent = totalExpense;
    document.getElementById('balance').textContent = totalIncome - totalExpense;
}