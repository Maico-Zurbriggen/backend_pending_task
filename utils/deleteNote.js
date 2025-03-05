import jwt from "jsonwebtoken";

export const deleteNote = ({ app, users, SECRET_KEY }) => {
  //Controller para eliminar una nota
  app.delete("/pending_task/notes/:index", (req, res) => {
    const sessionCookie = req.cookies.session;
    const contentToDelete = req.params.index;
    const project = req.body;

    if (!sessionCookie) {
      return res.status(401).json("Usuario no autenticado");
    }

    jwt.verify(sessionCookie, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json("Token invalido o expirado");
      }
      const user = decoded;

      if (!contentToDelete) {
        return res.status(400).json("No se encontro la nota a eliminar");
      }

      users = users.map((u) => {
        if (u.name === user.userName) {
          const updatedNotes = u[project].notes.filter(
            (note) => note.content !== contentToDelete
          );
          u[project].notes = updatedNotes;
        }
        return u;
      });

      res.status(200).json("Nota eliminada correctamente");
    });
  });
};
