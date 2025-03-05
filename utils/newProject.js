import jwt from 'jsonwebtoken';

export const newProject = ({app, users, SECRET_KEY}) => {
  //Controller para agregar nuevos proyectos
  app.post("/pending_task/projects", (req, res) => {
    const sessionCookie = req.cookies.session;

    if (!sessionCookie) {
      return res.status(401).json("Usuario no autenticado");
    }

    jwt.verify(sessionCookie, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json("Token invalido o caducado");
      }
      const user = decoded;
      const project = req.body;

      if (!users.some(u => u.projects.some(p => p.name === project.name))) {
        users = users.map(u => {
          if (u.name === user.userName) {
            u.projects.push(project);
          }
          return u;
        })

        return res.status(200).json("Proyecto creado correctamente");
      } else {
        return res.status(401).json({ input: "name", errorMessage: "Los proyectos no pueden tener el mismo nombre" });
      }
    });
  });
}