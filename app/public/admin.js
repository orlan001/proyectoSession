const button = document.querySelector('button');
button.addEventListener('click',()=>{
    document.cookie = 'jwt=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.location.href = '/';
})