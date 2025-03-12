import jwt from "jsonwebtoken";

export const getNotes = ({ app, users, SECRET_KEY }) => {
  //Controller para solicitar las notas de un usuario
  app.get("/pending_task/notes", (req, res) => {
    const sessionCookie = req.cookies.session;
    const project = req.query.project;

    if (!sessionCookie) {
      return res.status(401).json("Usuario no autenticado");
    }

    if (!project || typeof project !== "string") {
      return res.status(400).json("Datos requeridos no encontrados o inválidos");
    }

    jwt.verify(sessionCookie, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json("Token invalido o expirado");
      }
      const user = decoded;

      const userAuthenticated = users.find((u) => u.name === user.userName);
      if (!userAuthenticated) {
        return res.status(404).json("Usuario no encontrado");
      }
      
      const projectUser = userAuthenticated.projects.find(p => p.name === project)
      if (!projectUser) {
        return res.status(404).json("Proyecto no encontrado");
      }
      
      if (!Array.isArray(projectUser.notes)) {
        return res.status(500).json("La estructura de datos del proyecto es inválida");
      }

      const notesProjectUser = projectUser.notes;

      if (!notesProjectUser.length) {
        return res.status(204).json("Aun no hay notas");
      }
      
      return res.status(200).json(notesProjectUser);
    });
  });
};
