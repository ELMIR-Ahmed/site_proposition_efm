const jwt = require('jsonwebtoken')

const checkAuthenticationANDRole =  (fonction) => {
  return (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ "message" : "Authentification requise !"})
    }
    const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    if (verifiedToken.fonction !== fonction) {
      return res.status(403).json({ "message" : "Accès refusé" })
    }

    next()

  } catch (error) {
    res.status(400).json({ "message" : "Authentification requise !" + error})
  }
}
}


module.exports = checkAuthenticationANDRole