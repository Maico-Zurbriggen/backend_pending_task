export const newUser = ({app, users}) => {
  //Controller para agregar un nuevo usuario
  app.post("/pending_task/users", (req, res) => {
    const user = req.body;
    if (!user || typeof user !== "object") {
      return res.status(400).json("Datos requeridos faltantes o inválidos");
    }

    user.projects = [];

    if (users.some(u => u.name === user.name)) {
      return res.status(409).json({ input: "name", errorMessage: "Nombre de usuario ya registrado" });
    }

    users.push(user);
    return res.status(201).json("Usuario registrado");
  });
};
