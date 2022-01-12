'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const tempClient = {
    nome: 'Joan',
    email: 'joanmedeiros@gmail.com',
    celular: '084999658426',
    cidade: 'São Roque'

}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbclient) => localStorage.setItem('db_client',  JSON.stringify(dbclient))

const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}
const updateClient = (index, client) =>{
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}
const readClient = () => getLocalStorage()

const createClient = (client) => {
    const dbclient = getLocalStorage()
    dbclient.push(client)
    setLocalStorage(dbclient)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = () =>{
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

const saveClient = () => {
    if(isValidFields()){
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('form').dataset.index

        if(index == 'new'){
            createClient(client)
            updateTable()
            closeModal()
        }else{
            updateClient(index, client)
            updateTable()
            closeModal()
        }

    }
}

const createRow = (client, index) =>{
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td> ${client.nome} </td>
        <td> ${client.email} </td>
        <td> ${client.celular} </td>
        <td> ${client.cidade} </td>
        <td>
            <button type="button" class="button green" id="edit-${index}">editar</button>
            <button type="button" class="button red" id="delete-${index}">excluir</button>
        <td>
    `
    document.querySelector('#tbody').appendChild(newRow)
}

const clearTable = () => {
    document.querySelector('#tbody').innerHTML = ''
}

const updateTable = () =>{

    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('form').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
}

const editDelete = (event) => {

    if(event.target.type == 'button'){
        const [action, index] = event.target.id.split('-')
        if (action == 'edit'){
            editClient(index)
            console.log(action)

        }else{
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`)
            if(response){
                deleteClient(index)
                updateTable()
            }
            

        }
    }
}

updateTable()

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)


document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)
    
document.querySelector('#tbody')
    .addEventListener('click', editDelete)