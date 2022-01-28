const createTable = () => {
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    thead.innerHTML = `
        <tr>
            <th>CPF</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Renda</th>
            <th>Conta</th>
            <th>Status</th>
            <th>Ações</th>
        </tr>
    `
    table.appendChild(thead)
    const tbody = createTbody()
    table.appendChild(tbody)
    document.getElementById('principal').innerHTML = ' ';
    document.getElementById('principal').appendChild(table)
}

const createTbody = () => {
    const tbody = document.createElement('tbody')
    const dbClient = readClient()
    dbClient.forEach(client => {
        let tr = createRow(client)
        tbody.appendChild(tr)
    });

    return tbody

}

const createRow = (client) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.cpf}</td>
        <td>${client.name}</td>
        <td>${client.age}</td>
        <td>${client.phone}</td>
        <td>${client.email}</td>
        <td>${client.income}</td>
        <td>${client.type_conta}</td>
        <td>${client.status}</td>
    `
    const td = document.createElement('td')
    const button = document.createElement('button')
    button.type = 'submit'
    button.innerText = 'Editar'
    button.classList.add("button-edit")
    button.addEventListener('click', function(event){
        event.preventDefault()
        generateFormEdit(client.cpf)
    })
    if(client.status == "Ativo"){
        td.append(button)
    } else{
        const non = document.createElement('a')
        non.innerHTML = "---"
        td.append(non)
    }
    newRow.append(td)
    return newRow
}

const listClients = () => {
    
    createTable()
}

document.querySelector('#list-clients')
    .addEventListener('click', listClients)