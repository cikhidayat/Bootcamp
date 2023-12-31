const multer = require('multer')

const store = multer.diskStorage({
    destination: (req, file, callback) => { 
        callback(null, 'src/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname.replace(/\s/g,'')) // 22102023-img.png
    }
})

const upload = multer({
    storage: store
})

module.exports = upload