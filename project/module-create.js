const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbclient) => localStorage.setItem('db_client',  JSON.stringify(dbclient))

const isValidFields = () => {
    return document.querySelector('#client-add-form').reportValidity()
}

const generateFormAdd = () => {
    const div = document.getElementById('principal')
    div.innerHTML = `
        <form id='client-add-form' class='client-add-form'>
                
            <div class="label">
                <label style="margin-right: 230px;">Nome completo:</label>
                <label>CPF:</label>
                <label>RG:</label>
            </div>
            
            <div class="input">
                <input class='field' type='text' id='name-field' placeholder='Informe seu nome' style="width: 430px;" required>
                <input class='field' type='text' id='cpf-field' placeholder='Informe seu CPF' required>
                <input class='field' type='text' id='rg-field' placeholder='Informe seu RG' required>
            </div>
            <div class="label">
                <label>Data de nascimento:</label>
                <label>Idade:</label>
                <label>Estado Civil:</label>
                <label>Sexo:</label>
            </div>
            <div class="input">
                <input class='field' type="date" id='dt-field' placeholder='Data Nascimento' required>
                <input class='field' disabled>
                <select class='field' id='ms-field' required>
                    <option disabled selected>-- Escolha uma opção</option>
                    <option value="Solteiro (a)">Solteiro (a)</option>
                    <option value="Casado (a)">Casado (a)</option>
                    <option value="Separado (a)">Separado (a)</option>
                    <option value="Divorciado (a)">Divorciado (a)</option>
                    <option value="Viúvo (a)">Viúvo (a)</option>
                </select>
                <select class='field' id='sexo-field' required>
                    <option disabled selected>-- Escolha uma opção</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                </select>
            </div>
            <div class="label">
                <label>Escolaridade:</label>
                <label>Telefone:</label>
                <label>E-mail:</label>
            </div>
            <div class="input">
                <select class='field' id='schooling-field' required>
                    <option disabled selected>-- Escolha uma opção</option>
                    <option value="Analfabeto (a)">Doutorado</option>
                    <option value="Ensino Fundamental">Ensino Fundamental</option>
                    <option value="Ensino Médio">Ensino Médio</option>
                    <option value="Ensino Superior">Ensino Superior</option>
                    <option value="Pós Graduação">Pós Graduação</option>
                    <option value="Mestrado">Mestrado</option>
                    <option value="Doutorado">Doutorado</option>
                    <option value="Pós Doutorado">Doutorado</option>

                </select>
                <input class='field' type='text' id='phone-field' required>
                <input class='field' type="email" id='email-field' required>
            </div>
            <div class="label">
                <label>Endereço:</label>
                <label>Bairro:</label>
                <label>Número:</label>
            </div>
            <div class="input">
                <input class='field' type="text" id="address-field" required>
                <input class='field' type="text" id='district-field' required>
                <input class='field' type="number" id='number-field' required>
            </div>
            <div class="label">
                <label>CEP:</label>
                <label>Cidade:</label>
                <label>UF:</label>
            </div>
            <div class="input">
                <input class='field' type="text" id='cep-field' required>
                <input class='field' type="text" id='city-field' required>
                <select class="field" id="uf-field" required>
                    <option disabled selected>-- Escolha uma opção</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                </select>
            </div>
            <div class="label">
                <label>Ocupação profissional:</label>
                <label>Cargo:</label>
                <label>Salário:</label>
            </div>
            <div class="input">
                <input class='field' type="text" id='po-field' required>
                <input class='field' type="text" id='office-field' required>
                <input class='field' type='number' id='income-field' step="0.01" required>
            </div>
            <div class="button-save-cancel-clear">
                <button id='button-clear' class="button-clear" type="button" onClick='clearFields()'>Limpar</button>
                <button id='button-cancel' class="button-cancel" type="button" onClick='closeForm()'>Cancelar</button>
                <button id='button-save' class="button-save" type="button" onClick='addClient()'>Salvar</button>
            </div>
        </form>`

}

const createClient = (client) => {
    const dbclient = getLocalStorage()
    dbclient.push(client)
    setLocalStorage(dbclient)
}

const addClient = () => {

    if(isValidFields()){
        const client = {
            name: document.querySelector('#name-field').value,
            cpf: document.querySelector('#cpf-field').value,
            rg: document.querySelector('#rg-field').value,
            birth_date: document.querySelector('#dt-field').value,
            age: getAge(document.querySelector('#dt-field').value),
            marital_status: document.querySelector('#ms-field').value,
            sexo: document.querySelector('#sexo-field').value,
            schooling: document.querySelector('#schooling-field').value,
            phone: document.querySelector('#phone-field').value,
            email: document.querySelector('#email-field').value,
            address: document.querySelector('#address-field').value,
            district: document.querySelector('#district-field').value,
            number: document.querySelector('#number-field').value,
            cep: document.querySelector('#cep-field').value,
            city: document.querySelector('#city-field').value,
            uf: document.querySelector('#uf-field').value,
            professional_occupation: document.querySelector('#po-field').value,
            office: document.querySelector('#office-field').value,
            income: document.querySelector('#income-field').value
        }

        createClient(client)
        closeForm()
        
    }else {
        alert("Preencha os campos corretamente")
    }
}


// Função que calcula a idade 
const getAge = (data) => {
    const  year = parseInt(data.substring(0,4))
    const  month = parseInt(data.substring(5,7))

    const  current_date = new Date();
    const  current_month = current_date.getMonth() + 1
    const  current_year = current_date.getFullYear()

    let age = (current_year - year)

    if(current_month < month) {
        age -= 1
    }

    return age
} 


const readClient = () => getLocalStorage()


const closeForm = () => {
    clearFields()
    const footer = document.querySelector('.footer')
    footer.classList.toggle('toogle')
    document.querySelector('#principal').innerHTML = ``
}

const clearFields = () => {
    const fields = document.querySelectorAll('.field')
    fields.forEach(field => field.value = "")
}

const openForm = () => {
    generateFormAdd()
    const footer = document.querySelector('.footer')
    footer.classList.toggle('toogle')
}

document.querySelector('#add-client')
    .addEventListener('click', openForm)

