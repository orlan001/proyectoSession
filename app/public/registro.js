const error = document.querySelectorAll('.error')[0];
document.getElementById('registro-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    //const res = await fetch("http://localhost:4000/api/registro",{
    const res = await fetch(`/api/registro`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            user:e.target.children.user.value,
            email:e.target.children.email.value,
            password:e.target.children.password.value
        })
    });
    if(!res.ok) return error.classList.toggle('escondido',false);
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
})