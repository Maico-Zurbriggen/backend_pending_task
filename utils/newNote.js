import jwt from "jsonwebtoken";

export const newNote = ({ app, users, SECRET_KEY }) => {
  //Controller para agregar nuevas notas
  app.post("/pending_task/notes", (req, res) => {
    const sessionCookie = req.cookies.session;

    if (!sessionCookie) {
      return res.status(401).json("Usuario no autenticado");
    }

    jwt.verify(sessionCookie, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json("Token invalido o expirado");
      }
      const user = decoded;
      const {note, project} = req.body;

      if (!note || !project || typeof note !== "object" || typeof project !== "string") {
        return res.status(400).json("Faltan datos requeridos o son inválidos");
      }

      const userToUpdate = users.find(u => u.name === user.userName);
      if (!userToUpdate) {
        return res.status(404).json("Usuario no encontrado");
      }

      const projectToUpdate = userToUpdate.projects.find(p => p.name === project);
      if (!projectToUpdate) {
        return res.status(404).json("Proyecto no encontrado");
      }

      if (projectToUpdate.notes.some(n => n.content === note.content)) {
        return res.status(409).json({ input: "content", errorMessage: "Las notas no pueden tener el mismo contenido" });
      }

      projectToUpdate.notes.push(note);
      return res.status(201).json("Nota creada correctamente");
    });
  });
}
