describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
  cy.visit('./src/index.html')
})

  it('verifica o título da aplicação', () => {
   cy.title()
     .should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatorios e envio formulario', () =>  {
    const longText = Cypress._.repeat('teste', 20)

    cy.get('#firstName').type('Alice')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('aliceg.costa@hotmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0}) //  LONGTEXT - Para repetir varias x 
    cy.get('button[type="submit"]').click()


    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () =>  {
    const longText = Cypress._.repeat('teste', 20)
    cy.get('#firstName').type('Alice')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('aliceg.costa@hotmail,com')
    cy.get('#open-text-area').type(longText, {delay: 0}) //  LONGTEXT - Para repetir varias x 
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('Campo telefonico continua vazio quando preenchido com valor nao numerico', () =>  {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })


  it('Exibe mensagem de erro quando o telefone se torna obrigatorio mas nao é preenchido antes do envio do form', () =>  {
    const longText = Cypress._.repeat('teste', 20)
    cy.get('#firstName').type('Alice')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('aliceg.costa@hotmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0}) 
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })


  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () =>  {
    const longText = Cypress._.repeat('teste', 20)
    cy.get('#firstName')
      .type('Alice')
      .should('have.value', 'Alice')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Souza')
      .should('have.value', 'Souza')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('aliceg.costa@hotmail.com')
      .should('have.value', 'aliceg.costa@hotmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('119999999999')
      .should('have.value', '119999999999')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area').type(longText, {delay: 0}) 
    cy.get('#phone-checkbox').click()

 
  })
 it('Exibe msg de erro ao submeter formulario sem preencher os campos obrigatórios', () =>  {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
 })


 it('Envia o formuário com sucesso usando um comando customizado',() => {
   
  cy.fillMandatoryFieldsAndSubmit()

  cy.get('.success', { timeout: 10000 }).should('be.visible')

 })

 it('Seleciona um produto por texto',() => {
     cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')

 })

  it('Seleciona um produto por valor',() => {
     cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')

 })

  it('Seleciona um produto por indice',() => {
     cy.get('#product')
    .select(1)
    .should('have.value', 'blog')

 })

   it  ('Seleciona o tipo de atendimento "Feedback"',() => {
    cy.get('input[type="radio"][value = "feedback"]')
    .check('feedback')
    .should('be.checked')

 })

   it('Marca cada todos os tipos de atendimento"',() => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
   })   

  it('Marca ambos checkboxes e depois desmarca o último"',() => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
      })

  it('Exibe mensagem de erro quando o telefone se torna obrigatorio mas nao é preenchido antes do envio do form', () =>  {
    const longText = Cypress._.repeat('teste', 20)
    cy.get('#firstName').type('Alice')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('aliceg.costa@hotmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0}) 
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()
 
    cy.get('.error').should('be.visible')
  })

  it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => { 
        console.log(input[0].files[0].name)  
        //console.log(input)
       // expect(input[0].files[0].name).to.equal('example.json')

    })
  })
   
  it('Seleciona um arquivo da pasta simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => { 
        expect(input[0].files[0].name).to.equal('example.json')
        //console.log(input)
       // 

    }) 
  
  })
  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture("example.json").as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => { 
        expect(input[0].files[0].name).to.equal('example.json')
        //console.log(input)
      })// 

    }) 

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
   
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href',  'privacy.html')
      .and('have.attr', 'target', '_blank')
    
     

   }) 


  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {                           
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')

   }) 



})
