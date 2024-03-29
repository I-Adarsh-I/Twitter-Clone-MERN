var express = require("express");
var multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1, //size: 1mb
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
        cb(null, true)
    }else{
        cb(new Error('Only .png, .jpg, and .jpeg file types are supported'), false);
        return res.status(400).json({error: 'Only .png, .jpg and .jpeg file types are supported'})
    }
  },
});

const download = (req,res) => {
    const filename = req.params.filename;

    const filePath = path.join(__dirname,"../uploads/",filename);

    res.download(filePath, filename, (err) =>{
        if(err){
            console.log(err)
            res.status(500).json({error: "Internal server error"})
        }
    })
}

module.exports = { upload, download }