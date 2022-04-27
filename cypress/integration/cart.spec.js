describe('Verifying from adding item to Checkout functional', () => {
    beforeEach(() => {
    //   // Cypress starts out with a blank slate for each test
    const url = Cypress.config().baseUrl;
      cy.visit(url)
    })
  
    it('Add One item to Cart from Copier Paper page', () => {
      cy.AddItemToCart('/office-supplies/paper/copier-paper')
      cy.get('[data-testid="btn-viewMainHeader-CartQty"]').should(() => {
          expect(localStorage.getItem('snapinsPc')).to.eq('1')
        })
    // Cart Icon shows as 1
      cy.get('[data-testid="btn-viewMainHeader-CartQty"]', {timeout: 10000} ).should('contain', '1')
    })
    

    it('Verify at Cart Page after Adding One item to Cart', () => {
      cy.AddItemToCart('/office-supplies/paper/copier-paper')

      // Verify Cart page
      cy.visit('/cart')
      cy.get('[id*=txt-AddToCartQty]', {timeout: 10000}).should('have.value', '1')
      cy.get('#lbl-CartSummary-GrandTotal').should('be.visible')
    })

    it('Verify Delivery Details at Checkout page', () => {
      cy.AddItemToCart('/office-supplies/paper/copier-paper')

      // Verify Delivery Details page
      cy.visit('/checkout')
      cy.contains('Delivery Details').should('be.visible')
      cy.contains('Specify Delivery Information').should('be.visible')

      // Standard Home Delivery 
      cy.FillingDelivery()

      // Invoice Section
      cy.contains('Tax invoice Address').should('be.visible')

      // Go to Payment page
      cy.get('#btn-checkoutToPaymentPage').scrollIntoView().click({ force: true })
      cy.wait(3000)
      cy.url({timeout: 10000}).should('include', '/payment')
    })

    it('Verify Payment page', () => {
        cy.AddItemToCart('/office-supplies/paper/copier-paper')
        cy.visit('/checkout')
        cy.FillingDelivery()
        cy.get('#btn-checkoutToPaymentPage').scrollIntoView().click({ force: true })

        //Verify Payment
        cy.visit('/checkout/payment')
        cy.contains('Select you payment option').should('be.visible')
        cy.get('#btn-PaymentMethod-payment_service_bank_transfer').should('be.visible')
        cy.get('#btn-PaymentMethod-payment_service_fullpayment').should('be.visible')

      })


})