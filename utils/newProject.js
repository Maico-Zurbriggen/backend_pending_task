import jwt from 'jsonwebtoken';

export const newProject = ({app, users, SECRET_KEY}) => {
  //Controller para agregar nuevos proyectos
  app.post("/pending_task/projects", (req, res) => {
    const sessionCookie = req.cookies.session;
    const project = req.body;

    if (!sessionCookie) {
      return res.status(401).json("Usuario no autenticado");
    }

    if (!project || typeof project !== "object") {
      return res.status(400).json("Datos requeridos no encontrados o son inválidos");
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

      if (!Array.isArray(userToUpdate.projects)){
        return res.status(500).json("La estructura de datos del proyecto es inválida");
      }

      if (userToUpdate.projects.some(p => p.name === project.name)) {
        return res.status(409).json({ input: "name", errorMessage: "Los proyectos no pueden tener el mismo nombre" });
      }

      userToUpdate.projects.push(project);
      return res.status(200).json("Proyecto creado correctamente");
    });
  });
}