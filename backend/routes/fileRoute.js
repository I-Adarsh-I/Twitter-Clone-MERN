var express = require("express");
var multer = require("multer");
var router = express.Router();
var { upload, download } = require('../controllers/file')

router.post('/upload', upload.single('file'), (req, res) => {
    if(!req.file){
        res.status(400).json({message: 'No file uploaded'})
    }
    res.status(200).json({message: 'Image uploaded successfully', filename: req.file.filename})
})

router.get('/files/:filename', download)
module.exports = router;
