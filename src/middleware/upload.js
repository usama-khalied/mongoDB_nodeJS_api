const path = require('path');
const multer =  require('multer');

const storage = multer.diskStorage({
    destination:"uploads/",
    filename: function (req, file, cb) {
        if(file != null){
            let ext = path.extname(file.originalname);
            cb(null, Date.now() + ext)
        }     
    }
  })



var upload = multer({
    storage:storage,
    fileFilter:function(req,file,callback) {
        // if(file.mimetype=="image/png" || file.mimetype=="image/jpg") {
        // }
        callback(null,true)
        // else {
        //     console.log("only jpg & png allowed")
        // }
    },
    limits: {
        fileSize:1024 * 1024 * 2
    }
}).single('ProductImage');


module.exports = upload