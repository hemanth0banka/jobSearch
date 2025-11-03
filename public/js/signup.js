document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault()
    if(event.target.password.value != event.target.confirmpassword.value)
    {
        alert('Please sure the both passwords are same !')
        return 0
    }
    try {
        const res = await axios.post('/user/register', {
            username: event.target.username.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            password: event.target.password.value
        })
        console.log(res)
        alert( res.data)
        window.location.href = 'http://localhost:1000/'
    }
    catch (e) {
        if (e.status == 400) alert(e.response.data)
        console.log(e)
    }
})