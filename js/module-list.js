const createButton = (classe, type, icon) => {
    const button = document.createElement('button')
    button.type = type
    button.classList.add(classe)
    button.innerHTML = icon
    return button
}

const createButtonType = (client, action) => {

    if(action == 'view'){
        const view = createButton('button-view', 'submit', `<i class="fa fa-eye" style="font-size:18px;"></i>`)
        view.addEventListener('click', function(event){
            event.preventDefault()
            viewClient(client)
        })
        return view 

    }else if(action == 'edit'){
    
        const edit = createButton('button-edit', 'submit', `<i class="fa fa-edit" style="font-size:18px;"></i>`)
        edit.addEventListener('click', function(event){
            event.preventDefault()
            generateFormEdit(client.cpf)
        })
        return edit 

    }else{
        const desative = createButton('button-desative', 'submit', `<i class="fa fa-close" style="font-size:18px;"></i>`)
        desative.addEventListener('click', function(event){
            event.preventDefault()
            deactivateClient(client.cpf)
        })
        return desative 
        
    }
}


const createTable = (tbody) => {
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
    table.appendChild(tbody)
    document.getElementById('principal').innerHTML = '';
    document.getElementById('principal').appendChild(table)
}

const createTbody = (dbClient) => {
    const tbody = document.createElement('tbody')
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
    const data_action = document.querySelector('#principal').dataset.action
    const type = data_action == 'edit' ? createButtonType(client, 'edit') : createButtonType(client, 'desative')
    const view = createButtonType(client, 'view')

    if(client.status == true){
        td.append(type)
        td.append(view)
    }else{
        const non = document.createElement('a')
        non.innerHTML = "---"
        td.append(non)
    }
    newRow.append(td)
    return newRow
}


const listClients = () => {
    const dbClient = readClient()
    const tbody = createTbody(dbClient)
    createTable(tbody)
}

document.querySelector('#list-clients').addEventListener('click', function(event){
    event.preventDefault()
    document.querySelector('#principal').dataset.action = 'edit'
    listClients()
})