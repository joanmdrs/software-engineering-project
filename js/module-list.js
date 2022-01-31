const createButton = (classe, type, text) => {
    const button = document.createElement('button')
    button.type = type
    button.classList.add(classe)
    button.innerText = text
    return button
}

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
    document.getElementById('principal').innerHTML = '';
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
    const status = client.status == true ? 'ativo' : 'desativado'
    newRow.innerHTML = `
        <td>${client.cpf}</td>
        <td>${client.name}</td>
        <td>${client.age}</td>
        <td>${client.phone}</td>
        <td>${client.email}</td>
        <td>${client.income}</td>
        <td>${client.account.type}</td>
        <td>${status}</td>
    `
    const td = document.createElement('td')
    const edit = createButton('button-edit','submit', 'Editar')
    const view = createButton('button-view','submit', 'Ver')
   
    edit.addEventListener('click', function(event){
        event.preventDefault()
        generateFormEdit(client.cpf)
    })

    view.addEventListener('click', function(event){
        event.preventDefault()
        alert('Funcionando')
    })

    if(client.status == true){
        td.append(edit)
        td.append(view)
    } else{
        const non = document.createElement('a')
        non.innerHTML = "---"
        td.append(non)
    }
    newRow.append(td)
    return newRow
}

const viewClient = (client) => {
    const div = document.querySelector('#principal')
    div.innerHTML = `
        <div class='client-view'>
                <h4> Dados do cliente: </h4>
                <p> Nome:${client.name} Cpf:${client.cpf} RG: ${client.rg}</p>
                <p> Data de Nascimento:${client.birth_date} Idade: ${client.age} Estado Civil: ${client.marital_status} Sexo: ${client.sexo}</p>
                <p> Escolaridade: ${client.schooling} Telefone: ${client.phone} Email: ${client.email} </p>
                <p> Endereço: ${client.address} Bairro: ${client.district} Nº ${client.number} Cidade: ${client.city} UF: ${client.uf}</p>
                <p> Ocupação profissional: ${client.professional_occupation} Cargo: ${client.office} Renda mensal: ${client.income}</p>

                <h4> Dados da conta: </h4>
                <p> Número: ${client.account.number} Tipo: ${client.account.type} Saldo: ${client.account.saldo} status: ${client.status} </p>
                
        </div>
    `

}


const listClients = () => {
    createTable()
}

document.querySelector('#list-clients')
    .addEventListener('click', listClients)