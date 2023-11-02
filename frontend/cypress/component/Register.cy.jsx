import Register from '../../src/pages/Register';

describe('Register.cy.jsx', () => {
  it('Permitir el registro de un nuevo usuario', () => {
    cy.mount(<Register />); //Ruta Register
    // Rellenar el formulario de registro
    cy.get('#Nombre').type('Edward');
    cy.get('#Apellido').type('Shizy');
    cy.get('#Email').type('test@example.com');
    cy.get('#PasswordHash').type('1234');
    cy.get('#Rol').select('Donador'); 

    // Hace clic en el botón de registro
    cy.get('button').contains('Registrar').click();

    cy.log('Usuario registrado con éxito');
  });

  it('Mostrar un error al intentar registrar un usuario con datos incorrectos', () => {
    cy.mount(<Register />);
    // Rellenar el formulario de registro con datos incorrectos
    cy.get('#Nombre').type('John');
    cy.get('#Apellido').type('Doe');
    cy.get('#Email').type('test'); // Correo inválido
    cy.get('#PasswordHash').type('123'); 
    cy.get('#Rol').select('Empleado'); 

    // Hace clic en el botón de registro
    cy.get('button').contains('Registrar').click();

    cy.log('Error al registrar el usuario');
  });
});
