const generateFormEdit = (cpf) => {
    openForm()
    const index = getClient(cpf)
    const dbClient = readClient()
    const client = dbClient[index]
    document.querySelector('#name-field').value = client.name
    document.querySelector('#cpf-field').value = client.cpf
    document.querySelector('#cpf-field').setAttribute('disabled', 'disabled')
    document.querySelector('#rg-field').value = client.rg
    document.querySelector('#rg-field').setAttribute('disabled', 'disabled')
    document.querySelector('#dt-field').value = client.birth_date
    document.querySelector('#age-field').value = client.age
    document.querySelector('#ms-field').value = client.marital_status
    document.querySelector('#sexo-field').value = client.sexo
    document.querySelector('#type-field').value = client.type_conta
    document.querySelector('#schooling-field').value = client.schooling
    document.querySelector('#phone-field').value = client.phone
    document.querySelector('#email-field').value = client.email
    document.querySelector('#type-field').value = client.account.type
    document.querySelector('#type-field').setAttribute('disabled', 'disabled')
    document.querySelector('#address-field').value = client.address
    document.querySelector('#district-field').value = client.district
    document.querySelector('#number-field').value = client.number
    document.querySelector('#cep-field').value = client.cep
    document.querySelector('#city-field').value = client.city
    document.querySelector('#uf-field').value = client.uf
    document.querySelector('#po-field').value = client.professional_occupation
    document.querySelector('#office-field').value = client.office
    document.querySelector('#income-field').value = client.income
    document.querySelector('#client-add-form').dataset.action = index
}

const getClient = (cpf) => {
    const dbClient = readClient()

    for (const index in dbClient) {
        if(dbClient[index].cpf == cpf){
            return parseInt(index)
        }
    }
    return ''
}

const updateClient = (client, index) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}