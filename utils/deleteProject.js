import jwt from "jsonwebtoken";

export const deleteProject = ({app, users, SECRET_KEY}) => {
//Controller para eliminar un proyecto
app.delete("/pending_task/projects/:index", (req, res) => {
  const sessionCookie = req.cookies.session;
  const contentToDelete = req.params.index;

  if (!sessionCookie) {
    return res.status(401).json("Usuario no autenticado");
  }

  if (!contentToDelete || typeof contentToDelete !== "string") {
    return res.status(400).json("Datos requeridos no encontrados o inválidos")
  }

  jwt.verify(sessionCookie, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json("Token invalido o caducado");
    }
    const user = decoded;

    const userToUpdate = users.find(u => u.name === user.userName);
    if (!userToUpdate) {
      return res.status(404).json("Usuario no encontrado");
    }

    if (!Array.isArray(userToUpdate.projects)) {
      return res.status(500).json("La estructura de datos del proyecto es inválida");
    }

    userToUpdate.projects = userToUpdate.projects.filter(p => p.name !== contentToDelete);
    res.status(200).json("Proyecto eliminado correctamente");
  });
});
}