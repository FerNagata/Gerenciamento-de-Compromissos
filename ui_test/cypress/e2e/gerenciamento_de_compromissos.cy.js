/// <reference types="cypress" />

describe('teste do software de gerenciamento de compromissos', () => {
    
    it('fazendo cadastro', () => {
        cy.visit('http://127.0.0.1/cadastro');
        cy.get('.email').type("mariaclara@test.com");
        cy.get('.usuario').type("Maria Clara");
        cy.get('.senha').type("test123");
        cy.get('.submit').click();  
        cy.wait(3000);

    });

    it('fazendo login', () => {
        cy.visit('http://127.0.0.1/');
        cy.get('.usuario').type("Maria Clara");
        cy.get('.senha').type("test123");
        cy.wait(2000);
        cy.get('.submit').click();
        // cy.get('[href="/visaoGeral"]').click();
        // cy.get('.hoje > div').should('have.text', "HOJE");
    });

    it('Escolhendo mes', () => {
        cy.visit('http://127.0.0.1/calendario');
        cy.get('#opcao-mes').click();
        
    });

    it('Criando um evento', () => {
        cy.visit('http://127.0.0.1/calendario');
        cy.get('.data-atual').click();
        cy.get('.add').click();
        cy.get('.titulo > input').type("Reunião com TI");
        cy.get('.hora > input').type("16:00");
        cy.get('.duracao > input').type("1 hora");
        cy.get('.localizacao > input').type("Sala 9");
        cy.get('.descricao > input').type("COnhecer a nova turma");
        cy.get('.participantes > input').type("joao@email.com; carlos@email.com.br;fernanda@email.com");
        cy.wait(2000)
        cy.get('.submit').click();
    });
    
    it('Editando um evento', () => {
        cy.visit('http://127.0.0.1/calendario')
        cy.wait(5000)
        cy.get('.data-atual').click();
        cy.get('.ajuste i').click();
        cy.get('.editar').click({force: true});
        cy.get('.titulo > input').type("Reunião com a TI - Nova turma");
        cy.get('.hora > input').type("14:00");
        cy.get('.duracao > input').type("1 hora");
        cy.get('.localizacao > input').type("Sala 10");
        cy.get('.descricao > input').type("Dar boas vindas e breve introdução");
        cy.get('.participantes > input').type("joao@email.com; carlos@email.com.br;fernanda@email.com");
        cy.get('.submit').click();
    });

    it('Deletando evento', () => {
        cy.visit('http://127.0.0.1/calendario')
        cy.wait(5000)
        cy.get('.data-atual').click();
        cy.get('.ajuste i').click();
        cy.get('.deletar').click({force: true});
    });

    it('Acessando a página de Visão Geral', () => {
        cy.visit('http://127.0.0.1/calendario')
        cy.get('[href="/visaoGeral"]').click();
        cy.wait(4000);
        cy.get('.hoje > .cabecalho').should('have.text', "HOJE");
        cy.get('.semana > .cabecalho').should('have.text', "SEMANA");
        cy.get('.mes > .cabecalho').should('have.text', "MÊS");
    });

})