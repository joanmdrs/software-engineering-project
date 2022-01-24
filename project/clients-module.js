const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbclient) => localStorage.setItem('db_client',  JSON.stringify(dbclient))

const isValidFields = () => {
    return document.querySelector('#client-add-form').reportValidity()
}

const createClient = (client) => {
    const dbclient = getLocalStorage()
    dbclient.push(client)
    setLocalStorage(dbclient)
}

const addClient = () => {

    if(isValidFields()){
        const client = {
            name: document.querySelector('#name-field').value,
            cpf: document.querySelector('#cpf-field').value,
            rg: document.querySelector('#rg-field').value,
            birth_date: document.querySelector('#dt-field').value,
            age: getAge(document.querySelector('#dt-field').value),
            marital_status: document.querySelector('#ms-field').value,
            sexo: document.querySelector('#sexo-field').value,
            schooling: document.querySelector('#schooling-field').value,
            phone: document.querySelector('#phone-field').value,
            email: document.querySelector('#email-field').value,
            address: document.querySelector('#address-field').value,
            district: document.querySelector('#district-field').value,
            number: document.querySelector('#number-field').value,
            cep: document.querySelector('#cep-field').value,
            city: document.querySelector('#city-field').value,
            uf: document.querySelector('#uf-field').value,
            professional_occupation: document.querySelector('#po-field').value,
            office: document.querySelector('#office-field').value,
            income: document.querySelector('#income-field').value
        }

        createClient(client)
        closeForm()
        
    }else {
        alert("Preencha os campos corretamente")
    }
}


// Função que calcula a idade 
const getAge = (data) => {
    const  year = parseInt(data.substring(0,4))
    const  month = parseInt(data.substring(5,7))

    const  current_date = new Date();
    const  current_month = current_date.getMonth() + 1
    const  current_year = current_date.getFullYear()

    let age = (current_year - year)

    if(current_month < month) {
        age -= 1
    }

    return age
} 


const readClient = () => getLocalStorage()


// Função que abre o formulário
const openForm = () => document.querySelector('.client-add-form')
    .classList.add('active')

// Função que fecha o formulário
const closeForm = () => {
    clearFields()
    document.querySelector('.client-add-form').classList.remove('active')
}

// Função que limpas os campos
const clearFields = () => {
    const fields = document.querySelectorAll('.field')
    fields.forEach(field => field.value = "")
}

document.querySelector('#button-clear')
    .addEventListener('click',clearFields)

document.querySelector('#add-client')
    .addEventListener('click', openForm)

document.querySelector('#button-cancel')
    .addEventListener('click', closeForm)

document.querySelector('#button-save')
.addEventListener('click', function(){
    addClient()
})

