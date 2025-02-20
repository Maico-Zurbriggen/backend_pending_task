const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//Controllers para pending-task

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

const users = [];
const notes = {};

//CONTROLLERS PARA USUARIOS
//Controller para agregar un nuevo usuario
app.post('/api/users', (req, res) => {
  const body = req.body;

  if (body) {
    users.push(body);
    res.cookie('session', body.name, { httpOnly:true, maxAge: 24 * 60 * 60 * 1000});
    res.status(201).json(body);
  } else {
    res.status(401).json({ message: "No pudo registrarse el usuario" })
  }
})

//Controller para verificar a un usuario que intenta loguearse
app.post('/api/login', (req, res) => {
  const { name, password } = req.body;

  const user = users.find(u => u.name === name && u.password === password);

  if (user) {
    res.cookie('session', 'some-session-token', { httpOnly:true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({ message: "Sesion iniciada" });
  } else {
    res.status(401).json({ message: "Credenciales Incorrectas" });
  }
});

//Controler para verificar si un usuario esta logueado
app.get('/api/protected', (req, res) => {
  const sessionCookie = req.cookies['session'];

  if (sessionCookie) {
    res.status(200).json({ message: "Acceso permitido" });
  } else {
    res.status(401).json({ message: "Acceso denegado" });
  }
})

//CONTROLLERS PARA NOTAS
//Controller para agregar notas
app.post('/api/notes', (req, res) => {
  const body = req.body;
  const user = body.user;
  
  delete body.user;

  if (body) {
    if (notes[user]) {
      notes[user].push(body);
    } else {
      notes[user] = [body];
    }
    res.status(201).json({ message: "Nota creada" });
  } else {
    res.status(401).json({ message: "Error al crear la nota" });
  }
})

//Controller para solicitar las notas de un usuario
app.get('/api/notes/user', (req, res) => {
  const user = req.body;

  const notesUser = notes[user];

  if (notesUser) {
    res.status(200).json(notesUser);
  } else {
    res.status(401).json({ message: "Notas no encontradas" });
  }
})

app.listen(3000, () => console.log('servidor en funcionamiento en el puerto 3000'));