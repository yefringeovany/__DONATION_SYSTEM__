const express = require('express');
const router = express.Router();
const sql = require('mssql')
const {config} = require('../config/sql_server')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let data = []
  
  try {
    await sql.connect(config)

    const resultado = await sql.query("SELECT EmpleadoID, Nombre, Cargo FROM Empleados")
    data = resultado.recordset
    await sql.close()

  } catch(err) {
    console.error(err)
    data = err
    res.statusCode = 500
  }
  res.send(data)
});

/* GET ID users listing. */
router.get('/:id', async (req, res, next) => {
  let data = {}
  
  try {
    const connection = await sql.connect(config)

    const resultado = await connection.request()
                                  .input("EmpleadoID", sql.Int, req.params.id)
                                  .query("SELECT EmpleadoID, Nombre, Cargo FROM Empleados WHERE EmpleadoID = @EmpleadoID")
    data = resultado.recordset
    await sql.close()

  } catch(err) {
    console.error(err)
    data = err
    res.statusCode = 500
  }
  res.send(data)
});

/* POST users listing. */
router.post('/', async (req, res, next) => {
  const empleado = req.body
  let resultado = {}

  try {
    let connection = await sql.connect(config)
    const result = await connection 
                              .request()
                              .input("EmpleadoID", sql.Int, empleado.EmpleadoID)
                              .input("Nombre", sql.VarChar, empleado.Nombre)
                              .input("Cargo", sql.VarChar, empleado.Cargo)
                              .query("INSERT INTO Empleados(EmpleadoID, Nombre, Cargo) VALUES (@EmpleadoID, @Nombre, @Cargo)")

    resultado = result.rowsAffected
    await connection.close()
    
  } catch(err) {
    console.error(err)
    res.statusCode = 500
    resultado = err
  }
  res.send(resultado)
}) 

/* PUT users listing. */
router.put('/:id', async (req, res, next) => {
  let data = {}
  let {Nombre, Cargo} = req.body
  
  try {
    const connection = await sql.connect(config)

    const resultado = await connection.request()
                                  .input("EmpleadoID", sql.Int, req.params.id)
                                  .query("SELECT EmpleadoID, Nombre, Cargo FROM Empleados WHERE EmpleadoID = @EmpleadoID")

      if(resultado.recordset.length > 0) {
        const result = await connection 
                              .request()
                              .input("EmpleadoID", sql.Int, req.params.id)
                              .input("Nombre", sql.VarChar, Nombre)
                              .input("Cargo", sql.VarChar, Cargo)
                              .query("UPDATE Empleados SET Nombre = @Nombre, Cargo = @Cargo WHERE EmpleadoID = @EmpleadoID")

        resultado = result.rowsAffected
      }                              
    data = resultado.recordset
    await sql.close()

  } catch(err) {
    console.error(err)
    data = err
    res.statusCode = 500
  }
  res.send(data)
});

/* DELETE users listing. */
router.delete('/:id', async (req, res, next) => {
  let data = {}

  try {
    const connection = await sql.connect(config)

    const resultado = await connection.request()
                                  .input("EmpleadoID", sql.Int, req.params.id)
                                  .query("SELECT EmpleadoID, Nombre, Cargo FROM Empleados WHERE EmpleadoID = @EmpleadoID")

      if(resultado.recordset.length > 0) {
        const result = await connection 
                              .request()
                              .input("EmpleadoID", sql.Int, req.params.id)
                              .query("DELETE FROM Empleados WHERE EmpleadoID = @EmpleadoID")

        resultado = result.rowsAffected
      }                              
    data = resultado.recordset
    await sql.close()

  } catch(err) {
    console.error(err)
    data = err
    res.statusCode = 500
  }
  res.send(data)
});

module.exports = router;
