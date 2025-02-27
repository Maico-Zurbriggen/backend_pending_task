import jwt from 'jsonwebtoken';

export const login = (app, users, SECRET_KEY) => {
  //Controller para verificar a un usuario que intenta loguearse
  app.post("/api/login", (req, res) => {
    const sessionCookie = req.cookies.session;

    if (sessionCookie) {
      return res.status(409).json({input: "password", errorMessage: "Usuario ya autenticado"});
    }

    const { name, password } = req.body;

    const user = users.find((u) => u.name === name);

    if (user) {
      if (user.password !== password) {
        return res.status(401).json({input: "password", errorMessage:"Contraseña inválida"});
      }
      const token = jwt.sign({ userName: name }, SECRET_KEY, { expiresIn: "24h" });
      res.cookie("session", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json("Usuario autenticado");
    } else {
      res.status(401).json({input: "name", errorMessage:"Usuario no encontrado"});
    }
  });
};
