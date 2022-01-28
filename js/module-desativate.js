const generateFormDesativate = () => {
  document.getElementById('principal').innerHTML = `
    <form id='client-add-form' class='client-add-form'>
        <label>CPF:</label>       
        <div class="input">
            <input class='field' type='text' id='cpf-field' placeholder='XXX.XXX.XXX-XX' required>
        </div>

        <div class="button-save-cancel-clear">
            <button id='button-clear' class="button-clear" type="button" onClick='clearFields()'>Limpar</button>
            <button id='button-cancel' class="button-cancel" type="button" onClick='closeForm()'>Cancelar</button>
            <button id='button-search' class="button-search" type="button" onClick='searchClientsDesativate()'>Buscar</button>
        </div>
    </form>
  `
}

const desativateClient = (cpf) => {
  const index = getClient(cpf)
  const dbClient = readClient()
  const client = dbClient[index]
  client.status = "Desativado"
  updateClient(client, index)
  confirm('Cliente desativado com sucesso!')
  document.getElementById('principal').innerHTML = '';
}


const createTableDesativate = () => {
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
  const tbody = createTbodyDesativate()
  table.appendChild(tbody)
  document.getElementById('principal').innerHTML = ' ';
  document.getElementById('principal').appendChild(table)
}

const createTbodyDesativate = () => {
  const tbody = document.createElement('tbody')
  const cpf = document.getElementById('cpf-field').value;
  const dbClient = readClient()
  dbClient.forEach(client => {
      if(cpf == client.cpf){
        let tr = createRowDesativate(client)
        tbody.appendChild(tr)
      }
  });
  return tbody
}

const createRowDesativate = (client) => {
  const cpf = document.getElementById('cpf-field').value;
  if(cpf == client.cpf){
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
    button.innerText = 'Desativar'
    button.classList.add("button-edit")
    button.addEventListener('click', function(event){
        event.preventDefault()
        desativateClient(client.cpf)
    })
    td.append(button)
    newRow.append(td)
    return newRow
  }
}

const searchClientsDesativate = () => {
  const cpf = document.getElementById('cpf-field').value;
  const dbClient = readClient()
  let cont = 0;
  if(cpf == '' || cpf.length < 14){
    alert('Preencha o campo com seu CPF usando "." e "-"  Ex: 123.456.789-10')
  }else{
    dbClient.forEach(client => {
      if(cpf == client.cpf){
        cont += 1;
      }
    });
    if(cont >= 1){
      createTableDesativate()
    }else if(cont == 0){
      messageError()
    }
  }
}

const openFormDesativate = () => {
  generateFormDesativate()
}

document.querySelector('#desativate-client')
  .addEventListener('click', openFormDesativate)

