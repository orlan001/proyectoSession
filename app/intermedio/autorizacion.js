
import jsonwebtoken  from 'jsonwebtoken';
import dotenv from 'dotenv';
import  {usuarios}  from '../controlador/autenticacion.js';

dotenv.config();

function soloAdmin (req, res, next){
    const logueado =  revisarCookie(req)
    if(logueado) return next();
    return res.redirect("/")
}

function soloPublico (req, res, next){
    const logueado =  revisarCookie(req)
    if(!logueado) return next();
    return res.redirect("/admin")
}

function revisarCookie(req){
    try {
        const cookieJwt = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4)
        const decodificado = jsonwebtoken.verify(cookieJwt, process.env.JWT_SECRET);
        const verificarUsuario = usuarios.find(usuario=> usuario.user === decodificado.user)
        if(!verificarUsuario){
            return false
        }else{
            return true
        }        
    } catch (error){
        console.log(error)
        return false
    }
}

export const metodos = {
    soloAdmin,
    soloPublico,
}