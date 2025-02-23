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
    res.status(401).json("No pudo registrarse el usuario")
  }
})

//Controller para verificar a un usuario que intenta loguearse
app.post('/api/login', (req, res) => {
  const { name } = req.body;

  const user = users.find(u => u.name === name);

  if (user) {
    res.cookie('session', 'some-session-token', { httpOnly:true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json(user);
  } else {
    res.status(401).json("Usuario no encontrado");
  }
});

//Controller para cerrar la sesion de un usuario
app.get('/api/logout', (req, res) => {
  res.clearCookie('session');
  res.status(200).json("Sesion cerrada con exito");
})

//Controler para verificar si un usuario esta logueado
app.get('/api/protected', (req, res) => {
  const sessionCookie = req.cookies['session'];

  if (sessionCookie) {
    res.status(200).json("Acceso permitido");
  } else {
    res.status(401).json("Acceso denegado");
  }
})

//CONTROLLERS PARA NOTAS
//Controller para agregar notas
app.post('/api/notes', (req, res) => {
  const {user, note} = req.body;

  if (Object.values(note).length) {
    if (notes[user.name]) {
      notes[user.name].push(note);
    } else {
      notes[user.name] = [note];
    }
    console.log(notes);
    res.status(201).json("Nota creada");
  } else {
    res.status(401).json("Error al crear la nota");
  }
})

//Controller para solicitar las notas de un usuario
app.post('/api/notes/user', (req, res) => {
  const user = req.body;

  const notesUser = notes[user.name];

  if (notesUser) {
    res.status(200).json(notesUser);
  } else {
    res.status(401).json("Notas no encontradas");
  }
});

app.listen(3000, () => console.log('servidor en funcionamiento en el puerto 3000'));