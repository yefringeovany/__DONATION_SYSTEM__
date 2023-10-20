const express = require('express');
const router = express.Router();
const sql = require('mssql')
const multer = require('multer')
const {config} = require("../config/sqlServer")

const Proyectos = require('../model/proyectosModel')

router.get('/', async (req, res) => {
    const proyecto = await Proyectos.findAll()
    res.status(200).json({
      ok: true,
      status: 200,
      body: proyecto
    })
  });

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const proyecto = await Proyectos.findOne({
      where: {
        proyectoID: id
      }
    })
    res.status(200).json({
      ok: true,
      status: 200,
      body: proyecto
    })
});

router.post("/", async (req, res) => {
  const dataProyectos = req.body
  await Proyectos.sync()
  const createProyecto = await Proyectos.create({
    NombreProyecto: dataProyectos.NombreProyecto,
    DescripcionProyecto: dataProyectos.DescripcionProyecto,
    EmpleadoID: dataProyectos.EmpleadoID,
    NombreEmpleado: dataProyectos.NombreEmpleado,
    ApellidoEmpleado: dataProyectos.ApellidoEmpleado,
    MetaTotal: dataProyectos.MetaTotal,
    EstadoProyecto: dataProyectos.EstadoProyecto
  })
  res.status(201).json({
    ok: true,
    status: 201
  })
});

router.put('/:id', async (req, res) => {
  const dataProyectos = req.body
  const id = req.params.id
  const updateProyecto = await Proyectos.update({
    NombreProyecto: dataProyectos.NombreProyecto,
    DescripcionProyecto: dataProyectos.DescripcionProyecto,
    EmpleadoID: dataProyectos.EmpleadoID,
    NombreEmpleado: dataProyectos.NombreEmpleado,
    ApellidoEmpleado: dataProyectos.ApellidoEmpleado,
    MetaTotal: dataProyectos.MetaTotal,
    EstadoProyecto: dataProyectos.EstadoProyecto
  }, {
    where: {
      proyectoID: id
    }
  })
  res.status(200).json({
    ok: true,
    status: 200,
    body: updateProyecto
  })
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const deleteProyecto = await Proyectos.destroy({
    where: {
      proyectoID: id
    }
  })
  res.status(204).json({
    ok: true,
    status: 204,
    body: deleteProyecto
  })
});

const storage = multer.memoryStorage(); // Almacenar el archivo en memoria
const upload = multer({ storage: storage });

router.post('/:id/cargar-archivo', upload.single('archivo'), async (req, res, next) => {
  const proyectoID = req.params.id;
  const archivoData = req.file.buffer; // Datos binarios del archivo

  try {
    const connection = await sql.connect(config);
    const result = await connection
      .request()
      .input("ProyectoID", sql.Int, proyectoID)
      .input("DocumentoSoporte", sql.VarBinary(sql.MAX), archivoData)
      .query("UPDATE Proyectos SET DocumentoSoporte = @DocumentoSoporte WHERE ProyectoID = @ProyectoID");
    res.status(200);
  } catch (err) {
    console.error(err);
    res.statusCode = 500; // Internal server error
    res.send(err);
  }
});

module.exports = router;