const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.post('/login', (req, res) => {
  const user = {id: 1, userName: "Maico"};
  const token = jwt.sign(user, 'clave indecifrable', { expiresIn: '1h' });

  res.cookie('token', token, { httpOnly: true, secure: true });
  res.status(200).send(true);
})

app.get('/protected', (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).send('Acceso Denegado');

  try {
    const verified = jwt.verify(token, 'clave indecifrable');
    req.user = verified;
    res.status(200).send(true);
  } catch {
    res.status(400).send(false);
  }
})

app.listen(3000, () => console.log('servidor en funcionamiento en el puerto 3000'));