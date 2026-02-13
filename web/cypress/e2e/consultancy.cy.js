describe('Formulario de Consultoria', () => {
    it.only('Deve solicitar consultoria individual', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.goTo('Formulários', 'Consultoria')

        cy.get('input[placeholder="Digite seu nome completo"]').type('Francis Henrique')
        cy.get('input[placeholder="Digite seu email"]').type('francishpm@gmail.com')
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type('17 99999-1000')
            .should('have.value', '(17) 99999-1000')

        // //label[text()="Tipo de Consultoria"]/..//select
        // cy.get('#consultancyType').select('inCompany')
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('In Company')

        // //span[text()="Pessoa Física"]/..//input 
        cy.contains('label', 'Pessoa Física')
            .find('input')
            //.check()
            .click()
            .should('be.checked')

        //garantindo que o outro esta desmarcado
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type('65602530070')
            .should('have.value', '656.025.300-70')

        //Essa parte não é muito bom utilizar pra esses campos
        // cy.get('input[placeholder="000.000.000-00"]')
        // .type('65602530070')
        // .should('have.value', '656.025.300-70')

        const discoveryChannels = [
            'Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo'

        ]

        //forEach função do java script
        discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/document.pdf', { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')


        const techs = [
            'Cypress',
            'Selenium',
            'WebDriverIO',
            'Playwright',
            'Robot Framework'
        ]

        techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')

        })

        cy.contains('label', 'termos de uso')
            .find('input')
            .check()

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal', {timeout: 7000})
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

        
    })

    it('Deve verificar os campos obrigatorios', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.goTo('Formulários', 'Consultoria')

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.contains('label', 'Nome Completo')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'Email')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'termos de uso')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Você precisa aceitar os termos de uso')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

    })


});

