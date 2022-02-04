const db = require("../database/models");
const Op = require("sequelize");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  register: (req, res) => {
    res.render("users/register", {
      position: "position:relative;",
      session: req.session,
    });
  },
  login: (req, res) => {
    res.render("users/login", {
      position: "position:relative;",
      session: req.session,
    });
  },
  forget:(req, res) => {
    res.render('users/forgetPass', {
      position: "position:relative;",
      session: req.session,
    })
  },
  profile: (req, res) => {
    db.User.findOne({
      where: {
        id: req.session.user.id,
      },
      include: [{ association: "location" }],
    })
      .then((user) => {
        console.log(user);

        res.render("users/perfilUser", {
          position: "position:relative;",
          user,
          session: req.session,
        });
      })
      .catch((err) => console.log(err));
  },
  profileEdit: (req, res) => {
    db.User.findByPk(req.session.user.id, {
      include: [{ association: "location" }],
    }).then((user) => {
      res.render("users/userProfileEdit", {
        position: "position:relative;",
        user,
        session: req.session,
      });
    });
  },
  updateProfile: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let { firstName, lastName, phone,email, address, pc, province, city } =
        req.body;

      db.User.update(
        {
          email,
          firstName,
          lastName,
          phone,
          avatar: req.file ? req.file.filename : req.session.user.avatar,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then((user) => {
        db.Location.update({
          address,
          city,
          province,
          pc
        },{
          where:{
            userId:req.session.user.id
          }
        }).then(() => {
          res.redirect("/user/perfil");
        });
      });
    } else {
      res.render("users/userProfileEdit", {
        position: "position:relative;",
        errors: errors.mapped(),
        old: req.body,
        session: req.session,
      });
    }
  },
  deleteProfile: (req, res) => {
db.Location.destroy({
        where: {
          userId: req.params.id,
        },
      })
    .then(() => {db.User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        req.session.destroy();
        if (req.cookies.userLoveLook) {
          res.cookie("userLoveLook", "", { maxAge: -1 });
        }
        res.redirect("/");
      });
    });
  },
  processLogin: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      db.User.findOne({
        where: {
          email: req.body.email,
        },
      }).then((user) => {
        req.session.user = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          rol: user.rolId,
          id_social: 0,
          avatar: user.avatar,
          social_provider: "local",
        };
        if (req.body.remember) {
          res.cookie("userLoveLook", req.session.user, { expires: new Date(Date.now() + 90000), httpOnly: true })
      };
        res.locals.user = req.session.user;

        res.redirect("/");
      });
    } else {
      res.render("users/login", {
        position: "position: relative;",
        errors: errors.mapped(),
        old: req.body,
        session: req.session,
      });
    }
  },
  processRegister: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let { firstName, lastName, email, password ,pc ,address,city,province} = req.body;
      db.User.create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 12),
        rolId: 1,
        avatar: "default-image.png",
        social_provider: "local",
        id_social: 0,
      })
        .then((user) => {
          db.Location.create({
            pc,
            address,
            city,
            province,
            userId:user.id
          })
          res.redirect("/user/login");
        })
        .catch((err) => console.log(err));
    } else {
      res.render("users/register", {
        errors: errors.mapped(),
        old: req.body,
        session: req.session,
        position: "position: relative",
      });
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    if (req.cookies.userLoveLook) {
      res.cookie("userLoveLook", "", { maxAge: -1 });
    }
    res.redirect("/");
  },
  cart: (req, res) => {
    db.Product.findAll({
      where: {
        discount: {
          [Op.gte]: 20,
        },
      },
      limit: 8,
      include: [
        { association: "category" },
        { association: "images" },
        { association: "colors" },
        { association: "season" },
        { association: "sizes" },
      ],
    }).then((products) => {
      res.render("users/productCart", {
        products,
        position: "",
        toThousand,
        session: req.session,
      });
    });
  },
  loginGoogle: (req, res) => {
    req.session.user = {
      id: req.session.passport.user.id,
      firstName: req.session.passport.user.firstName,
      lastName: req.session.passport.user.lastName,
      email: req.session.passport.user.email,
      id_social: req.session.passport.user.id_social,
      rol: 1,
      social_provider: req.session.passport.user.social_provider,
      avatar: req.session.passport.user.avatar,
      phone: req.session.passport.user.phone,
    };
    res.cookie("userLoveLook", req.session.user, { expires: new Date(Date.now() + 90000), httpOnly: true })
    res.redirect("/");
  },
  loginFacebook: (req, res) => {
   
    let arr = req.session.passport.user.firstName.split(" ");
    console.log(arr);
    req.session.user = {
      id: req.session.passport.user.id,
      firstName: arr[0],
      lastName: arr[1],
      email: req.session.passport.user.email,
      id_social: req.session.passport.user.id_social,
      rol: 1,
      social_provider: req.session.passport.user.social_provider,
      avatar: req.session.passport.user.avatar,
      phone: req.session.passport.user.phone,
    };
    res.cookie("userLoveLook", req.session.user, { expires: new Date(Date.now() + 90000), httpOnly: true })
    res.redirect("/");
  },
};
