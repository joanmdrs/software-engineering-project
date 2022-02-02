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
            viewData(client)
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

const createLabel = (value) => {
    const label = document.createElement('label')
    label.innerHTML = value
    return label
}

const createInput = (value) => {
    const input = document.createElement('input')
    input.classList.add('field')
    input.value = value
    return input
}
const createDiv = (classe) => {
    const div = document.createElement('div')
    div.classList.add(classe)
    return div
}

const addElementLabel = (labels) => {
    const div = createDiv('label')
    labels.forEach(element => {
        let label = createLabel(element)
        if(element == 'Nome:'){
            label.style.marginRight = '230px'
        }
        
        div.append(label)
    });
    return div
}

const addElementInput = (inputs) => {
    const div = createDiv('input')
    inputs.forEach(element => {
        div.append(element)
    });
    return div
}

const addServices = (services) => {
    const div = createDiv('input')
    let ul = document.createElement('ul')
    services.forEach(element => {
        let li =document.createElement('li')
        li.innerHTML = element
        ul.append(li)

    });
    div.append(ul)
    return div
}

const viewData = (client) => {
    const form = document.createElement('form')
    form.classList.add('form')
    form.classList.add('view')

    let labels1 = ['Nome:', 'CPF:', 'RG:']
    let labels2 = ['Data de nascimento:', 'Idade:','Estado Civil', 'Sexo:']
    let labels3 = ['Escolaridade:', 'Telefone:', 'E-mail:']
    let labels4 = ['Endereço:', 'Bairro:', 'Número:']
    let labels5 = ['CEP:', 'Cidade:', 'UF:']
    let labels6 = ['Ocupação Profissional:', 'Cargo:', 'Salário:']
    let labels7 = ['Nº conta:', 'Tipo:', 'Saldo:']
    let labelServices = ['Serviços:'] 

    const div1 = addElementLabel(labels1)
    const div2 = addElementLabel(labels2)
    const div3 = addElementLabel(labels3)
    const div4 = addElementLabel(labels4)
    const div5 = addElementLabel(labels5)
    const div6 = addElementLabel(labels6)
    const div7 = addElementLabel(labels7)
    const divLabelServices = addElementLabel(labelServices)

    const name = createInput(client.name)
    name.style.width = '430px'
    const cpf = createInput(client.cpf)
    const rg = createInput(client.rg)
    const birth_date = createInput(client.birth_date)
    const age = createInput(client.age) 
    const marital_status = createInput(client.marital_status)
    const sexo = createInput(client.sexo)
    const schooling = createInput(client.schooling)
    const phone = createInput(client.phone)
    const email = createInput(client.email)
    const address = createInput(client.address)
    const district = createInput(client.district)
    const number = createInput(client.number)
    const cep = createInput(client.cep)
    const city = createInput(client.city)
    const uf = createInput(client.uf)
    const professional_occupation = createInput(client.professional_occupation)
    const office = createInput(client.office)
    const income = createInput(client.income)
    const number_account = createInput(client.account.number)
    const type_account = createInput(client.account.type)
    const saldo = createInput(client.account.saldo)

    const inputs1 = [name, cpf, rg]
    const inputs2 = [birth_date, age, marital_status, sexo]
    const inputs3 = [schooling, phone, email]
    const inputs4 = [address, district, number]
    const inputs5 = [cep, city, uf]
    const inputs6 = [professional_occupation, office, income]
    const inputs7 = [number_account, type_account, saldo]
    
    const div8 =  addElementInput(inputs1)
    const div9 =  addElementInput(inputs2)
    const div10 = addElementInput(inputs3)
    const div11 = addElementInput(inputs4)
    const div12 = addElementInput(inputs5)
    const div13 = addElementInput(inputs6)
    const div14 = addElementInput(inputs7)
    const divInputServices = addServices(client.account.services)

    const clientData = document.createElement('h3')
    clientData.innerText = 'Dados do cliente:'
    const divClientData = createDiv('label')
    divClientData.append(clientData)

    const accountData = document.createElement('h3')
    accountData.innerText = 'Dados da conta:'
    const divAccountData = createDiv('label')
    divAccountData.append(accountData)

    const buttonClose = document.createElement('button')
    buttonClose.innerText = 'Fechar'
    buttonClose.addEventListener('click', function(event){
        event.preventDefault()
        closeForm()
    })
    const divButton = document.createElement('div')
    divButton.classList.add('buttons-actions')
    divButton.append(buttonClose)

    form.append(divClientData)
    form.append(div1)
    form.append(div8)
    form.append(div2)
    form.append(div9)
    form.append(div3)
    form.append(div10)
    form.append(div4)
    form.append(div11)
    form.append(div5)
    form.append(div12)
    form.append(div6)
    form.append(div13)

    form.append(divAccountData)
    form.append(div7)
    form.append(div14)
    form.append(divLabelServices)
    form.append(divInputServices)
    form.append(divButton)
    
    document.querySelector('#principal').innerHTML = ''
    document.querySelector('#principal').append(form)

}

document.querySelector('#list-clients').addEventListener('click', function(event){
    event.preventDefault()
    document.querySelector('#principal').dataset.action = 'edit'
    listClients()
})