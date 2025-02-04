describe('CV Website - Basis Tests', () => {
  it('Website moet correct laden zonder fouten', {tags: ['smoke', 'critical']}, () => {
    cy.visit('/');
    cy.get('body').should('be.visible');
    cy.get('h1').should('exist');
  });

  it('Navigeert naar de Skills', () => {
    cy.visit('/');
    cy.get('nav').contains('Skills').click();
    cy.wait(500);
    cy.get('#skills').should('be.visible'); // Controleer of de skills sectie zichtbaar is
  });

  it('scrollt naar boven met back-to-top knop', () => {
    cy.visit('/');
    cy.get('nav').contains('Skills').click();
    cy.get('.back-to-top').should('be.visible');
    cy.scrollTo(0, 1000); // Scroll naar beneden op de pagina
    cy.get('.back-to-top').click();
    cy.window().its('scrollY').should('equal', 0);
  });

  it('Verstuurt een bericht via het contactformulier', () => {
    cy.visit('/');
    cy.get('input[name="name"]').type('Test Gebruiker');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('textarea[name="message"]').type('Dit is een testbericht.');
    cy.get('button[type="submit"]').click();
  });

  it('download CV als PDF', () => {
    cy.visit('/');
    cy.get('a[href*="IMG/CV-191224%20-%20Copy.pdf"]').should('be.visible');
    cy.get('a[href*="IMG/CV-191224%20-%20Copy.pdf"]').click();
  });

  it('Controleert de website op mobiel formaat', () => {
    cy.viewport('iphone-6'); // Simuleer een iPhone 6 scherm
    cy.visit('/');
    cy.get('.mobile-menu-btn').should('be.visible'); // Mobiele menu knop moet zichtbaar zijn
  });

  it('Moet script-injectie blokkeren', () => {
    cy.visit('/contact');
    cy.get('#message').type('<script>alert("XSS")</script>');
    cy.get('form').submit();
    cy.contains('<script>').should('not.exist');
  });

  it('Meet de laadsnelheid van de website', () => {
    cy.visit('/');
    cy.window().then((win) => {
      const [navTiming] = win.performance.getEntriesByType('navigation');
      expect(navTiming.domContentLoadedEventEnd).to.be.lessThan(3000);
    });


  });
});




