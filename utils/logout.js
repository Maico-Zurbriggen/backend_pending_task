import jwt from "jsonwebtoken";

export const logout = ({ app, SECRET_KEY }) => {
  //Controller para cerrar la sesion de un usuario
  app.get("/pending_task/logout", (req, res) => {
    const sessionCookie = req.cookies.session;

    if (!sessionCookie) {
      return res.status(401).json("Usuario no autenticado");
    }

    jwt.verify(sessionCookie, SECRET_KEY, (err) => {
      if (err) {
        return res.status(401).json("Token invalido o expirado");
      }

      res.clearCookie("session");
      res.status(200).json("Sesion cerrada con exito");
    });
  });
};
