const deactivateClient =  (cpf) => {
  const index = getClient(cpf)
  const dbClient = readClient()
  const client = dbClient[index]
  client.status = false
  updateClient(client, index)
  alert('Cliente desativado com sucesso!')
  document.getElementById('principal').innerHTML = '';
}

document.querySelector('#deactivate-client').addEventListener('click', function(event){
  event.preventDefault()
  document.querySelector('#principal').dataset.action = 'desative'
  openFormSearch()
})