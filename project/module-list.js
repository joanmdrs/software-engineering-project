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
            <th>Ações</th>
        </tr>
    `
    table.appendChild(thead)
    const tbody = createTbody()
    table.appendChild(tbody)
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
        <td>
            <button type="button" class="button-edit" id='${client.cpf}'>editar</button>
        </td>
    `

    return newRow
}

const listClients = () => {
    createTable()
   
}

document.querySelector('#list-clients')
    .addEventListener('click', listClients)