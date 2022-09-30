const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log('err is---------',err)
        return res
          .status(401)
          .send({ message: "Unauthorized", success: false });
      } else {
        console.log('id is---------',req.body.userId)
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: "Auth failed", success: false });
  }
};
