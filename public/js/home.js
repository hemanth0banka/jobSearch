let userId
let username
let email
window.addEventListener('load', async () => {
    try {
        const res = await axios.get('/api/user', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        userId = res.data.userId
        username = res.data.username
        email = res.data.email
        document.querySelector('#accountname').innerHTML = username
        home()
    }
    catch (e) {
        console.log(e)
        if (e.status == 401) {
            window.location.href = 'http://localhost:1000/'
        }
    }

})
async function home() {
    try {
        const res = await axios.get('/api/user/status', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        document.querySelector('#dashboard').innerHTML = ''
        const div0 = document.createElement('div')
        div0.id = 'homie'
        const div = document.createElement('div')
        const div1 = document.createElement('div')
        div1.id = 'ele2'
        const h1 = document.createElement('h1')
        h1.innerHTML = `Welcome ${username}`
        div1.appendChild(h1)
        div0.appendChild(div)
        div0.appendChild(div1)
        div.id = 'elements'
        const label1 = document.createElement('label')
        label1.innerHTML = `My job Applications : `
        const li1 = document.createElement('li')
        li1.innerHTML = res.data.appliedJobs
        const label2 = document.createElement('label')
        label2.innerHTML = `Carrer : `
        const li2 = document.createElement('li')
        li2.innerHTML = res.data.carrer ? 'updated' : 'not updated'
        const label3 = document.createElement('label')
        label3.innerHTML = `Documents : `
        const li3 = document.createElement('li')
        li3.innerHTML = res.data.document ? 'uploaded' : 'not uploaded'
        const label4 = document.createElement('label')
        label4.innerHTML = `My job posts : `
        const li4 = document.createElement('li')
        li4.innerHTML = res.data.posted
        const label5 = document.createElement('label')
        label5.innerHTML = `Active Reminders : `
        const li5 = document.createElement('li')
        li5.innerHTML = res.data.reminder
        div.appendChild(label1)
        div.appendChild(li1)
        div.appendChild(label2)
        div.appendChild(li2)
        div.appendChild(label3)
        div.appendChild(li3)
        div.appendChild(label4)
        div.appendChild(li4)
        div.appendChild(label5)
        div.appendChild(li5)
        document.querySelector('#dashboard').appendChild(div0)
    }
    catch (e) {
        console.log(e)
    }
}
document.querySelector('#home').addEventListener('click', home)

document.querySelector('#profile').addEventListener('click', async (event) => {
    event.preventDefault()
    try {
        const r = await axios.get('/api/user/profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        document.querySelector('#dashboard').innerHTML = ''
        const ul = document.createElement('ul')
        ul.style = 'display : flex; flex-direction : column;gap:10px;'
        const namelabel = document.createElement('label')
        namelabel.innerHTML = 'username'
        const nameinput = document.createElement('li')
        nameinput.innerHTML = r.data.username
        const emaillabel = document.createElement('label')
        emaillabel.innerHTML = 'email'
        const emailinput = document.createElement('li')
        emailinput.innerHTML = r.data.email
        const phonelabel = document.createElement('label')
        phonelabel.innerHTML = 'phone'
        const phoneinput = document.createElement('li')
        phoneinput.innerHTML = r.data.phone
        const res = await axios.get('/api/user/carrer', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        const formli = document.createElement('li')
        const lab = document.createElement('label')
        lab.innerHTML = 'carrer'

        const form = document.createElement('form')
        ul.id = 'carrerupdate'
        const currentRole = document.createElement('input')
        currentRole.placeholder = 'currentRole'
        currentRole.defaultValue = res.data != '' ? res.data.currentRole : ''
        const desireRole = document.createElement('input')
        desireRole.placeholder = 'desireRole'
        desireRole.defaultValue = res.data != '' ? res.data.desireRole : ''
        const skills = document.createElement('input')
        skills.placeholder = 'Enter Skills seperating with comma'
        skills.defaultValue = res.data != '' ? res.data.skills : ''
        const experienceYears = document.createElement('input')
        experienceYears.placeholder = 'experience'
        experienceYears.defaultValue = res.data != '' ? res.data.experienceYears : ''
        const education = document.createElement('input')
        education.placeholder = 'Higher education'
        education.defaultValue = res.data != '' ? res.data.education : ''
        const schoolGrade = document.createElement('input')
        schoolGrade.placeholder = 'Grade in School'
        schoolGrade.defaultValue = res.data != '' ? res.data.schoolGrade : ''
        const InterGrade = document.createElement('input')
        InterGrade.placeholder = 'Grade in Inter'
        InterGrade.defaultValue = res.data != '' ? res.data.InterGrade : ''
        const bachelorGrade = document.createElement('input')
        bachelorGrade.placeholder = 'Grade in Bachelour Graduation'
        bachelorGrade.defaultValue = res.data != '' ? res.data.bachelorGrade : ''
        const postGrade = document.createElement('input')
        postGrade.placeholder = 'Grade in Post Graduation'
        postGrade.defaultValue = res.data != '' ? res.data.postGrade : ''
        const edit = document.createElement('button')
        edit.id = 'edit'
        edit.innerHTML = 'Edit'
        edit.addEventListener('click', async (event) => {
            event.preventDefault()
            try {
                const update = document.createElement('button')
                update.innerHTML = 'update'
                update.type = 'submit'
                update.addEventListener('click', async (event) => {
                    event.preventDefault()
                    try {
                        const response = await axios.put('/api/user/carrerUpdate', {
                            currentRole: currentRole.value,
                            desireRole: desireRole.value,
                            skills: skills.value,
                            experienceYears: experienceYears.value,
                            education: education.value,
                            schoolGrade: schoolGrade.value,
                            InterGrade: InterGrade.value,
                            bachelorGrade: bachelorGrade.value,
                            postGrade: postGrade.value
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                        alert('profile Updated')
                        form.appendChild(edit)
                        form.removeChild(update)
                        form.removeChild(cancel)
                    }
                    catch (e) {
                        console.log(e)
                    }
                })
                const cancel = document.createElement('button')
                cancel.innerHTML = 'cancel'
                cancel.id = 'cancel'
                cancel.addEventListener('click', () => {
                    form.appendChild(edit)
                    form.removeChild(update)
                    form.removeChild(cancel)
                })
                form.removeChild(edit)
                form.appendChild(update)
                form.appendChild(cancel)
            }
            catch (e) {
                console.log(e)
            }
        })
        formli.appendChild(form)
        form.appendChild(currentRole)
        form.appendChild(desireRole)
        form.appendChild(skills)
        form.appendChild(experienceYears)
        form.appendChild(education)
        form.appendChild(schoolGrade)
        form.appendChild(InterGrade)
        form.appendChild(bachelorGrade)
        form.appendChild(postGrade)
        form.appendChild(edit)
        ul.appendChild(namelabel)
        ul.appendChild(nameinput)
        ul.appendChild(emaillabel)
        ul.appendChild(emailinput)
        ul.appendChild(phonelabel)
        ul.appendChild(phoneinput)
        ul.appendChild(lab)
        ul.appendChild(formli)
        console.log(res)
        document.querySelector('#dashboard').appendChild(ul)
    }
    catch (e) {
        console.log(e)
    }
})
function pno(obj, callback) {
    const { previous, current, next, last } = obj
    const first = document.createElement('button')
    first.innerHTML = '1'
    first.addEventListener('click', () => {
        callback(1)
    })
    const prev = document.createElement('button')
    prev.innerHTML = '<<'
    prev.addEventListener('click', () => {
        callback(previous)
    })
    const cur = document.createElement('button')
    cur.style = 'background-color: rgba(255, 255, 255, 1);border : 1px solid lightgray;border-radius : 10px;padding : 10px;  box-shadow: 0px 0px 3px lightgray;'
    cur.innerHTML = current
    cur.addEventListener('click', () => {
        callback(current)
    })
    const nex = document.createElement('button')
    nex.innerHTML = '>>'
    nex.addEventListener('click', () => {
        callback(next)
    })
    const las = document.createElement('button')
    las.innerHTML = last
    las.addEventListener('click', () => {
        callback(last)
    })
    document.querySelector('#pages').appendChild(first)
    document.querySelector('#pages').appendChild(prev)
    document.querySelector('#pages').appendChild(cur)
    document.querySelector('#pages').appendChild(nex)
    document.querySelector('#pages').appendChild(las)
    if (current === 1) {
        first.style.display = 'none'
        prev.style.display = 'none'
    }
    if (current >= last) {
        nex.style.display = 'none'
        las.style.display = 'none'
    }
}
async function companies(page) {
    try {

        const data = await axios.post(`/api/companies/?page=${page}`, {
            companyName: document.querySelector('#companynameinput').value,
            role: document.querySelector('#roleinput').value,
            location: document.querySelector('#locationinput').value,
            salary: document.querySelector('#salaryinput').value
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(data)
        document.querySelector('ul').innerHTML = ''
        document.querySelector('#pages').innerHTML = ''
        pno(data.data, companies)
        const button = document.createElement('button')
        button.id = 'postjob'
        button.type = 'submit'
        button.innerHTML = 'post job'
        button.addEventListener('click', async (event) => {
            event.preventDefault()
            const form = document.createElement('form')
            form.id = 'createjob'
            const namelabel = document.createElement('label')
            namelabel.innerHTML = 'companyName :'
            const nameinput = document.createElement('input')
            nameinput.name = 'companyname'
            nameinput.type = 'text'
            const rolelabel = document.createElement('label')
            rolelabel.innerHTML = 'Role :'
            const roleinput = document.createElement('input')
            roleinput.name = 'role'
            roleinput.type = 'text'
            const jobTypelabel = document.createElement('label')
            jobTypelabel.innerHTML = 'Job type :'
            const jobinput = document.createElement('input')
            jobinput.name = 'jobtype'
            jobinput.type = 'text'
            const locationlabel = document.createElement('label')
            locationlabel.innerHTML = 'Location :'
            const locationinput = document.createElement('input')
            locationinput.name = 'location'
            locationinput.type = 'text'
            const salarylabel = document.createElement('label')
            salarylabel.innerHTML = 'Salary :'
            const salaryinput = document.createElement('input')
            salaryinput.name = 'salary'
            salaryinput.type = 'number'
            const descriptionlabel = document.createElement('label')
            descriptionlabel.innerHTML = 'description :'
            const descriptioninput = document.createElement('textarea')
            descriptioninput.name = 'description'
            descriptioninput.cols = 5
            descriptioninput.rows = 5
            const submit = document.createElement('button')
            submit.type = 'submit'
            submit.innerHTML = 'submit'
            const cancel = document.createElement('button')
            cancel.id = 'cancel'
            cancel.innerHTML = 'cancel'
            cancel.addEventListener('click', (event) => {
                event.preventDefault()
                document.querySelector('#dashboard').removeChild(form)
            })
            form.appendChild(namelabel)
            form.appendChild(nameinput)
            form.appendChild(rolelabel)
            form.appendChild(roleinput)
            form.appendChild(jobTypelabel)
            form.appendChild(jobinput)
            form.appendChild(locationlabel)
            form.appendChild(locationinput)
            form.appendChild(salarylabel)
            form.appendChild(salaryinput)
            form.appendChild(descriptionlabel)
            form.appendChild(descriptioninput)
            form.appendChild(submit)
            form.appendChild(cancel)
            form.addEventListener('submit', async (event) => {
                event.preventDefault()
                try {
                    const r = await axios.post('/api/companies/new', {
                        companyName: event.target.companyname.value,
                        role: event.target.role.value,
                        jobType: event.target.jobtype.value,
                        location: event.target.location.value,
                        salary: event.target.salary.value,
                        description: event.target.description.value
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    if (r.status === 200) alert('JOB POSTED')
                    document.querySelector('#dashboard').innerHTML = ''
                }
                catch (e) {
                    console.log(e)
                }
            })
            document.querySelector('#dashboard').innerHTML = ''
            document.querySelector('#dashboard').appendChild(form)
        })
        document.querySelector('#pages').appendChild(button)
        for (let x of data.data.records.rows) {
            const li = document.createElement('li')
            const entries = Object.entries(x)
            let companyId
            let postBy
            let applied = false
            for (let [k, v] of entries) {
                if ((k === 'id')) {
                    companyId = v
                    continue
                }
                if (k === 'userUserId') {
                    postBy = v
                    continue
                }
                if ((k === 'createdAt') || (k === 'updatedAt')) {
                    continue
                }
                if (k === 'applies') {
                    for (let z of v) {
                        if (z.userUserId == userId) {
                            applied = true
                        }
                    }
                    v = v.length
                }
                const p = document.createElement('p')
                p.innerHTML = `${k} : ${v}`
                li.appendChild(p)

            }
            const p = document.createElement('p')
            p.innerHTML = 'you already applied to this job'
            if (applied == true) {
                li.appendChild(p);
            }
            else if (postBy === userId) {
                const applyBtn = document.createElement('button');
                applyBtn.textContent = 'Delete';
                applyBtn.id = 'cancel'
                applyBtn.addEventListener('click', async (event) => {
                    event.preventDefault()
                    try {
                        const r = await axios.delete(`/api/companies/${companyId}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                        if (r.status === 200) alert('post Deleted')
                        document.querySelector('ul').removeChild(li)
                    }
                    catch (e) {
                        console.log(e)
                    }
                })
                li.appendChild(applyBtn);
            }
            else {
                const applyBtn = document.createElement('button');
                applyBtn.textContent = 'Apply';
                applyBtn.type = 'submit'
                applyBtn.addEventListener('click', async (event) => {
                    event.preventDefault()
                    try {
                        const r = await axios.put('/api/companies/apply', {
                            companyId
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                        if (r.status === 200) alert('job applied')
                        li.removeChild(applyBtn)
                        li.appendChild(p)
                    }
                    catch (e) {
                        if (e.status === 404) alert('upload resume before applying to jobs')
                        console.log(e)
                    }
                })
                li.appendChild(applyBtn);
            }
            document.querySelector('ul').appendChild(li)
        }
    }
    catch (e) {
        console.log(e)
    }
}
document.querySelector('#companies').addEventListener('click', async (event) => {
    event.preventDefault()
    const form = document.createElement('form')
    form.id = 'filter'
    const name = document.createElement('input')
    name.name = 'companyname'
    name.id = 'companynameinput'
    name.placeholder = 'Company name'
    const role = document.createElement('input')
    role.name = 'role'
    role.id = 'roleinput'
    role.placeholder = 'job role'
    const location = document.createElement('input')
    location.name = 'location'
    location.placeholder = 'location'
    location.id = 'locationinput'
    const salary = document.createElement('input')
    salary.name = 'salary'
    salary.placeholder = 'salary'
    salary.id = 'salaryinput'
    const filter = document.createElement('button')
    filter.innerHTML = 'filter'
    filter.type = 'submit'
    filter.addEventListener('click', async (event) => {
        event.preventDefault()
        companies(1)
    })
    form.appendChild(name)
    form.appendChild(role)
    form.appendChild(location)
    form.appendChild(salary)
    form.appendChild(filter)
    const ul = document.createElement('ul')
    ul.id = 'companies'
    const div = document.createElement('div')
    div.id = 'pages'
    document.querySelector('#dashboard').innerHTML = ''
    document.querySelector('#dashboard').appendChild(ul)
    document.querySelector('#dashboard').appendChild(form)
    document.querySelector('#dashboard').appendChild(div)
    companies(1)
})
async function jobs(page) {
    try {
        const r = await axios.get(`/api/applied/?page=${page}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        const ul = document.createElement('ul')
        ul.id = 'companies'
        const div = document.createElement('div')
        div.id = 'pages'
        document.querySelector('#dashboard').innerHTML = ''
        document.querySelector('#dashboard').appendChild(ul)
        document.querySelector('#dashboard').appendChild(div)
        pno(r.data, jobs)
        for (let x of r.data.records.rows) {
            const li = document.createElement('li')
            const entries = Object.entries(x)
            let id
            let note = document.createElement('div')
            const pa = document.createElement('p')
            note.appendChild(pa)
            for (let [k, v] of entries) {
                if (k === 'id') {
                    id = v
                    continue
                }
                if (k === 'notes') {
                    pa.innerHTML = `${k} : ${v}`
                    li.appendChild(note)
                    continue
                }
                const p = document.createElement('p')
                p.innerHTML = `${k} : ${v}`
                li.appendChild(p)
            }
            const div = document.createElement('div')
            div.style = 'display:flex;align-items:center;justify-content:center;gap:40px;'
            const del = document.createElement('button')
            const reminder = document.createElement('button')
            reminder.innerHTML = '+ reminder'
            reminder.id = 'new'
            reminder.addEventListener('click', async () => {
                const form = document.createElement('form')
                form.id = 'reminder'
                form.style = 'background-color:white;border:1px solid lightgray;box-shadow:0px 0px 15px lightgray;position:fixed;padding : 20px;border-radius : 10px;'
                const datelabel = document.createElement('label')
                datelabel.innerHTML = 'Date : '
                const date = document.createElement('input')
                date.type = 'date'
                const notelabel = document.createElement('label')
                notelabel.innerHTML = 'Note : '
                const note = document.createElement('textarea')
                const set = document.createElement('button')
                set.type = 'submit'
                set.innerHTML = 'set Reminder'
                const cancel = document.createElement('button')
                cancel.id = 'cancel'
                cancel.innerHTML = 'cancel'
                cancel.addEventListener('click', () => {
                    document.querySelector('#dashboard').removeChild(form)
                })
                form.addEventListener('submit', async (event) => {
                    event.preventDefault()
                    try {
                        const datee = date.value
                        const notee = note.value
                        const r = await axios.post('/api/reminder/create', {
                            date: datee, note: notee, jobId: id
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                        document.querySelector('#dashboard').removeChild(form)
                        alert('reminder added')
                    }
                    catch (e) {
                        console.log(e)
                    }
                })
                form.appendChild(datelabel)
                form.appendChild(date)
                form.appendChild(notelabel)
                form.appendChild(note)
                form.appendChild(set)
                form.appendChild(cancel)
                document.querySelector('#dashboard').appendChild(form)
            })
            const edit = document.createElement('button')
            edit.innerHTML = '+ note '
            edit.id = 'edit'
            edit.addEventListener('click', async () => {
                const textarea = document.createElement('textarea')
                note.innerHTML = `notes : `
                note.appendChild(textarea)
                edit.style.display = 'none'
                const add = document.createElement('button')
                add.innerHTML = 'update'
                add.type = 'submit'
                const can = document.createElement('button')
                can.innerHTML = 'cancel'
                can.id = 'edit'
                div.removeChild(del)
                div.appendChild(add)
                div.appendChild(can)
                div.appendChild(del)
                can.addEventListener('click', async () => {
                    note.innerHTML = ''
                    note.appendChild(pa)
                    edit.style.display = 'inline'
                    div.removeChild(add)
                    div.removeChild(can)
                })
                add.addEventListener('click', async () => {
                    try {
                        const data = textarea.value
                        const r = await axios.put(`/api/applied`, {
                            id, data
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                        note.innerHTML = ''
                        const p = document.createElement('p')
                        p.innerHTML = `notes : ${data}`
                        note.appendChild(p)
                        edit.style.display = 'inline'
                        div.removeChild(add)
                        div.removeChild(can)
                    }
                    catch (e) {
                        console.log(e)
                    }
                })
            })
            del.innerHTML = '- remove Application'
            del.id = 'cancel'
            del.addEventListener('click', async () => {
                try {
                    const r = await axios.delete(`/api/applied/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    ul.removeChild(li)
                }
                catch (e) {
                    console.log(e)
                }
            })
            div.appendChild(reminder)
            div.appendChild(edit)
            div.appendChild(del)
            li.appendChild(div)
            ul.appendChild(li)
        }
    }
    catch (e) {
        console.log(e)
    }
}
document.querySelector('#myjobs').addEventListener('click', async (event) => {
    event.preventDefault()
    jobs(1)
})

document.querySelector('#upload').addEventListener('click', async () => {
    try {
        document.querySelector('#dashboard').innerHTML = ''
        const res = await axios.get('/api/uploads', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(res)
        const resdiv = document.createElement('div')
        resdiv.className = 'files'
        const reslabel = document.createElement('label')
        reslabel.innerHTML = 'Resume'
        resdiv.appendChild(reslabel)
        const resume = document.createElement('input')
        resume.type = 'file'
        resdiv.appendChild(resume)
        const covdiv = document.createElement('div')
        covdiv.className = 'files'
        const covlabel = document.createElement('label')
        covlabel.innerHTML = 'Cover Letter'
        covdiv.appendChild(covlabel)
        const coverLetter = document.createElement('input')
        coverLetter.type = 'file'
        covdiv.appendChild(coverLetter)
        const otherdiv = document.createElement('div')
        otherdiv.className = 'files'
        const otherlabel = document.createElement('label')
        otherlabel.innerHTML = 'Other Documents'
        otherdiv.appendChild(otherlabel)
        const others = document.createElement('input')
        others.type = 'file'
        otherdiv.appendChild(others)
        document.querySelector('#dashboard').appendChild(resdiv)
        document.querySelector('#dashboard').appendChild(covdiv)
        document.querySelector('#dashboard').appendChild(otherdiv)
        async function upload(filedata, filetype, filename) {
            try {
                const res = await axios.post('/api/uploads', { filedata, filetype, filename }, {
                    headers: {
                        Authorization: `bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                alert('document uploaded')
                return res.data
            }
            catch (e) {
                console.log(e)
                throw e
            }
        }
        const download = (url, element) => {
            const download = document.createElement('button')
            const a = document.createElement('a')
            a.href = url
            a.innerHTML = 'Download'
            download.appendChild(a)
            element.appendChild(download)
            download.addEventListener('click', () => { })
        }
        let resumethere = false
        let coverLetterthere = false
        let othersthere = false
        if (res.data != '') {
            resumethere = res.data.resume === null ? false : true
            coverLetterthere = res.data.coverLetter === null ? false : true
            othersthere = res.data.others === null ? false : true
        }
        const resbutton = document.createElement('button')
        resbutton.innerHTML = resumethere === false ? 'upload' : 'update'
        resumethere === true ? download(res.data.resume, resdiv) : 0
        resbutton.addEventListener('click', async (event) => {
            const filedata = resume.files[0]
            const filename = resume.value
            const filetype = 'resume'
            const r = await upload(filedata, filetype, filename)
            resbutton.innerHTML = 'update'
            if (resumethere === false) {
                download(r, resdiv)
            }
        })
        resdiv.appendChild(resbutton)
        const covbutton = document.createElement('button')
        covbutton.innerHTML = coverLetterthere === false ? 'upload' : 'update'
        coverLetterthere === true ? download(res.data.coverLetter, covdiv) : 0
        covbutton.addEventListener('click', async (event) => {
            const filedata = coverLetter.files[0]
            const filename = coverLetter.value
            const filetype = 'coverLetter'
            const r = await upload(filedata, filetype, filename)
            covbutton.innerHTML = 'update'
            if (coverLetterthere === false) {
                download(r, covdiv)
            }
        })
        covdiv.appendChild(covbutton)
        const otherbutton = document.createElement('button')
        otherbutton.innerHTML = othersthere === false ? 'upload' : 'update'
        othersthere === true ? download(res.data.others, otherdiv) : 0
        otherbutton.addEventListener('click', async (event) => {
            const filedata = others.files[0]
            const filename = others.value
            const filetype = 'others'
            const r = await upload(filedata, filetype, filename)
            otherbutton.innerHTML = 'update'
            if (othersthere === false) {
                download(r, otherdiv)
            }
        })
        otherdiv.appendChild(otherbutton)
    }
    catch (e) {
        console.log(e)
    }
})

document.querySelector('#reminder').addEventListener('click', async () => {
    try {
        document.querySelector('#dashboard').innerHTML = ''
        const res = await axios.get('/api/reminder', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        const ul = document.createElement('ul')
        for (let x of res.data) {
            const li = document.createElement('li')
            const entries = Object.entries(x)
            let id
            for (let [k, v] of entries) {
                if (k === 'id') {
                    id = v
                    continue
                }
                const p = document.createElement('p')
                p.innerHTML = `${k} : ${v}`
                li.appendChild(p)
            }
            const button = document.createElement('button')
            button.id = 'cancel'
            button.innerHTML = 'delete'
            button.addEventListener('click', async () => {
                try {
                    await axios.delete(`/api/reminder/remove?id=${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    alert('reminder deleted')
                    ul.removeChild(li)
                }
                catch (e) {
                    console.log(e)
                }
            })
            li.appendChild(button)
            ul.appendChild(li)
        }
        document.querySelector('#dashboard').appendChild(ul)
    }
    catch (e) {
        console.log(e)
    }
})

document.querySelector('#setting').addEventListener('click', () => {
    document.querySelector('#dashboard').innerHTML = ''
    const div = document.createElement('div')
    div.id = 'options'
    const forgot = document.createElement('button')
    forgot.innerHTML = 'Forgotten Password'
    forgot.addEventListener('click', async () => {
        try {
            await axios.post('/user/forgot', { email })
            alert('your password reset link was send to your email')
            localStorage.removeItem('token')
            window.location.href = 'http://localhost:1000/'
        }
        catch (e) {
            console.log(e)
        }
    })
    forgot.type = 'submit'
    const del = document.createElement('button')
    del.innerHTML = 'Delete Account'
    del.addEventListener('click', () => { })
    del.id = 'cancel'
    del.addEventListener('click', async () => {
        try {
            await axios.delete('/api/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            alert('Account Deleted')
            localStorage.removeItem('token')
            window.location.href = 'http://localhost:1000/'
        }
        catch (e) {
            console.log(e)
        }
    })
    const logout = document.createElement('button')
    logout.innerHTML = 'LogOut'
    logout.addEventListener('click', () => {
        localStorage.removeItem('token')
        window.location.href = 'http://localhost:1000/'
    })
    logout.id = 'edit'
    div.appendChild(forgot)
    div.appendChild(del)
    div.appendChild(logout)
    document.querySelector('#dashboard').appendChild(div)
})