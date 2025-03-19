import jwt from "jsonwebtoken";

export const login = ({ app, users, SECRET_KEY }) => {
  //Controller para verificar a un usuario que intenta loguearse
  app.post("/pending_task/login", (req, res) => {
    const sessionCookie = req.cookies.session;

    if (sessionCookie) {
      return res
        .status(409)
        .json({ input: "password", errorMessage: "Usuario ya autenticado" });
    }

    const { name, password } = req.body;

    if (!name || !password || typeof name !== "string" || typeof password !== "string") {
      return res.status(400).json("Datos requeridos no encontrados o inválidos");
    }

    const user = users.find((u) => u.name === name);
    if (!user) {
      return res
        .status(401)
        .json({ input: "name", errorMessage: "Usuario no encontrado" });
    }

    if (user.password !== password) {
      return res
        .status(401)
        .json({ input: "password", errorMessage: "Contraseña inválida" });
    }
    
    const token = jwt.sign({ userName: name }, SECRET_KEY, {
      expiresIn: "24h",
    });

    console.log("Este es el token", token);

    res.cookie("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    
    res.status(200).json("Usuario autenticado");
  });
};
