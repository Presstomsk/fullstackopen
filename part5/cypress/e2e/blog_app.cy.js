describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.createUser({ username: 'root', name: 'Roman', password: 'root' })
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.contains('Wrong credentials')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'root', password: 'root' })

      cy.get('.error')
        .should('contain', 'Roman logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Wrong credentials')
    })

    it('fails with wrong credentials', function() {
      cy.login({ username: 'root1', password: 'root' })

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Roman logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'root' })
    })

    it('A blog can be created', function() {
      cy.createBlog({ title: 'Test blog', author: 'Roman', url: 'test@test.test' })
      cy.contains('A new blog Test blog by Roman added')
    })

    describe('When blog created in', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Test blog', author: 'Roman', url: 'test@test.test' })
      })

      it('User can like a blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('A blog Test blog by Roman updated')
      })

      it('A blog can be deleted', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('A blog Test blog by Roman removed')
      })

      it('A remove button can see only author', function() {
        cy.contains('logout').click()

        cy.createUser({ username: 'root1', name: 'Bill', password: 'root' })
        cy.login({ username: 'root1', password: 'root' })

        cy.contains('view').click()
        cy.get('.remove-button')
          .should('have.css', 'display', 'none')
      })

      it('You can see sorted blogs by likes', function() {
        cy.createBlog({ title: 'Test blog 2', author: 'Roman', url: 'test@test.test' })

        cy.get('.blog').eq(0).should('contain', 'Test blog')
        cy.get('.blog').eq(1).should('contain', 'Test blog 2')

        cy.get('.blog').eq(1).contains('view').click()
        cy.get('.blog').eq(1).contains('like').click()

        cy.get('.blog').eq(0).should('contain', 'Test blog 2')
        cy.get('.blog').eq(1).should('contain', 'Test blog')
      })
    })
  })
})