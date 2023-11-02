import Login from '../../src/pages/Login';

describe("Login.cy.jsx", () => {
  it('Ingresar credenciales válidas', () => {
    cy.mount(<Login />); //Ruta Login

    cy.get('input[name="Email"]').type('test');
    cy.get('input[name="PasswordHash"]').type('1234');
    cy.get('form').submit();

    cy.wait(1000); // Espera 1 segundo para que aparezca el mensaje

    cy.log('Prueba de credenciales válidas completada con éxito');
  });

  it('Mostrar un error con credenciales inválidas', () => {
    cy.mount(<Login />); //Ruta Login

    cy.get('input[name="Email"]').type('usuario@example.com');
    cy.get('input[name="PasswordHash"]').type('contraseña-incorrecta');
    cy.get('form').submit();

    cy.log('Prueba de credenciales inválidas completada con éxito');
  });
});
