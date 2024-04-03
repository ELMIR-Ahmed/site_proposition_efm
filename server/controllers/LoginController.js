const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const { Personnel } = require('../models')
const Login = async (req, res) => {
  try {
    const {CIN, motDePasse} = req.body
    if((!CIN && !motDePasse) || (!CIN || !motDePasse)) {
      return res.status(400).json({ "message" : "Merci d'entrer vos informations !" })
    }
    const personnel = await Personnel.findByPk(CIN)
    if (!personnel) {
      return res.status(400).json({ "message" : "CIN ou Mot de Passe Incorrect !" })
    }
    const comparedPasswords = await bcrypt.compare(motDePasse, personnel.motDePasse)

    if (!comparedPasswords) {
      return res.status(400).json({ "message" : "CIN ou Mot de Passe Incorrect !" })
    }

    const AccessToken = (cin, role) => {
      return jwt.sign(
        { personnelCIN : cin, fonction : role }, /* Payload */
        process.env.ACCESS_TOKEN_SECRET, /* clé secret */
        { expiresIn: '24h' }, /* Date d'expiration du token */
      )
    }
    const token = AccessToken(CIN, personnel.fonction)
    res.status(200).send({"token" : token, "fonction" : personnel.fonction, "nom" : personnel.nom, "prenom" : personnel.prenom})

  } catch (error) {
    res.status(500).json({ "message" : "Une erreur est survenue lors de l'authentification !"})
  }
}

module.exports = Login