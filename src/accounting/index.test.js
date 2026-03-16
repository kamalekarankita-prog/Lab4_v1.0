const { balance, viewBalance, creditAccount, debitAccount } = require('./index');

jest.mock('readline-sync');

const readline = require('readline-sync');

describe('Account Management System', () => {
    beforeEach(() => {
        // Reset balance before each test
        balance = 1000.00;
        jest.clearAllMocks();
    });

    test('TC001: View initial balance', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        viewBalance();
        expect(consoleSpy).toHaveBeenCalledWith('Current balance: 1000.00');
        consoleSpy.mockRestore();
    });

    test('TC002: Credit account with positive amount', () => {
        readline.questionFloat.mockReturnValue(500.00);
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        creditAccount();
        expect(balance).toBe(1500.00);
        expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: 1500.00');
        consoleSpy.mockRestore();
    });

    test('TC003: Debit account with sufficient funds', () => {
        balance = 1500.00; // Set after TC002
        readline.questionFloat.mockReturnValue(200.00);
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        debitAccount();
        expect(balance).toBe(1300.00);
        expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: 1300.00');
        consoleSpy.mockRestore();
    });

    test('TC004: Debit account with insufficient funds', () => {
        balance = 1300.00; // Set after TC003
        readline.questionFloat.mockReturnValue(2000.00);
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        debitAccount();
        expect(balance).toBe(1300.00); // Balance should remain unchanged
        expect(consoleSpy).toHaveBeenCalledWith('Insufficient funds for this debit.');
        consoleSpy.mockRestore();
    });

    test('TC007: Multiple credits and debits', () => {
        balance = 1000.00;
        // Credit 100.00
        readline.questionFloat.mockReturnValueOnce(100.00);
        creditAccount();
        expect(balance).toBe(1100.00);

        // Debit 50.00
        readline.questionFloat.mockReturnValueOnce(50.00);
        debitAccount();
        expect(balance).toBe(1050.00);

        // Credit 25.00
        readline.questionFloat.mockReturnValueOnce(25.00);
        creditAccount();
        expect(balance).toBe(1075.00);
    });

    test('TC008: Debit exact balance', () => {
        balance = 1075.00; // After TC007
        readline.questionFloat.mockReturnValue(1075.00);
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        debitAccount();
        expect(balance).toBe(0.00);
        expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: 0.00');
        consoleSpy.mockRestore();
    });

    test('TC009: Credit zero amount', () => {
        readline.questionFloat.mockReturnValue(0.00);
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        creditAccount();
        expect(balance).toBe(1000.00); // Balance unchanged
        expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: 1000.00');
        consoleSpy.mockRestore();
    });

    test('TC010: Debit zero amount', () => {
        readline.questionFloat.mockReturnValue(0.00);
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        debitAccount();
        expect(balance).toBe(1000.00); // Balance unchanged
        expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: 1000.00');
        consoleSpy.mockRestore();
    });

    // Note: TC005 (Invalid menu choice) and TC006 (Exit) are harder to test without mocking main loop,
    // but since the user asked for unit tests mirroring the scenarios, and these are more integration,
    // I'll skip them or note that they require integration testing.
});