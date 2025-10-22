import FormPage from '../support/pageObjects/FormPage';

describe('Form Submission Tests', () => {
    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/#');
    });

    it('Verify that the user can successfully submit the form with valid inputs for description, amount, and date', () => {
        FormPage.fillDescription('Test Transaction');
        FormPage.fillAmount('100.00');
        FormPage.fillDate('2023-10-01');
        FormPage.submitForm();

        // Assuming there's a success message or element to verify
        cy.get('.success-message').should('be.visible').and('contain', 'Transaction saved successfully');
    });

    it('Attempt to submit the form with an empty description field and verify that an appropriate error message is displayed', () => {
        FormPage.fillAmount('100.00');
        FormPage.fillDate('2023-10-01');
        FormPage.submitForm();

        // Assuming there's an error message for the description field
        cy.get('.error-message').should('be.visible').and('contain', 'Description is required');
    });

    it('Simulate a user entering a valid amount and then quickly changing it to an invalid format before submission, ensuring the system responds correctly', () => {
        FormPage.fillDescription('Test Transaction');
        FormPage.fillAmount('100.00');
        FormPage.fillDate('2023-10-01');

        FormPage.amountInput.clear().type('invalidAmount');
        FormPage.submitForm();

        // Assuming there's an error message for the amount field
        cy.get('.error-message').should('be.visible').and('contain', 'Amount is invalid');
    });
});