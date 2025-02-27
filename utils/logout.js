import jwt from "jsonwebtoken";

export const logout = (app, users, SECRET_KEY) => {
  //Controller para cerrar la sesion de un usuario
  app.post("/api/logout", (req, res) => {
    const sessionCookie = req.cookies.session;

    if (sessionCookie) {
      jwt.verify(sessionCookie, SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json("Token invalido o expirado");
        }

        const notes = req.body;
        const user = decoded;

        users = users.map((u) => {
          if (u.name === user.userName) {
            u.notes = notes;
          }
          return u;
        });

        res.clearCookie("session");
        res.status(200).json("Sesion cerrada con exito");
      });
    } else {
      return res.status(401).json("No hay sesion activa");
    }
  });
};
