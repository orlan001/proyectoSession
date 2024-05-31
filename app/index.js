import  express  from "express";
import path from "path"
import {fileURLToPath} from "url";
const _dirname = path.dirname(fileURLToPath(import.meta.url))
import {metodos as autenticacion} from './controlador/autenticacion.js'
import {metodos as autorizacion} from './intermedio/autorizacion.js'
import cookieParser from "cookie-parser";
import  dotenv  from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

//servidor
app.listen(PORT, ()=>{
    console.log("servidor iniciado en el puerto", PORT)
})

//rutas
app.use(express.static(_dirname + "/public"));
app.use(express.static(_dirname + "/public/img"));
app.use(express.json())
app.use(cookieParser())

app.get("/",autorizacion.soloPublico, (req, res)=>res.sendFile(_dirname +"/pages/login.html"))
app.get("/registro",autorizacion.soloPublico, (req, res)=>res.sendFile(_dirname +"/pages/registro.html"))
app.get("/admin",autorizacion.soloAdmin, (req, res)=>res.sendFile(_dirname +"/pages/admin/admin.html"))
app.post("/api/registro",autenticacion.registro)
app.post("/api/login",autenticacion.login)

