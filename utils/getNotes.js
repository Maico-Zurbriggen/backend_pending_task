import jwt from "jsonwebtoken";

export const getNotes = (app, users, SECRET_KEY) => {
  //Controller para solicitar las notas de un usuario
  app.get("/api/notes/user", (req, res) => {
    const sessionCookie = req.cookies["session"];

    if (sessionCookie) {
      jwt.verify(sessionCookie, SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json("Token invalido o expirado");
        }
        const user = decoded;

        const userAuthenticated = users.find(u => u.name === user.userName);
        const notesUser = userAuthenticated.notes;

        if (notesUser.length) {
          return res.status(200).json(notesUser);
        } else {
          return res.status(204).json("Aun no hay notas");
        }
      });
    } else {
      return res.status(401).json("Usuario no autenticado");
    }
  });
};
