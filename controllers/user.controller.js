const db = require("../app/models");
const config = require("../app/config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var session = require('express-session')

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };

  exports.bladeUser = (req, res) => {
    res.status(200).send("Muhit");
  };
exports.userBoard = async (req, res) => {

    try {
      const user = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
  
    
      let authorities = [];
      const roles = await user.getRoles();
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      // req.session.token = token;
      return res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
      });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
};

  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };