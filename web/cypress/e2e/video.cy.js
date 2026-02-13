describe('Tocar o video', ()=> {

    it('Deve poder tocar o video de exemplo', ()=> {
        cy.start('https://app.gerencieaqui.com.br/')
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.contains('Video').click()
    })
})