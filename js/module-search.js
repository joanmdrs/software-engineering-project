const generateFormSearch = () => {
  document.getElementById('principal').innerHTML = `
    <form id='client-search-form' class='form'>  
        <label>CPF:</label>     
        <div class="input">
            <input class='field' type='text' id='cpf-field' placeholder='XXX.XXX.XXX-XX' required>
        </div>

        <div class="buttons-actions">
            <button id='button-clear' class="button-clear" type="button" onClick='clearFields()'>Limpar</button>
            <button id='button-cancel' class="button-cancel" type="button" onClick='closeForm()'>Cancelar</button>
            <button id='button-search' class="button-search" type="button" onClick='searchClient()'>Buscar</button>
        </div>
    </form>
  `
}


const openFormSearch = () => {
  generateFormSearch()
}


const searchClient = () => {
  const cpf = document.getElementById('cpf-field').value;
  const dbClient = readClient()

  if(cpf == '' || cpf.length < 14){
    alert('Preencha o campo com seu CPF usando "." e "-"  Ex: 123.456.789-10')

  }else{
    let cont = 0
    dbClient.forEach(client => {
      if(cpf == client.cpf & client.status == true){
        returnClient(client)
        cont += 1
      }
    });
    if(cont == 0){
      alert('Não foi encontrado nenhum cliente com este cpf')
    }
  }
  
}

const returnClient = (client) => {
  const row = createRow(client)
  const tbody = document.createElement('tbody')
  tbody.append(row)
  createTable(tbody)
}


document.querySelector('#search-client').addEventListener('click', function(event){
    event.preventDefault()
    document.querySelector('#principal').dataset.action = 'edit'
    openFormSearch()
})

