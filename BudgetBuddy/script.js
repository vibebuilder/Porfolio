let balance = 0;
let previousBalance = 0;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];

const balanceEl = document.getElementById("balance");
const prevBalanceEl = document.getElementById("previousBalance");
const transactionList = document.getElementById("transactionList");
const historyList = document.getElementById("historyList");
const historySection = document.getElementById("historySection");

function updateUI() {
  transactionList.innerHTML = "";
  balance = 0;

  transactions.forEach((t, i) => {
    const li = document.createElement("li");
    li.classList.add(t.type);
    li.innerHTML = `
      ${t.description}: $${t.amount}
      <button onclick="deleteTransaction(${i})">❌</button>
    `;
    transactionList.appendChild(li);
    balance += t.type === "income" ? t.amount : -t.amount;
  });

  balanceEl.textContent = balance;
  prevBalanceEl.textContent = previousBalance;
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
  const description = document.getElementById("description").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!description || isNaN(amount)) return;

  transactions.push({ description, amount, type });
  updateUI();
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

function resetMonth() {
  previousBalance = balance;
  history.push(...transactions);
  transactions = [];
  localStorage.setItem("history", JSON.stringify(history));
  updateUI();
}

function toggleHistory() {
  historySection.style.display = historySection.style.display === "none" ? "block" : "none";
  historyList.innerHTML = "";
  history.forEach((t) => {
    const li = document.createElement("li");
    li.classList.add(t.type);
    li.textContent = `${t.description}: $${t.amount}`;
    historyList.appendChild(li);
  });
}

updateUI();
