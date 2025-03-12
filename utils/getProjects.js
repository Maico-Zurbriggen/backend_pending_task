import jwt from "jsonwebtoken";

export const getProjects = ({app, users, SECRET_KEY}) => {
  //Controller para enviar todos los proyectos de un usuario
  app.get("/pending_task/projects", (req, res) => {
    const sessionCookie = req.cookies.session;

    if (!sessionCookie) {
      return res.status(401).json("Usuario no autenticado");
    }

    jwt.verify(sessionCookie, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json("Token invalido o caducado");
      }
      const user = decoded;

      const userAuthenticated = users.find(u => u.name === user.userName);
      if (!userAuthenticated) {
        return res.status(401).json("Usuario no encontrado");
      }

      if (!Array.isArray(userAuthenticated.projects)) {
        return res.status(500).json("La estructura de datos del proyecto es inválida");
      }

      const projectsUser = userAuthenticated.projects

      if (!projectsUser.length) {
        return res.status(204).json("Aún no hay proyectos");
      }

      return res.status(200).json(projectsUser);
    });
  });
}