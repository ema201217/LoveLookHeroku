const db = require('../database/models')
const { Op } = require('sequelize')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { validationResult } = require('express-validator')
const fs = require('fs').promises;

module.exports = {
     seeUser: (req, res) => {
         db.User.findAll({
             include: [{ association: "rol"}],
             where: {
                 rolId: {
                    [Op.between]: [1, 2]
                 }
             }
         })
         .then(users => {
             res.render('admin/users', {
                 users,
                 position: "",
                 toThousand,
                 session: req.session
             })
         })
         .catch(error => console.log(error))
     },

     deleteUser: (req, res) => {
        
            db.Location.destroy({
                where: {
                    userId: req.params.id
                  },
            })
            .then(() => {
                /* db.Sales.destroy({
                    where:{
                        id:req.params.id
                    }, 
                })
                db.ShoppingCart.destroy({
                    where:{
                        id: req.params.id
                    }
                }) */
                db.User.destroy({
                where: {
                    id: req.params.id,
                },
                }).then(() => {
                
                res.redirect('/admin/users')
                })
            })
            
        },
        userChange: (req, res) => {
            db.User.update({
                rolId: 1
            },
            {
                where: {
                    id: req.params.id
                },
            }).then(() => {
                res.redirect('/admin/users')
            })
        },
        adminUserChange: (req, res) => {
            db.User.update({
                rolId: 2
            },
            {
                where: {
                    id: req.params.id
                },
            }).then(() => {
                res.redirect('/admin/users')
            })
        }
     }
