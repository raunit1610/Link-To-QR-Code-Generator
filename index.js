import express from "express"
import qr from "qr-image"
import fs from "fs"

const app = express();
const PORT = 8000;
var Validity = "no";

app.get("/",(req,res) =>{
    return res.render("index.ejs");
})

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.post("/qr",(req,res) =>{
    if(req.body.image != ""){
        Validity = "yes";

        const url = req.body.image;
  
        if (url) {
          var qr_svg = qr.image(url);
          qr_svg.pipe(fs.createWriteStream("public/images/qr_imag.png"));
      
          fs.appendFile("URL.txt", url, (err) => {
            if (err) {
              throw err;
            }
          });
        }
    }
    return res.render("index.ejs",{verify: Validity})
})
app.listen(PORT, () =>{
    console.log(`Server Is Live At PORT:${PORT}`);
})