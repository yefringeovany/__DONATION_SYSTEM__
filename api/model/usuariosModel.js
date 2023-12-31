const { Sequelize, Model, DataTypes } = require("sequelize")

const sequelize = new Sequelize({
    dialect: 'mssql',
    host: 'DESKTOP-MFTH7BM\\EXAMPLE_SQL',
    port: 1433, // Puerto por defecto de SQL Server
    username: 'sa',
    password: '1234',
    database: 'SistemaDonaciones',
  });

  class Usuarios extends Model {}

  Usuarios.init(
    {
      UsuarioID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Nombre: {
        type: DataTypes.STRING,
      },
      Apellido: {
        type: DataTypes.STRING,
      },
      Email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      PasswordHash: {
        type: DataTypes.STRING,
      },
      Rol: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['Empleado', 'Donador']],
        },
      },
      Activo: {
        type: DataTypes.BOOLEAN,
      },
      Token: {
        type: DataTypes.STRING,
      },
      UltimoEmailEnviado: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Usuario',
      timestamps: false, // Si no deseas agregar campos de timestamps a tu modelo
    }
  );

  module.exports = Usuarios;

async function testConnection() {
    try {
        await sequelize.authenticate()
        console.log("All Good!")
    } catch(err) {
        console.error("All Bad!", err)
    }
} 

testConnection();