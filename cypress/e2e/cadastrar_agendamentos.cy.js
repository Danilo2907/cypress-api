/// <reference types="cypress" />
// estrutura do arquivo de testes 

// FUNCIONALIDADE
describe('Buscar agendamento', () => {
    
     // cenário 1
     it('Buscar agendamento com sucesso', () => {
        // açoes
        cy.request({
            method: "GET",
            url: "https://restful-booker.herokuapp.com/booking/123"
        })

            .then((result)  => {
               // valida o retorno 
               expect(result.status).to.equal(200)
               expect(result.body.firstname).to.equal('John')
               expect(result.body.lastname).to.equal('Smith')
               expect(result.body.totalprice).to.equal(111)
            }) 

       })

     // cenário 2
      it('Buscar agendamento com inexistente', () => {
        cy.request({
            method: "GET",
            url: "https://restful-booker.herokuapp.com/booking/999999",
            failOnStatusCode: false
            
        })
      })

})