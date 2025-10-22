class FormPage {
    get descriptionInput() {
        return cy.get('#description');
    }

    get amountInput() {
        return cy.get('#amount');
    }

    get dateInput() {
        return cy.get('#date');
    }

    get cancelButton() {
        return cy.get('.button.cancel');
    }

    get saveButton() {
        return cy.get('button[type="submit"]');
    }

    submitForm() {
        this.saveButton.click();
    }

    fillDescription(description) {
        this.descriptionInput.type(description);
    }

    fillAmount(amount) {
        this.amountInput.type(amount);
    }

    fillDate(date) {
        this.dateInput.type(date);
    }
}

export default new FormPage();