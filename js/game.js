// There are local storage on this site. :)
// Bank account money: Has the money been deposited into the bank account?
// Bank account number: What is the bank account number?
// Debit card amount: How much money is on the debit card?
// Debit card number: What is the debit card number?
// Debit card pin: What is the debit card pin?
// Debit card cvv: What is the debit card cvv?
// Debit card expiration: What is the debit card expiration date?
// Savings account money: Has the money been deposited into the savings account?
// Savings account number: What is the savings account number?
// Is new user: Is this a new user?

// Check if the user is new from local storage

if (localStorage.getItem('is_new_user') == 'true') {
    localStorage.setItem('bank_account_number', Math.floor(Math.random() * 10000000000000000))
    localStorage.setItem('bank_account_money', 100)
    localStorage.setItem('debit_card_number', Math.floor(Math.random() * 10000000000000000))
    let pin = []
    for (let i = 0; i < 4; i++) {
        pin.push(Math.floor(Math.random() * 10))
    }
    localStorage.setItem('debit_card_pin', pin.join(''))
    let cvv = []
    for (let i = 0; i < 3; i++) {
        cvv.push(Math.floor(Math.random() * 10))
    }
    localStorage.setItem('debit_card_cvv', cvv.join(''))
    localStorage.setItem('debit_card_expiration', '12/24')
    localStorage.setItem('debit_card_money', 10)
    localStorage.setItem('savings_account_number', Math.floor(Math.random() * 10000000000000000))
    localStorage.setItem('earn_amount', 1)
    localStorage.setItem('is_new_user', 'false')
    document.body.innerHTML = `
    <style>
    body {
        margin: 10px;
    }
    </style>
    <h1><i class="bi bi-check-circle-fill"></i> Your account has been created</h1>
    <p>Here are your account details:</p>
    <hr>
    <div class="card">
        <h1>Bank account</h1>
        <p>Bank account number: ${localStorage.getItem('bank_account_number')}</p>
        <p>Bank account money: $${localStorage.getItem('bank_account_money')}</p>
    </div>
    <div class="card">
    <h1>Debit card</h1>
        <p>Debit card money: $${localStorage.getItem('debit_card_money')}</p>
        <p>Debit card pin: ${localStorage.getItem('debit_card_pin')}</p>
    </div>
    <div class="bank_card">
        <h3>Debit card</h3>
        <p class="card_number">${localStorage.getItem('debit_card_number')}</p>
        <div style="display: flex; justify-content: space-between;">
            <p class="card_expiration">Exp: ${localStorage.getItem('debit_card_expiration')}</p>
            <p class="card_cvv">CVV ${localStorage.getItem('debit_card_cvv')}</p>
        </div>
    </div>
    <div class="card">
        <h1>Savings account</h1>
        <p>Savings account number: ${localStorage.getItem('savings_account_number')}</p>
    </div>
    <br>
    <button onclick="window.location.href = 'index.html'">Continue</button>
    <div style="margin-top: 10px;">
        <br>
    <div/>
    `
}

if (localStorage.getItem('is_new_user') == null) {
    document.body.innerHTML = `
    <style>
    body {
        margin: 10px;
    }
    </style>
    <h1>Welcome to money game</h1>
    <p>This game is all about money.</p>
    <p>It is like a discord money bot, but on a website.</p>
    <p>You can earn money by playing games, and you can spend money on items. Send money to other users, and more!</p>
    <p>You have a bank account, a debit card, and a savings account.</p>
    <p>In your bank account, you can store money. You can also store money in your savings account.</p>
    <p>Your debit card is used to buy items.</p>
    <p>You will start with $100 in your bank account and $10 in your debit card.</p>
    <p>There will be nothing in your savings account.</p>
    <button onclick="window.location.href = 'index.html'">Continue</button>
    `
    localStorage.setItem('is_new_user', 'true')
}

async function set_debit_card_money(money) {
    localStorage.setItem('debit_card_money', money)
    document.getElementById('money').innerHTML = `Debit: $${localStorage.getItem('debit_card_money')}`
}

async function set_bank_account_money(money) {
    localStorage.setItem('bank_account_money', money)
}

async function get_debit_card_money() {
    return localStorage.getItem('debit_card_money')
}

