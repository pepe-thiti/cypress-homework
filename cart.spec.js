describe('Verifying from adding item to Checkout functional', () => {
    beforeEach(() => {
    //   // Cypress starts out with a blank slate for each test
    const url = Cypress.config().baseUrl;
      // cy.clearLocalStorage().clearCookies()
      // cy.clearLocalStorage()
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
      // cy.visit('/office-supplies/paper/copier-paper')
      // cy.contains('Add to cart').first().click()
      cy.AddItemToCart('/office-supplies/paper/copier-paper')

      // Verify Cart page
      cy.visit('/cart')
      // cy.get('#txt-AddToCartQty-OFM5010111', {timeout: 10000}).should('have.value', '1')
      cy.get('[id*=txt-AddToCartQty]', {timeout: 10000}).should('have.value', '1')
      // cy.get('._3LJO1 > ._3hiFF').invoke("val")
      // .then(($price) => {
      //   // $span is the object that the previous command yielded
      //   titleText = $title.text();
      //   cy.log(titleText);
      // });
      // cy.get('#lbl-CartSummary-GrandTotal').should('contain', '555').and(($GrandTotal) => {
      //   expect(localStorage.getItem('snapinsPc')).to.eq('2')
      // const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()
      // let titleText

      // cy.get('._3LJO1 > ._3hiFF')
      //   // .find('._3LJO1 > ._3hiFF')
      //   .find('._3hiFF._3q9JJ')
      //   // cy.get('._3LJO1 > ._3hiFF')
      //   .then(($title) => {
      //     // save text from the first element
      //     titleText = normalizeText($title.text())
      //   })
      //   .log(titleText)
      
      // Check IF Price in cart is matched with Grand Total 
      cy.get('#lbl-CartSummary-GrandTotal').should('be.visible')
        // .find('lbl-CartSummary-GrandTotal')
        // .should(($identifier) => {
        //   // we can massage text before comparing
        //   const idText = normalizeText($identifier.text())
        //   // text from the title element should already be set
        //   expect(idText, 'ID').to.equal(titleText)
        // })
      // })
    })

    it('Verify Delivery Details at Checkout page', () => {
      // cy.visit('/office-supplies/paper/copier-paper')
      // cy.contains('Add to cart').first().click()
      cy.AddItemToCart('/office-supplies/paper/copier-paper')

      // Verify Delivery Details page
      cy.visit('/checkout')
      cy.contains('Delivery Details').should('be.visible')
      cy.contains('Specify Delivery Information').should('be.visible')

      // click Standard Home Delivery
      cy.FillingDelivery()
      // cy.get('[data-testid="chk-checkout-selectShippingMethod-ofm"]', {timeout: 10000}).should('be.visible').click()

      // // Filling Section
      // cy.contains('Specify Delivery Information').should('be.visible')

      // cy.get('#txt-guestDeliveryAddressForm-firstName').clear().type('Pepe')
      // cy.get('#txt-guestDeliveryAddressForm-lastName').clear().type('Demo')
      // cy.get('#txt-guestDeliveryAddressForm-phone').clear().type('0123456789')
      // cy.get('#txt-guestDeliveryAddressForm-email').clear().type('Pepe@test.com')
      // cy.get('#txt-guestDeliveryAddressForm-address').clear().type('Pepe house')
      // cy.get('#txt-guestDeliveryAddressForm-zipCode').clear().type('57000{enter}').click()
      // cy.get('#sel-guestDeliveryAddressForm-region').select('Chiang Rai')
      // cy.get('#sel-guestDeliveryAddressForm-district').select('Mae Lao')
      // cy.get('#sel-guestDeliveryAddressForm-subDistrict').select('Pong Phrae')

      // Invoice Section
      cy.contains('Tax invoice Address').should('be.visible')
      // check same as
      // cy.get('#chk-checkout-selectSameShippingAddress').click()
      // cy.get('#txt-guestBillingAddressForm-address')
      // cy.get('#txt-guestBillingAddressForm-zipCode').should('have.value', '57000')

      // Go to Payment page
      cy.get('#btn-checkoutToPaymentPage').scrollIntoView().click({ force: true })
      cy.wait(3000)
      // cy.get('#btn-checkoutToPaymentPage').click({ force: true })
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