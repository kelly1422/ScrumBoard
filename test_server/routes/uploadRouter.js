const express = require("express");
const multer = require('multer');
var fs = require('fs');
const path = require('path');
const photo = require("../schemas/photo");

const router = express.Router();

//const User = require("../schemas/user");

// multer-optional
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/");	// 콜백 함수로 업로드 파일의 저장 위치를 설정한다.
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);	// 콜백 함수로 파일이 저장될 때 이름을 설정한다.
  },
  fileFilter: (req, file, cb) => {	// 파일 필터로 여기서는 파일의 확장자가 .png 혹은 .jpg 인 이미지 파일만 저장되도록 하였다.
      const ext = path.extname(file.originalname);
      if(ext !== '.png' || ext !== '.jpg'){
          return cb(res.status(400).end('only png, jpg are allowed'), false);
      } 
      cb(null, true);
  }
});

const upload = multer({ storage: storage }).single("file");

router.get('/', (req, res) => {
    
    let images = getImagesFromDir( './uploads');
    //res.render('index', { title: 'Node js – Auto Generate a Photo Gallery from a Directory', images: images })
    res.json({image:images})

});
 // Router
 router.post('/upload',  (req, res) => {
    upload(req, res, err => {
      if(err) {
          return res.json({ success: false, err});
      }
      obj = {
        photoid: res.req.file.path.replace("uploads","static"),
        name: "admin",
       
      };
      console.log("obj:"+obj.name+" "+obj.photoid);
      const photoo = new photo(obj);
      photoo.save();
      return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.fileName });
  })

})


 
// dirPath: target image directory
function getImagesFromDir(dirPath) {
 
    // All iamges holder, defalut value is empty
    let allImages = [];
 
    // Iterator over the directory
    let files = fs.readdirSync(dirPath);
 
    // Iterator over the files and push jpg and png images to allImages array.
    for (file of files) {
        let fileLocation = path.join(dirPath, file);
        var stat = fs.statSync(fileLocation);
        console.log(file)
        if (stat && stat.isDirectory()) {
            getImagesFromDir(fileLocation); // process sub directories
        } else if (stat && stat.isFile() && ['.jpg', '.png'].indexOf(path.extname(fileLocation)) != -1) {
            allImages.push('static/'+file); // push all .jpf and .png files to all images 
        }
    }
    console.log(allImages);
    // return all images in array formate
    return allImages;
}
 



module.exports = router;