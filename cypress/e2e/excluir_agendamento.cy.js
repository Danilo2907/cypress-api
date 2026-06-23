describe('Testes de Exclusão (DELETE) - Agendamentos', () => {
  
  it('Deve excluir um agendamento cadastrado com sucesso', () => {
    
    // PASSO 1: Cadastrar (POST) um novo agendamento com o Body que a API exige
    cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      body: {
        firstname: "josh",
        lastname: "allen",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-07-15",
            checkout: "2026-07-20"
        },
        additionalneeds: "Mentoria Cypress API"
      }
    }).then((responsePost) => {
      // O Restful-Booker retorna 200 (OK) na criação
      expect(responsePost.status).to.eq(200)
      
      // Captura o ID gerado (a propriedade correta nesta API é bookingid)
      const idAgendamento = responsePost.body.bookingid 

      // PASSO 2: Executar a exclusão (DELETE) usando apenas a variável na URL
      cy.request({
        method: 'DELETE',
        url: `https://restful-booker.herokuapp.com/booking/${idAgendamento}`,
        headers: {
            // A API Restful-Booker exige este header de autorização básico para o DELETE funcionar
            'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
        }
      }).then((responseDelete) => {
        // Restful-Booker retorna 201 (Created) para exclusões bem-sucedidas (uma particularidade deles)
        expect(responseDelete.status).to.eq(201)

        // PASSO 3: Validação de segurança (GET)
        cy.request({
          method: 'GET',
          url: `https://restful-booker.herokuapp.com/booking/${idAgendamento}`,
          failOnStatusCode: false
        }).then((responseGet) => {
          // O teste passa se a API retornar 404 (Not Found), confirmando que sumiu
          expect(responseGet.status).to.eq(404)
        })
      })
    })
  })
})