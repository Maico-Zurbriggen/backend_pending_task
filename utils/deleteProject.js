import jwt from "jsonwebtoken";

export const deleteProject = ({app, users, SECRET_KEY}) => {
//Controller para eliminar un proyecto
app.delete("/pending_task/projects/:index", (req, res) => {
  const sessionCookie = req.cookies.session;
  const contentToDelete = req.params.index;

  if (!sessionCookie) {
    return res.status(401).json("Usuario no autenticado");
  }

  jwt.verify(sessionCookie, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json("Token invalido o caducado");
    }
    const user = decoded;

    if (!contentToDelete) {
      return res.status(400).json("No se ha encontrado el proyecto a eliminar");
    }

    users = users.map(u => {
      if (u.name === user.userName) {
        const updatedProjects = u.projects.filter(p => p.name !== contentToDelete);
        u.projects = updatedProjects;
      }
      return u;
    });
  });
});
}