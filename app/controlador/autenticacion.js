import bcryptjs from 'bcryptjs';
import jsonwebtoken  from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const usuarios = [{
    user:"user1",
    email:"user@gmail.com",
    password:"$2a$05$CzMzBZjbCU3sNOcfS73Jy.OZ69u0NpaD02i3LSqW4AMkabGAMzila"
}]

async function login(req, res){
    //console.log(req.body)
    const user = req.body.user;
    const password = req.body.password;
    if(!user || !password){
        return  res.status(400).send({status:"error", message: "datos ingresados incompletos.."});
    }
    
    const usuarioVerificar = usuarios.find(usuario => usuario.user === user)
    console.log(usuarioVerificar)

    if(!usuarioVerificar){
        return res.status(400).send({status:"error", message:"Error durante el Login"})
    }
    const loginCorrecto = await bcryptjs.compare(password, usuarioVerificar.password)
    if(!loginCorrecto){
        return res.status(400).send({status:"error", message:"login incorrecto"})
    }
    const token = jsonwebtoken.sign(
        {user:usuarioVerificar.user},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRE}
    )
    const cookieOpcion = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE * 24 * 60 * 60 * 1000),
        path:'/'
    }
    res.cookie("jwt",token, cookieOpcion);
    res.send({status:"ok", message:"usuario logueado", redirect:"/admin"})
}

async function registro(req, res){
    //console.log(req.body)
    const user = req.body.user;
    const password = req.body.password;
    const email = req.body.email;
    if(!user || !password || !email){
        return res.status(400).send({status:"error", message:"los datos ingresados estan vacios"})
    }
    const verificarUsuario = usuarios.find(usuario=> usuario.user === user)
    if(verificarUsuario){
        return res.status(400).send({status:"error", message:"el usuario ya existe"})
    }
    const salt = await bcryptjs.genSalt(5);
    const hashPasword = await bcryptjs.hash(password,salt);
    const nuevoUsuario = {
        user, email, password:hashPasword
    }   
    usuarios.push(nuevoUsuario);
    //console.log(usuarios);
    return res.status(201).send({status:"ok", message:"el usuario ha sido registrado", redirect:"/"})
}
//exportar funciones
export const metodos={
    login,
    registro
}

