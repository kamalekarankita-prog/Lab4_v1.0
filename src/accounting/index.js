const readline = require('readline-sync');

let balance = 1000.00;

function main() {
    let continueFlag = true;

    while (continueFlag) {
        console.log('--------------------------------');
        console.log('Account Management System');
        console.log('1. View Balance');
        console.log('2. Credit Account');
        console.log('3. Debit Account');
        console.log('4. Exit');
        console.log('--------------------------------');
        const choice = readline.questionInt('Enter your choice (1-4): ');

        switch (choice) {
            case 1:
                viewBalance();
                break;
            case 2:
                creditAccount();
                break;
            case 3:
                debitAccount();
                break;
            case 4:
                continueFlag = false;
                console.log('Exiting the program. Goodbye!');
                break;
            default:
                console.log('Invalid choice, please select 1-4.');
        }
    }
}

function viewBalance() {
    console.log(`Current balance: ${balance.toFixed(2)}`);
}

function creditAccount() {
    const amount = readline.questionFloat('Enter credit amount: ');
    balance += amount;
    console.log(`Amount credited. New balance: ${balance.toFixed(2)}`);
}

function debitAccount() {
    const amount = readline.questionFloat('Enter debit amount: ');
    if (balance >= amount) {
        balance -= amount;
        console.log(`Amount debited. New balance: ${balance.toFixed(2)}`);
    } else {
        console.log('Insufficient funds for this debit.');
    }
}

if (require.main === module) {
    main();
}

module.exports = { balance, viewBalance, creditAccount, debitAccount, main };