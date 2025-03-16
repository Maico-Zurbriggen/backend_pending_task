import jwt from "jsonwebtoken";

export const verificateLog = ({ app, SECRET_KEY }) => {
  //Controler para verificar si un usuario esta logueado
  app.get("/pending_task/protected", (req, res) => {
    console.log("Cookies recibidas: ", req.cookies);
    const sessionCookie = req.cookies.session;

    if (!sessionCookie) {
      console.log("ERROR");
      return res.status(401).json("Usuario no autenticado");
    }

    jwt.verify(sessionCookie, SECRET_KEY, (err) => {
      if (err) {
        console.log("ERROR");
        return res.status(401).json("Acceso denegado");
      }
      res.status(200).json("Acceso permitido");
    });
  });
};
