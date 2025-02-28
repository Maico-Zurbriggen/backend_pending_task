import jwt from "jsonwebtoken";

export const deleteNote = (app, users, SECRET_KEY) => {
  //Controller para eliminar una nota
  app.delete("/api/notes/:index", (req, res) => {
    const sessionCookie = req.cookies.session;
    const contentToDelete = req.params.index;

    if (sessionCookie) {
      jwt.verify(sessionCookie, SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json("Token invalido o expirado");
        }
        const user = decoded;

        if (contentToDelete) {
          users = users.map(u => {
            if (u.name === user.userName) {
              const updatedNotes = u.notes.filter((note) => note.content !== contentToDelete);
              u.notes = updatedNotes;
            }
            return u;
          });

          res.status(200).json("Nota eliminada correctamente");
        } else {
          res.status(400).json("No se ha enviado el indice de la nota a eliminar");
        }
      })
    } else {
      return res.status(401).json("Usuario no autenticado");
    }
  })
}