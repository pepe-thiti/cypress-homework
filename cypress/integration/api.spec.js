context('Network Requests', () => {
    beforeEach(() => {
        const url = Cypress.config().baseUrl;
        cy.visit(url)
    })
    it('Add to Cart', () => {
        cy.request('POST','https://www.officemate.co.th/api/cart/addToCart')
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('cartItem')
        })
    })

    it('Check Cart', () => {
        cy.request('GET','https://www.officemate.co.th/api/cart?cartId=82582331&reload=true')
    //   cy.request('https://jsonplaceholder.cypress.io/comments')
        .should((response) => {
          expect(response.status).to.eq(200)
        //   expect(response.body).has.property('qty','1')
          expect(response.body).to.have.property('cart')
        })
    })

    

})