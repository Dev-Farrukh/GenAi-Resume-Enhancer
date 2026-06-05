import multer from "multer"

const upload = multer({
    storage : multer.memoryStorage(),
    limits : {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter : (req, file, cb) => {
        if(file.mimetype === "application/pdf"){
            cb(null, true)
        }else{
            cb(new Error("Only PDF files are allowed"))
        }
    }
})

const uploadSingle = (fieldname) => (req, res, next) => {
    upload.single(fieldname)(req, res, (err)=> {
        if(err instanceof multer.MulterError){
            return res.status(400).json({ message:`Cannot upload pdf ${err.message}` })
        }else if(err){
            return res.status(400).json({ message: err.message })
        }
        next()
    })
}

export default uploadSingle