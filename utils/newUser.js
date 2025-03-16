export const newUser = ({app, users}) => {
  //Controller para agregar un nuevo usuario
  app.post("/pending_task/users", (req, res) => {
    console.log("CREANDO UN NUEVO USUARIO");

    const user = req.body;
    if (!user || typeof user !== "object") {
      console.log("ERROR");
      return res.status(400).json("Datos requeridos faltantes o inválidos");
    }

    user.projects = [];

    if (users.some(u => u.name === user.name)) {
      console.log("NOMBRE REPETIDO")
      return res.status(409).json({ input: "name", errorMessage: "Nombre de usuario ya registrado" });
    }

    console.log("EXITO");

    users.push(user);
    return res.status(201).json("Usuario registrado");
  });
};