async function get_bank_account_money() {
    return localStorage.getItem('bank_account_money')
}

async function set_income_debit_card_money(money) {
    localStorage.setItem('debit_card_money', parseInt(localStorage.getItem('debit_card_money')) + money)
    document.getElementById('money').innerHTML = `Debit: $${localStorage.getItem('debit_card_money')}`
}

async function set_income_bank_account_money(money) {
    localStorage.setItem('bank_account_money', parseInt(localStorage.getItem('bank_account_money')) + money)
}

async function set_expense_debit_card_money(money) {
    localStorage.setItem('debit_card_money', parseInt(localStorage.getItem('debit_card_money')) - money)
    document.getElementById('money').innerHTML = `Debit: $${localStorage.getItem('debit_card_money')}`
}

async function set_expense_bank_account_money(money) {
    localStorage.setItem('bank_account_money', parseInt(localStorage.getItem('bank_account_money')) - money)
}


async function set_savings_account_money(money) {
    localStorage.setItem('savings_account_money', money)
}

async function get_savings_account_money() {
    return localStorage.getItem('savings_account_money')
}


try {
    document.getElementById('money').innerHTML = `Debit: $${localStorage.getItem('debit_card_money')}`
    document.getElementById('earn_amount').innerHTML = localStorage.getItem('earn_amount')
}
catch {
}

async function roll_dice_game(bet_money) {
    if (bet_money > localStorage.getItem('debit_card_money')) {
        alert('You don\'t have enough money!')
        return false
    }

    set_expense_debit_card_money(bet_money)

    let dice = Math.floor(Math.random() * 6) + 1
    if (dice == 6) {
        set_income_debit_card_money(bet_money * 2)
        alert(`You rolled a ${dice}! You won $${bet_money * 2}!`)
    }
    else {
        alert(`You rolled a ${dice}! You lost $${bet_money}!`)
    }
    
}

async function show_account(){
    document.body.innerHTML = `
    <style>
    body {
        margin: 10px;
    }
    </style>
    <h1><i class="bi bi-person-circle"></i> You Account</h1>
    <p>Here are your account details:</p>
    <hr>
    <div class="card">
        <h1>Total money: $${parseInt(localStorage.getItem('bank_account_money')) + parseInt(localStorage.getItem('debit_card_money'))}</h1>
    </div>
    <div class="card">
        <h1>Bank account</h1>
        <p>Bank account number: ${localStorage.getItem('bank_account_number')}</p>
        <p>Bank account money: $${localStorage.getItem('bank_account_money')}</p>
    </div>
    <div class="card">
    <h1>Debit card</h1>
        <p>Debit card money: $${localStorage.getItem('debit_card_money')}</p>
        <p>Debit card pin: ${localStorage.getItem('debit_card_pin')}</p>
    </div>
    <div class="bank_card">
        <h3>Debit card</h3>
        <p class="card_number">${localStorage.getItem('debit_card_number')}</p>
        <div style="display: flex; justify-content: space-between;">
            <p class="card_expiration">Exp: ${localStorage.getItem('debit_card_expiration')}</p>
            <p class="card_cvv">CVV ${localStorage.getItem('debit_card_cvv')}</p>
        </div>
    </div>
    <div class="card">
        <h1>Savings account</h1>
        <p>Savings account number: ${localStorage.getItem('savings_account_number')}</p>
    </div>
    <br>
    <button onclick="reset_account()" style="background-color: red;">Reset account</button>
    <button onclick="window.location.href = 'index.html'">Back</button>
    <div style="margin-top: 10px;">
        <br>
    <div/>
    `
}

async function reset_account() {
    localStorage.clear()
    window.location.href = 'index.html'
}

async function upgrade_earnings(upgrade) {
    let cost = parseInt(upgrade) * 10
    if (cost > parseInt(localStorage.getItem('debit_card_money'))) {
        alert('You don\'t have enough money!')
        return false
    }
    set_expense_debit_card_money(cost)
    localStorage.setItem('earn_amount', parseInt(localStorage.getItem('earn_amount')) + upgrade)
    document.getElementById('earn_amount').innerHTML = parseInt(localStorage.getItem('earn_amount')) + upgrade
}