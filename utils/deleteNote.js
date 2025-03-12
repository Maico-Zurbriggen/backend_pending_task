import jwt from "jsonwebtoken";

export const deleteNote = ({ app, users, SECRET_KEY }) => {
  //Controller para eliminar una nota
  app.delete("/pending_task/notes/:index", (req, res) => {
    const sessionCookie = req.cookies.session;
    const contentToDelete = req.params.index;
    const project = req.query.project;

    if (!sessionCookie) {
      return res.status(401).json("Usuario no autenticado");
    }

    if (!project || !contentToDelete) {
      return res.status(400).json("Ausencia de datos requeridos");
    }

    jwt.verify(sessionCookie, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json("Token invalido o expirado");
      }
      const user = decoded;

      const userToUpdate = users.find(u => u.name === user.userName);
      if (!userToUpdate) {
        return res.status(404).json("Usuario no encontrado");
      }

      const projectToUpdate = userToUpdate.projects.find(p => p.name === project);
      if (!projectToUpdate) {
        return res.status(404).json("Proyecto no encontrado");
      }

      if (!Array.isArray(projectToUpdate.notes)) {
        return res.status(500).json("La estructura de datos del proyecto es inválida");
      }

      projectToUpdate.notes = projectToUpdate.notes.filter(n => n.content !== contentToDelete);
      res.status(200).json("Nota eliminada correctamente");
    });
  });
};
