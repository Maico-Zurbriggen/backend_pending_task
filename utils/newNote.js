import jwt from "jsonwebtoken";

export const newNote = (app, users, SECRET_KEY) => {
  //Controller para agregar nuevas notas
  app.post("/api/notes", (req, res) => {
    const sessionCookie = req.cookies.session;

    if (sessionCookie) {
      jwt.verify(sessionCookie, SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json("Token invalido o expirado");
        }
        const user = decoded;
        const note = req.body;

        if (!users.some((u) => u.notes.some((n) => n.content === note.content))) {
          users = users.map((u) => {
            if (u.name === user.userName) {
              u.notes.push(note);
            }
            return u;
          });
          return res.status(201).json("Nota agregada correctamente");
        } else {
          return res.status(401).json({ input: "content", errorMessage: "Las notas no pueden tener el mismo contenido" });
        }
      });
    } else {
      res.status(401).json("Usuario no autenticado");
    }
  });
};
