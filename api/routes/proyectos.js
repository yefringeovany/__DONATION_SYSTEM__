const express = require('express');
const router = express.Router();
const sql = require('mssql')
const {config} = require("../config/sql_server")

router.get('/', async (req, res, next)=> {
    let data = []
  
    try{
      //Abrimos la conexion
      await sql.connect(config)
      //ejecutamos la consulta
      const resultado = await sql.query("SELECT ProyectoID, NombreProyecto, DescripcionProyecto, EmpleadoID, NombreEmpleado, ApellidoEmpleado, MetaTotal, EstadoProyecto FROM Proyectos")
      data = resultado.recordset
    }

    catch(err){
      console.error(err)
      data = err
      res.statusCode = 500 //Internal server error
    }
    res.send(data)
  });

router.get('/:id', async (req, res, next) => {
    let data = {}
    
    try{
      //Abrimos la conexion
      const connection = await sql.connect(config)
      //ejecutamos la consulta
      const resultado = await connection.request()
                          .input("ProyectoID", sql.Int, req.params.id)
                          .query("SELECT ProyectoID, NombreProyecto, DescripcionProyecto, EmpleadoID, NombreEmpleado, ApellidoEmpleado, MetaTotal, EstadoProyecto FROM Proyectos WHERE ProyectoID = @ProyectoID")
      data = resultado.recordset[0]
    }

    catch(err){
      console.error(err)
      data = err
      res.statusCode = 500 //Internal server error
    }
    res.send(data)
});

router.post("/", async (req, res, next) => {
  const proyecto = req.body;
  let resultado = {};
  try {
      const connection = await sql.connect(config);
      const result = await connection
          .request()
          .input("NombreProyecto", sql.VarChar, proyecto.NombreProyecto)
          .input("DescripcionProyecto", sql.VarChar, proyecto.DescripcionProyecto)
          .input("EmpleadoID", sql.Int, proyecto.EmpleadoID)
          .input("NombreEmpleado", sql.VarChar, proyecto.NombreEmpleado)
          .input("ApellidoEmpleado", sql.VarChar, proyecto.ApellidoEmpleado)
          .input("MetaTotal", sql.Money, proyecto.MetaTotal )
          .input("EstadoProyecto", sql.VarChar, proyecto.EstadoProyecto)
          .query("INSERT INTO Proyectos (NombreProyecto, DescripcionProyecto, EmpleadoID, NombreEmpleado, ApellidoEmpleado, MetaTotal, EstadoProyecto) VALUES (@NombreProyecto, @DescripcionProyecto, @EmpleadoID, @NombreEmpleado, @ApellidoEmpleado, @MetaTotal, @EstadoProyecto)");
      resultado = result.rowsAffected
  } catch (err) {
      console.error(err);
      res.statusCode = 500;
      resultado = err;
  }
  res.send(resultado);
});

router.put('/:id', async (req, res, next) => {
  let data = {};
  let {NombreProyecto, DescripcionProyecto, EmpleadoID, NombreEmpleado, ApellidoEmpleado, MetaTotal, EstadoProyecto } = req.body;

  try {
      const connection = await sql.connect(config);
      const resultado = await connection.request()
          .input("ProyectoID", sql.Int, req.params.id) // Declara y asigna el valor de proyectoID.
          .query("SELECT NombreProyecto, DescripcionProyecto, ProyectoID, EmpleadoID, NombreEmpleado, ApellidoEmpleado, MetaTotal, EstadoProyecto FROM Proyectos WHERE ProyectoID = @ProyectoID");

      if (resultado.recordset.length > 0) {
          const result = await connection
              .request()
              .input("ProyectoID", sql.Int, req.params.id)
              .input("NombreProyecto", sql.VarChar, NombreProyecto)
              .input("DescripcionProyecto", sql.VarChar, DescripcionProyecto)
              .input("EmpleadoID", sql.Int, EmpleadoID)
              .input("NombreEmpleado", sql.VarChar, NombreEmpleado)
              .input("ApellidoEmpleado", sql.VarChar, ApellidoEmpleado)
              .input("MetaTotal", sql.Money, MetaTotal )
              .input("EstadoProyecto", sql.VarChar, EstadoProyecto)
              .query("UPDATE Proyectos SET NombreProyecto = @NombreProyecto, DescripcionProyecto = @DescripcionProyecto, EmpleadoID = @EmpleadoID, NombreEmpleado = @NombreEmpleado, ApellidoEmpleado = @ApellidoEmpleado, MetaTotal = @MetaTotal, EstadoProyecto = @EstadoProyecto WHERE ProyectoID = @ProyectoID");
          data = result.rowsAffected;
      }
  } catch (err) {
      console.error(err);
      data = err;
      res.statusCode = 500; // Internal server error
  }
  res.send(data);
});

router.delete('/:id', async (req, res, next)=> {
  let data = {}
  try{
    //Abrimos la conexion
    const connection = await sql.connect(config)
    //ejecutamos la consulta
    const resultado = await connection.request()
                        .input("ProyectoID", sql.Int, req.params.id)
                        .query("SELECT ProyectoID FROM Proyectos WHERE ProyectoID = @ProyectoID")
    if (resultado.recordset.length > 0){
      const result = await connection
      .request()
      .input("ProyectoID", sql.Int, req.params.id)
      .query("DELETE FROM Proyectos WHERE ProyectoID = @ProyectoID")
       data = result.rowsAffected
    }
    //await sql.close()

  }
  catch(err){
    console.error(err)
    data = err
    res.statusCode = 500 //Internal server error
  }
  res.send(data)
});

module.exports = router;