import dotenv from 'dotenv';
dotenv.config();

const error = document.querySelectorAll('.error')[0];
document.getElementById("login-form").addEventListener('submit', async (e)=>{
    e.preventDefault();
    const user = e.target.children.user.value;
    const password = e.target.children.password.value;
    const url = "https://proyectosession-2.onrender.com/:"+process.env.PORT
    const res = await fetch(url+"/api/login",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            user, password
        })
    });
  
    if(!res.ok) return error.classList.toggle('escondido', false);
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
})