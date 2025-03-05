export const newUser = ({app, users}) => {
  //Controller para agregar un nuevo usuario
  app.post("/pending_task/users", (req, res) => {
    const body = req.body;
    body.projects = [];

    if (body && !users.some(u => u.name === body.name)) {
      users.push(body);
      return res.status(201).json("Usuario registrado");
    } else {
      return res.status(401).json({ input: "name", errorMessage: "Nombre de usuario ya registrado" });
    }
  });
};
