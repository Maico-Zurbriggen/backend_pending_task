import jwt from "jsonwebtoken";

export const getNotes = ({ app, users, SECRET_KEY }) => {
  //Controller para solicitar las notas de un usuario
  app.get("/pending_task/notes", (req, res) => {
    const sessionCookie = req.cookies.session;
    const project = req.query.project;

    if (!sessionCookie) {
      return res.status(401).json("Usuario no autenticado");
    }

    jwt.verify(sessionCookie, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json("Token invalido o expirado");
      }
      const user = decoded;

      const userAuthenticated = users.find((u) => u.name === user.userName);
      if (!userAuthenticated) {
        return res.status(401).json("Usuario no encontrado");
      }
      const notesUser = userAuthenticated[project].notes;

      if (notesUser.length) {
        return res.status(200).json(notesUser);
      } else {
        return res.status(204).json("Aun no hay notas");
      }
    });
  });
};
