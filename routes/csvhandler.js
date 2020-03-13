const multer = require('multer');
const path = require('path');
const {parseCSV} = require('../utils/parse');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + path.extname(file.originalname));
    }
  });
  
  // Init Upload
  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('csvfile');
  
  // Check File Type
  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /csv|CSV/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());  
    if(extname){
      return cb(null,true);
    } else {
      cb('Error: csv Only!');
    }
  }
  


function csvHandler(req, res, next) {
      upload(req, res, (err) => {
        if(err){
          res.render('index', {
            msg: err
          });
        } else {
          if(req.file == undefined){
            res.render('index', {
              msg: 'Error: No File Selected!'
            });
          } else {
            let csvPath = process.cwd() + `/public/uploads/${req.file.filename}`;
            parseCSV(csvPath, req.body.currency);
            res.render('index', {
              msg: 'File Uploaded!'
            });
          }
        }
      });

}

module.exports = {
    csvHandler
}