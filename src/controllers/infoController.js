let db = require('../database/models')
let { validationResult } = require('express-validator')
const fs = require('fs').promises
const fetch = require('node-fetch')


module.exports = {
    contactOther: (req, res) => {
        res.render('info/contactOther', {
            position: "",
            session: req.session
        })
    },
    contactAttention: (req, res) => {
        res.render('info/contactAttention', {
            position: "",
            session: req.session
        })
    },
    contactRRHH: (req, res) => {
        res.render('info/contactRRHH', {
            position: "",
            session: req.session
        })
    },
    contactFranchise: (req, res) => {
        res.render('info/contactFranchise', {
            position: "",
            session: req.session
        })
    },
    sendContactOther: (req, res) => {
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            let { msg,
                name,
                lastName,
                email
            } = req.body

            db.Message.create({
                issue: "Consultas generales",
                msg,
                name,
                lastName,
                email
            })
                .then(() => {
                    res.redirect(`/`)
                })
                .catch(err => console.log(err))
        } else {

            res.render(`info/contactOther`, {
                position: "",
                session: req.session,
                old: req.body,
                errors: errors.mapped()
            })
        }


    },
    sendContactAttention: (req, res) => {

        let errors = validationResult(req)

        if (errors.isEmpty()) {
            let {
                msg,
                name,
                lastName,
                email,
                phone } = req.body

            db.Message.create({
                issue: "Atención al cliente",
                msg,
                name,
                lastName,
                email,
                phone
            })
                .then(() => {

                    res.redirect(`/`)
                })
                .catch(err => console.log(err))
        } else {

            res.render(`info/contactAttention`, {
                position: "",
                session: req.session,
                old: req.body,
                errors: errors.mapped()
            })

        }


    },
    sendContactFranchise: (req, res) => {


        let errors = validationResult(req)
        console.log(errors);
        if (errors.isEmpty()) {
            let {
                msg,
                name,
                lastName,
                dni,
                email,
                phone,
                location,
                address,
                province,
                cuit,
                businessName,
                socialLocation } = req.body

            fetch("https://apis.datos.gob.ar/georef/api/provincias")
                .then(res => res.json())
                .then(provincesBack => {
                    new Promise((resolve, reject) => {
                        provincesBack.provincias.forEach(provinceItem => {
                            if (province === provinceItem.id) {
                                resolve(provinceItem.nombre)
                            }

                        })
                    })
                        .then(province => {
                            db.Message.create({
                                issue: "Franquicia",
                                msg,
                                name,
                                lastName,
                                dni,
                                email,
                                phone,
                                location,
                                address,
                                province,
                                cuit,
                                businessName,
                                socialLocation
                            })
                                .then(() => {
                                    res.redirect(`/`)
                                })
                                .catch(err => console.log(err))
                        })

                })

        } else {

            res.render(`info/contactFranchise`, {
                position: "",
                session: req.session,
                old: req.body,
                errors: errors.mapped()
            })

        }


    },
    sendContactRRHH: (req, res) => {
        let arrayCV = [];
        if (req.files) {
            req.files.forEach(cv => {
                arrayCV.push(cv.filename)
            })
        }
        let errors = validationResult(req)

        if (errors.isEmpty()) {

            let {
                name,
                lastName,
                email,
                phone,
                msg,
            } = req.body

            db.Message.create({
                issue: "RRHH",
                name,
                lastName,
                email,
                phone,
                cv: req.files.length == 0 ? null : arrayCV[0],
                msg,
            })
                .then(() => {
                    res.redirect('/')
                })
                .catch(err => console.log(err))
        } else {
            /* Elimino el archivo en el back-end */
            Promise.all(arrayCV.map(cv => {
                fs.unlink(`./public/CV/${cv}`)
            }))
                .then(() => {
                    res.render(`info/contactRRHH`, {
                        position: "",
                        session: req.session,
                        old: req.body,
                        errors: errors.mapped()
                    })
                })
        }


    },
    help: (req, res) => {
        res.render('info/help', {
            position: "",
            session: req.session
        })
    },
    we: (req, res) => {
        res.render('info/we', {
            position: "position:relative",
            session: req.session
        })
    }
}