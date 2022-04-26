// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('AddItemToCart',()  => {
    cy.visit('/office-supplies/paper/copier-paper')
    cy.contains('Add to cart').first().click()
})



Cypress.Commands.add('FillingDelivery', ()=> {
    // click Standard Home Delivery
    cy.get('[data-testid="chk-checkout-selectShippingMethod-ofm"]', {timeout: 10000}).should('be.visible').click()
    // Filling Section
    cy.contains('Specify Delivery Information').should('be.visible')
    cy.get('#txt-guestDeliveryAddressForm-firstName').clear().type('Pepe')
    cy.get('#txt-guestDeliveryAddressForm-lastName').clear().type('Demo')
    cy.get('#txt-guestDeliveryAddressForm-phone').clear().type('0123456789')
    cy.get('#txt-guestDeliveryAddressForm-email').clear().type('Pepe@test.com')
    cy.get('#txt-guestDeliveryAddressForm-address').clear().type('Pepe house')
    cy.get('#txt-guestDeliveryAddressForm-zipCode').clear().type('57000{enter}').click()
    cy.get('#sel-guestDeliveryAddressForm-region').select('Chiang Rai')
    cy.get('#sel-guestDeliveryAddressForm-district').select('Mae Lao')
    cy.get('#sel-guestDeliveryAddressForm-subDistrict').select('Pong Phrae')

    // Invoice Section
    cy.contains('Tax invoice Address').should('be.visible')
    // check same as
    cy.get('#chk-checkout-selectSameShippingAddress').click()
    cy.get('#txt-guestBillingAddressForm-address')
    cy.get('#txt-guestBillingAddressForm-zipCode').should('have.value', '57000')
    // Go to Payment page
    cy.get('#btn-checkoutToPaymentPage').scrollIntoView().click({ force: true })
    cy.wait(3000)
    cy.get('#btn-checkoutToPaymentPage').click({ force: true })
    cy.url({timeout: 10000}).should('include', '/payment')

})
