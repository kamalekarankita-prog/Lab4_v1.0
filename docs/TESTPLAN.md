# Test Plan for COBOL Account Management System

This test plan covers the business logic of the COBOL account management application. It includes test cases for viewing balance, crediting, debiting, and handling invalid inputs. The plan is designed to validate functionality with business stakeholders and will later be used to create unit and integration tests in a Node.js application.

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|--------------|-----------------------|----------------|------------|-----------------|---------------|--------|----------|
| TC001 | View initial balance | Application is running, balance is 1000.00 | 1. Start the application<br>2. Select option 1 (View Balance) | Displays "Current balance: 1000.00" |  |  | Initial balance check |
| TC002 | Credit account with positive amount | Application is running, balance is 1000.00 | 1. Select option 2 (Credit Account)<br>2. Enter amount 500.00<br>3. Confirm | Displays "Amount credited. New balance: 1500.00" |  |  | Test credit functionality |
| TC003 | Debit account with sufficient funds | Application is running, balance is 1500.00 (after TC002) | 1. Select option 3 (Debit Account)<br>2. Enter amount 200.00<br>3. Confirm | Displays "Amount debited. New balance: 1300.00" |  |  | Test debit with sufficient funds |
| TC004 | Debit account with insufficient funds | Application is running, balance is 1300.00 (after TC003) | 1. Select option 3 (Debit Account)<br>2. Enter amount 2000.00<br>3. Confirm | Displays "Insufficient funds for this debit." and balance remains 1300.00 |  |  | Test overdraft prevention |
| TC005 | Invalid menu choice | Application is running | 1. Enter invalid choice (e.g., 5)<br>2. Confirm | Displays "Invalid choice, please select 1-4." and returns to menu |  |  | Test input validation |
| TC006 | Exit application | Application is running | 1. Select option 4 (Exit) | Displays "Exiting the program. Goodbye!" and terminates |  |  | Test exit functionality |
| TC007 | Multiple credits and debits | Application is running, balance is 1000.00 | 1. Credit 100.00<br>2. Debit 50.00<br>3. Credit 25.00<br>4. View balance | Balance should be 1075.00 |  |  | Test sequence of operations |
| TC008 | Debit exact balance | Application is running, balance is 1075.00 (after TC007) | 1. Debit 1075.00 | Displays "Amount debited. New balance: 0.00" |  |  | Test debiting entire balance |
| TC009 | Credit zero amount | Application is running | 1. Select option 2<br>2. Enter amount 0.00 | Balance remains unchanged, displays new balance same as old |  |  | Edge case: zero credit |
| TC010 | Debit zero amount | Application is running | 1. Select option 3<br>2. Enter amount 0.00 | Balance remains unchanged, displays new balance same as old |  |  | Edge case: zero debit |