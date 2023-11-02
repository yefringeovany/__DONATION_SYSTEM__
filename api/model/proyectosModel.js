const { Sequelize, Model, DataTypes } = require("sequelize") //Importación de módulos

const sequelize = new Sequelize({
    dialect: 'mssql',
    host: 'DESKTOP-MFTH7BM\\EXAMPLE_SQL',
    port: 1433, // Puerto por defecto de SQL Server
    username: 'sa',
    password: '1234',
    database: 'SistemaDonaciones',
  });

class Proyectos extends Model {}

  Proyectos.init(
    {
      ProyectoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      NombreProyecto: {
        type: DataTypes.STRING
      },
      DescripcionProyecto: {
        type: DataTypes.STRING
      },
      EmpleadoID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Usuario',
          key: 'UsuarioID',
        },
      },
      NombreEmpleado: {
        type: DataTypes.STRING,
      },
      ApellidoEmpleado: {
        type: DataTypes.STRING,
      },
      MetaTotal: {
        type: DataTypes.DECIMAL(10, 2),
      },
      EstadoProyecto: {
        type: DataTypes.STRING,
      },
      DocumentoSoporte: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: 'Proyecto',
      timestamps: false,
    }
  );
  
  module.exports = Proyectos;

/*async function testConnection() {
    try {
        await sequelize.authenticate()
        console.log("All Good!")
    } catch(err) {
        console.error("All Bad!", err)
    }
} 

testConnection();*/