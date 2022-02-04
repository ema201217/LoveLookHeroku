const db = require('../database/models')
const { Op } = require('sequelize')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { validationResult } = require('express-validator')
const fs = require('fs').promises;



/* FUNCIÓN PARA CAPITALIZE - MAYÚSCULA EN LA PRIMER LETRA */
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

module.exports = {
    listProductAdmin: (req, res) => {
        db.Product.findAll({
            include: [{ association: "category" },
            { association: "season" },
            { association: "images" },
            { association: "colors" },
            { association: "sizes" }
            ]
        })
            .then(products => {
                res.render('admin/listProductAdmin', {
                    products,
                    position: "",
                    toThousand,
                    session: req.session
                })
            })
            .catch(error => console.log(error))
    },

    addProductAdmin: (req, res) => {
        let categoriesDb = db.Category.findAll()
        let seasonsDb = db.Season.findAll()
        let sizesDb = db.Size.findAll()
        let colorsDb = db.Color.findAll()
        Promise.all([categoriesDb, seasonsDb, sizesDb, colorsDb])
            .then(([categories, seasons, sizes, colors]) => {
                res.render('admin/addProducts', {
                    position: "",
                    categories,
                    colors,
                    seasons,
                    sizes,
                    capitalize,
                    session: req.session
                })
            }).catch(error => console.log(error))
    },

    productStore: (req, res) => {
        let errors = validationResult(req)
        if (req.fileValidatorError) {
            let image = {
                param: "image",
                msg: req.fileValidatorError,
            };
            errors.push(image);
        }
        if (errors.isEmpty()) {
            let arrayImages = [];
            if (req.files) {
                req.files.forEach(image => {
                    arrayImages.push(image.filename)
                })
            }

            let {
                name,
                description,
                price,
                amount,
                category,
                color,
                size,
                season,
                discount
            } = req.body

            try {
                db.Product.create({
                    name,
                    description,
                    price,
                    amount,
                    discount,
                    categoryId: category,
                    seasonId: season
                })
                    .then(product => {
                        if (arrayImages.length > 0) {
                            let images = arrayImages.map(image => {
                                return {
                                    filename: image,
                                    productId: product.id
                                }
                            })
                            db.Image.bulkCreate(images)
                        }

                        db.ProductColor.create({
                            productId: product.id,
                            colorId: color
                        })
                            .then(() => {
                                db.ProductSize.create({
                                    productId: product.id,
                                    sizeId: size
                                })
                                    .then(() => res.redirect(`/admin/products#${product.id}`))
                            })

                    })

            } catch (err) {
               res.send(err)
                /* res.redirect('/admin/products/add') */
            }
        } else {
            if (req.files > 0) {
                Promise.all(req.files.map(file => {
                    fs.unlink(`./public/img/photos/${file.filename}`)
                }))
            }

            let categoriesDb = db.Category.findAll()
            let seasonsDb = db.Season.findAll()
            let sizesDb = db.Size.findAll()
            let colorsDb = db.Color.findAll()

            Promise.all([categoriesDb, seasonsDb, sizesDb, colorsDb])
                .then(([categories, seasons, sizes, colors]) => {

                    res.render('admin/addProducts', {
                        position: "",
                        categories,
                        colors,
                        seasons,
                        sizes,
                        capitalize,
                        session: req.session,
                        errors: errors.mapped(),
                        old: req.body,
                    })
                })

                .catch(error => console.log(error))
        }



    },

    searchAdmin: (req, res) => {
        try {

           let searchProductPromise = db.Product.findAll({
                where: {
                    [Op.or]: [{
                        name: {
                            [Op.like]: `%${req.query.keys}%`
                        }
                    }, {
                        description: {
                            [Op.like]: `%${req.query.keys}%`
                        }
                    }]
                },
                include: [{ association: "category" },
                { association: "season" },
                { association: "images" },
                { association: "colors" },
                { association: "sizes" }]
            })
            let searchUserPromise = db.User.findAll({
                where: {
                    [Op.or]: [{
                        firstName: {
                            [Op.like]: `%${req.query.keys}%`
                        }
                    }, {
                        email: {
                            [Op.like]: `%${req.query.keys}%`
                        }
                    }]
                },
                include: [{ association: "location"},
                            { association: "rol"}]
            })
Promise.all([searchProductPromise,searchUserPromise])

                .then(([products,users])=> {
                    if(products.length > 0) {
                       res.render('admin/listProductAdmin', {
                        products,
                        position: "",
                        toThousand,
                        session: req.session
                    })  
                    } else if(users.length > 0) {
                        res.render('admin/users', {
                            users,
                            position: "",
                            toThousand,
                            session: req.session
                        }) 
                    }
                })
        } catch (err) {
            console.log(err);
            res.redirect('/admin/products')
        }
    },

    editProduct: (req, res) => {

        let categoriesDb = db.Category.findAll()
        let seasonsDb = db.Season.findAll()
        let sizesDb = db.Size.findAll()
        let colorsDb = db.Color.findAll()
        let productDb = db.Product.findByPk(+req.params.id, {
            include: [{ association: "category" },
            { association: "season" },
            { association: "images" },
            { association: "colors" },
            { association: "sizes" }]
        })
        Promise.all([categoriesDb, seasonsDb, sizesDb, colorsDb, productDb])
            .then(([categories, seasons, sizes, colors, product]) => {
                res.render('admin/editProduct', {
                    product,
                    categories,
                    colors,
                    sizes,
                    seasons,
                    capitalize,
                    session: req.session
                })
            })
            .catch(error => console.log(error))
    },

    updateProduct: (req, res) => {
        let errors = validationResult(req)
        if (req.fileValidatorError) {
            let image = {
                param: "image",
                msg: req.fileValidatorError,
            };
            errors.push(image);
        }
        if (errors.isEmpty()) {

            let arrayImages = [];
            if (req.files) {
                req.files.forEach(image => {
                    arrayImages.push(image.filename)
                })
            }

            let id = +req.params.id
            let {
                name,
                description,
                price,
                amount,
                category,
                color,
                size,
                season,
                discount
            } = req.body


            db.Product.update({
                name,
                description,
                price,
                amount,
                discount,
                categoryId: category,
                seasonId: season
            }, {
                where: {
                    id: id
                }
            })
                .then(() => {
                    if (arrayImages.length > 0) {
                        var imagesNew = arrayImages.map(image => {
                            return {
                                filename: image,
                                productId: id
                            }
                        })
                        if (req.files.length > 0) {

                            db.Image.findAll({
                                where: {
                                    productId: id
                                }
                            })

                                .then(images => {
                                    Promise.all(images.map(image => {
                                        fs.unlink(`./public/img/photos/${image.filename}`)
                                    }))
                                        .then(() => {
                                            images.forEach(image => {
                                                db.Image.destroy({
                                                    where: {
                                                        filename: image.filename
                                                    }
                                                })
                                            })
                                        })
                                })

                                .then(() => {
                                    db.Image.bulkCreate(imagesNew)
                                })
                        }
                    }


                    db.ProductColor.update({
                        productId: id,
                        colorId: color
                    }, {
                        where: {
                            productId: id
                        }
                    })

                    db.ProductSize.update({
                        productId: id,
                        sizeId: size
                    }, {
                        where: {
                            productId: id
                        }
                    })

                        .then(() => {
                            res.redirect(`/admin/products#${id}`)
                        })
                        .catch(err => console.log(err))
                })

        } else {
            let categoriesDb = db.Category.findAll()
            let seasonsDb = db.Season.findAll()
            let sizesDb = db.Size.findAll()
            let colorsDb = db.Color.findAll()
            let productDb = db.Product.findByPk(+req.params.id, {
                include: [{ association: "category" },
                { association: "season" },
                { association: "images" },
                { association: "colors" },
                { association: "sizes" }]
            })
            Promise.all([categoriesDb, seasonsDb, sizesDb, colorsDb, productDb])
                .then(([categories, seasons, sizes, colors, product]) => {
                    /* res.send(errors) */
                    res.render('admin/editProduct', {
                        product,
                        categories,
                        colors,
                        sizes,
                        seasons,
                        capitalize,
                        errors: errors.mapped(),
                        old: req.body
                    })
                })
        }
    },

    destroy: (req, res) => {

        try {
            let id = +req.params.id
            let color = db.ProductColor.destroy({
                where: {
                    productId: id
                }
            })

            let size = db.ProductSize.destroy({
                where: {
                    productId: id
                }
            })

            let product = db.Product.destroy({
                where: {
                    id: id
                }
            })


            let image = db.Image.destroy({
                where: {
                    productId: id
                }
            })

            Promise.all([color, size, product, image])
                .then(() => {
                    res.redirect('/admin/products')
                })
            db.Image.findAll({
                where: {
                    productId: id
                }
            })
                .then((images) => {
                    Promise.all(images.map(image => {
                        fs.unlink(`./public/img/photos/${image.filename}`)
                    }))
                })


        } catch (err) {
            console.log(err)
        }


    },

    message: (req, res) => {

        db.Message.findAll()
            .then(messages => {
                res.render('admin/messagesAdmin', {
                    session: req.session,
                    messages
                })
            })
    },
    deleteMessage: (req, res) => {
        db.Message.destroy({
            where: {
                id: +req.params.id
            }
        })
            .then(() => {
                res.redirect('/admin/messages')
            })
            .catch(err => console.log(err))
    },
    insert: {
        season: (req, res) => {
            let errors = validationResult(req)
            if (errors.isEmpty()) {
                try {
                    db.Season.create({
                        name: req.body.seasonInsert.toLowerCase()
                    })
                        .then(() => {
                            res.redirect('/admin/products/add')
                        })
                } catch (err) {
                    console.log("NO SE CREO NADA");
                }
            } else {
                let categoriesDb = db.Category.findAll()
                let seasonsDb = db.Season.findAll()
                let sizesDb = db.Size.findAll()
                let colorsDb = db.Color.findAll()

                Promise.all([categoriesDb, seasonsDb, sizesDb, colorsDb])
                    .then(([categories, seasons, sizes, colors]) => {

                        res.render('admin/addProducts', {
                            position: "",
                            categories,
                            colors,
                            seasons,
                            sizes,
                            capitalize,
                            session: req.session,
                            errors: errors.mapped(),
                            old: req.body,
                        })
                    })
                    .catch(error => console.log(error))
            }
        },

        category: (req, res) => {
            let errors = validationResult(req)
            if (errors.isEmpty()) {
                try {
                    db.Category.create({
                        name: req.body.categoryInsert
                    })
                        .then(() => {
                            res.redirect('/admin/products/add')
                        })
                } catch (err) {
                    console.log("NO SE CREO NADA");
                }
            } else {
                let categoriesDb = db.Category.findAll()
                let seasonsDb = db.Season.findAll()
                let sizesDb = db.Size.findAll()
                let colorsDb = db.Color.findAll()

                Promise.all([categoriesDb, seasonsDb, sizesDb, colorsDb])
                    .then(([categories, seasons, sizes, colors]) => {

                        res.render('admin/addProducts', {
                            position: "",
                            categories,
                            colors,
                            seasons,
                            sizes,
                            capitalize,
                            session: req.session,
                            errors: errors.mapped(),
                            old: req.body,
                        })
                    })
                    .catch(error => console.log(error))
            }

        },
        color: (req, res) => {
            let errors = validationResult(req)
            if (errors.isEmpty()) {
                try {
                    db.Color.create({
                        name: req.body.colorInsert.toLowerCase()
                    })
                        .then(() => {
                            res.redirect('/admin/products/add')
                        })
                } catch (err) {
                    console.log("NO SE CREO NADA");
                }
            } else {
                let categoriesDb = db.Category.findAll()
                let seasonsDb = db.Season.findAll()
                let sizesDb = db.Size.findAll()
                let colorsDb = db.Color.findAll()

                Promise.all([categoriesDb, seasonsDb, sizesDb, colorsDb])
                    .then(([categories, seasons, sizes, colors]) => {

                        res.render('admin/addProducts', {
                            position: "",
                            categories,
                            colors,
                            seasons,
                            sizes,
                            capitalize,
                            session: req.session,
                            errors: errors.mapped(),
                            old: req.body,
                        })
                    })
                    .catch(error => console.log(error))
            }
        }
    },
    destroyValue: {
        season: (req, res) => {
            db.Season.destroy({
                where:{
                    id: +req.params.id
            },force:true
        })
            .then(()=>{
                res.redirect('/admin/products/add')
            })
            .catch(err => console.log(err))
         },
        category: (req, res) => {
            db.Category.destroy({
                where:{
                    id: +req.params.id
            },force:true
        })
            .then(()=>{
                res.redirect('/admin/products/add')
            })
            .catch(err => console.log(err))
         },
         
        color: (req, res) => {
            db.Color.destroy({
                where:{
                    id: +req.params.id
            },force:true
        })
        .then(()=>{
                res.redirect('/admin/products/add')
        })
        .catch(err => console.log(err))
         }
    }
}