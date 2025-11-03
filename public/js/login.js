document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault()
    try {
        const res = await axios.post('/user/login', {
            email: event.target.email.value,
            password: event.target.password.value
        })
        localStorage.setItem('token', res.data)
        window.location.href = 'http://localhost:1000/home'
    }
    catch (e) {
        if (e.status == 404) alert(e.response.data)
        if(e.status == 400) alert(e.response.data)
        console.log(e)
    }
})