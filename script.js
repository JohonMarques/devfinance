const Modal = {
  open(){
    //abrir modal
    //adicionar classe active ao modal
    document.querySelector('.modal-overlay').classList.add('active');
  },
  close(){
    //fechar o Modal
    //removar a classe active do modal
    document.querySelector('.modal-overlay').classList.remove('active');
  }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021'
    },
    {
        id: 2,
        description: 'Criação de Site',
        amount: 500000,
        date: '23/01/2021'
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021'
    },
    {
        id: 4,
        description: 'Teste',
        amount: -12255,
        date: '23/01/2021'
    }
]

const Transaction = {
    all: transactions,

    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    incomes(){
        //somar as entradas
        let income = 0;
        Transaction.all.forEach((transaction) => {
            if(transaction.amount > 0){
                income = income + transaction.amount
            }
        })

        return income;
    },

    expenses(){
        //somar as saidas
        let expense = 0;
        Transaction.all.forEach((transaction) => {
            if(transaction.amount < 0){
                expense = expense + transaction.amount
            }
        })

        return expense;
    },

    total(){

        return Transaction.incomes() + Transaction.expenses();

    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);

       DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction){
        const Cssclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount);

        const html = 
        `            
            <td class="description">${transaction.description}</td>
            <td class="${Cssclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
            <img src="./assets/minus.svg" alt="Remover Transação" />
            </td>
        `

      return html;
    },

    updateBalance(){
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())

        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())

        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions(){
        Dom.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g,"")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value;
    }
}

const App = {
    init(){
        Transaction.all.forEach((transaction) =>{
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()
    },

    reload(){
        Dom.clearTransactions()
        App.init()

    }
}

App.init()

Transaction.add({
    id: 5,
    description: 'Teste 2',
    amount: 200,
    date: '11/01/2021'
})


