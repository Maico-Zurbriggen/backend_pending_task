import jwt from "jsonwebtoken";

export const verificateLog = ({ app, SECRET_KEY }) => {
  //Controler para verificar si un usuario esta logueado
  app.get("/pending_task/protected", (req, res) => {
    const sessionCookie = req.cookies.session;

    if (!sessionCookie) {
      return res.status(401).json("Usuario no autenticado");
    }

    jwt.verify(sessionCookie, SECRET_KEY, (err) => {
      if (err) {
        return res.status(401).json("Acceso denegado");
      }
      res.status(200).json("Acceso permitido");
    });
  });
};
