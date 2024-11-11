const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conexión a la base de datos MySQL
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root_juan', 
  password: 'cosmo-123', 
  database: 'cliente',
});

// Conexión a MySQL
conexion.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

// Definir una ruta para obtener las materias
app.get('/clientes', (req, res) => {
  const query = 'SELECT * FROM clientes';
  
  conexion.query(query, (err, results) => {
    
    if (err) {
      console.error('Error al consultar las materias:', err);
      res.status(500).json({ error: 'Error al obtener las materias' });
      return;
    }
    res.json(results);
  });
});

// Ruta para ver una materia específica
app.get('/clientes/:id', (req, res) => {
  const { id } = req.params;
const query = 'SELECT * FROM clientes WHERE id = ?';

  conexion.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al consultar la materia:', err);
      res.status(500).json({ error: 'Error al obtener la materia' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Materia no encontrada' });
      return;
    }
    res.json(results[0]);
  });
});

app.post('/enviar-formulario', (req, res) => {
  const { nombre, email, edad, sexo, materia, fecha, mensaje } = req.body;

  const query = `
    INSERT INTO clientes (nombre, email, edad, sexo, materia, fecha, mensaje)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  
  conexion.query(query, [nombre, email, edad, sexo, materia, fecha, mensaje], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos:', err);
      return res.status(500).send('Error al enviar el formulario');
    }

    // Si todo sale bien, responder con un mensaje de éxito
    res.send('Formulario enviado correctamente');
  });
});



// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
