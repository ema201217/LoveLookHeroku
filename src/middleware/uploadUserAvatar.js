const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination : (req, res, cb) => {
        cb(null, path.join(__dirname, '../../public/img/User/userAvatars'))
    },
    filename : (req, file, cb) => {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`)
    }
})

const fileFilter = function(req, file, callback){
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        req.fileValidationError ="Solo imagenes(.jpg .jpeg .png .gif)"
        return callback(null,false,req.fileValidationError)
    }
    callback(null,true);
}

const uploadFile = multer({storage, fileFilter})

module.exports = uploadFile