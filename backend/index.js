const express = require('express');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// datos de la configuracion del server para la bd en sql server 2022
const config = {
  user: 'sa', // een sql server aparece coomo login ahi va esto que seria como nombre de usuario
  password: 'Abc123456',  // contraseña del server
  server: 'SERVER-CAP',            // nombree del server 
  database: 'PuntoDeVenta_Test', //nombre de la bd 
  options: {
    encrypt: false,
    trustServerCertificate: true,
    instanceName: 'ABCC'           // instancia XD
  },
};


// Ruta de login
app.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM usuarios WHERE usuario = ${usuario} AND contrasena = ${contrasena}`;

    if (result.recordset.length > 0) {
      const rol = result.recordset[0].rol;
      res.json({ success: true, rol });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
