export const newUser = (app, users) => {
  //Controller para agregar un nuevo usuario
  app.post("/api/users", (req, res) => {
    const body = req.body;

    if (body && !users.some(u => u.name === body.name)) {
      body.notes = [];
      users.push(body);
      return res.status(201).json("Usuario registrado");
    } else {
      return res.status(401).json("No pudo registrarse el usuario");
    }
  });
};
