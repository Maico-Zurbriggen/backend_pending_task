import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { newUser, login, logout, verificateLog, getNotes, newNote, deleteNote } from './utils/index.js';

//Controllers para pending-task

const SECRET_KEY = "some-secret";

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

const users = [];

//CONTROLLERS PARA USUARIOS
newUser(app, users);

login(app, users, SECRET_KEY);

logout(app, SECRET_KEY);

verificateLog(app, SECRET_KEY);


//CONTROLLERS PARA NOTAS
getNotes(app, users, SECRET_KEY);

newNote(app, users, SECRET_KEY);

deleteNote(app, users, SECRET_KEY);

app.listen(3000, () => console.log('servidor en funcionamiento en el puerto 3000'));