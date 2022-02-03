
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbclient) => localStorage.setItem('db_client',  JSON.stringify(dbclient))

const generateFormAdd = () => {
    const div = document.getElementById('principal')
    div.innerHTML = `
        <form id='client-add-form' class='form' data-action='new'>
                
            <div class="label">
                <label style="margin-right: 230px;">Nome completo:</label>
                <label>CPF:</label>
                <label>RG:</label>
            </div>
            
            <div class="input">
                <input class='field' type='text' id='name-field' placeholder='Informe seu nome' style="width: 430px;" required>
                <input class='field' type='text' id='cpf-field' placeholder='XXX.XXX.XXX-XX' maxlength='14' required>
                <input class='field' type='text' id='rg-field' placeholder='Informe seu RG' required>
            </div>
            <div class="label">
                <label>Data de nascimento:</label>
                <label>Idade:</label>
                <label>Estado Civil:</label>
                <label>Sexo:</label>
            </div>
            <div class="input">
                <input class='field' type="date" id='dt-field' placeholder='Data Nascimento' onChange='setAgeField()' required>
                <input class='field' id='age-field'>
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
                <label>Tipo da Conta:</label>
            </div>
            <div class="input">
                <select class='field' id='schooling-field' required>
                    <option disabled selected>-- Escolha uma opção</option>
                    <option value="Analfabeto (a)">Analfabeto (a)</option>
                    <option value="Ensino Fundamental">Ensino Fundamental</option>
                    <option value="Ensino Médio">Ensino Médio</option>
                    <option value="Ensino Superior">Ensino Superior</option>
                    <option value="Pós Graduação">Pós Graduação</option>
                    <option value="Mestrado">Mestrado</option>
                    <option value="Doutorado">Doutorado</option>
                    <option value="Pós Doutorado">Pós Doutorado</option>

                </select>
                <input class='field' type='text' id='phone-field' placeholder='(00) 00000-0000' required>
                <input class='field' type="email" id='email-field' placeholder='xxx@xxx.xx ' required>

                <select class='field' id='type-field' required>
                    <option disabled selected>-- Escolha uma opção</option>
                    <option value="Corrente">Conta Corrente</option>
                    <option value="Poupança">Conta Poupança</option>
                    <option value="Salário">Conta Salário</option>
                </select>

            </div>
            <div class="label">
                <label>Endereço:</label>
                <label>Bairro:</label>
                <label>Número:</label>
            </div>
            <div class="input">
                <input class='field' type="text" id="address-field" placeholder='Rua, Avenida...' required>
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
            <div class="buttons-actions" >
                <button id='button-clear' class="button-clear" type="button" onClick='clearFields()'>Limpar</button>
                <button id='button-cancel' class="button-cancel" type="button" onClick='closeForm()'>Cancelar</button>
                <button id='button-save' class="button-save" type="button" onClick='saveClient()'>Salvar</button>
            </div>
        </form>`
}

const isValidFields = () => {
    return document.querySelector('#client-add-form').reportValidity()
}

const validFields = () => {
    if(isValidFields()){
        const name = document.querySelector('#name-field').value;
        const testeNum = /[0-9]/g;
        const foundName = name.match(testeNum);
        if(foundName != null){
            if(foundName.length >= 1){
                return 2
            }
        }

        const cpf = document.querySelector('#cpf-field').value;
        console.log(cpf.length)
        const testeString = /[A-Za-z]/g;
        const foundCPF = cpf.match(testeString);
        if(foundCPF != null){
            if((foundCPF.length >= 1)){
                return 3
            }
        } 
        if(cpf.length < 14){
            return 3  
        }

        const rg = document.querySelector('#rg-field').value;
        const foundRG = rg.match(testeString);
        if(foundRG != null){
            if(foundRG.length >= 1){
                return 4
            }
        }
        if(rg.length < 7){
            return 4
        }

        const age = document.querySelector('#age-field').value;
        const ageInt = parseInt(age.substring(0,2))
        if(ageInt < 18){
            return 5
        }

        const phone = document.querySelector('#phone-field').value;
        const foundPhone = phone.match(testeString);
        if(foundPhone != null){
            if(foundPhone.length >= 1){
                return 6
            }
        }
        if(phone.length < 11){
            return 6
        }
        

        const cep = document.querySelector('#cep-field').value;
        const foundCEP = cep.match(testeString);
        if(foundCEP != null){
            if(foundCEP.length >= 1){
                return 7
            }
        }
        if(cep.length < 8){
            return 7
        }
        
        return 1
    } else{
        return 0
    }
}

const createClient = (client) => {
    const dbclient = getLocalStorage()
    dbclient.push(client)
    setLocalStorage(dbclient)
}

const saveClient = () => {

    if(validFields() == 1){
        const account = createAccount()
        const client = {
            name: document.querySelector('#name-field').value,
            cpf: document.querySelector('#cpf-field').value,
            rg: document.querySelector('#rg-field').value,
            birth_date: document.querySelector('#dt-field').value,
            age: document.querySelector('#age-field').value,
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
            income: document.querySelector('#income-field').value,
            account: account,
            status: true
        }

        const action = document.querySelector('#client-add-form').dataset.action

        if(action == 'new'){
            const cpf = document.getElementById('cpf-field').value;
            const dbClient = readClient()
            let cont = 0;
            dbClient.forEach(client => {
                if(cpf == client.cpf){
                  cont += 1;
                }
              });
              if(cont >= 1){
                alert('Já existe um cliente cadastrado com este CPF')
              }else if(cont == 0){
                createClient(client)
                alert('Cliente salvo com sucesso!')
                closeForm()
              }
                
        }else{
            updateClient(client, action)
            confirm('Cliente atualizado com sucesso!')
            closeForm()
        }
        
    } else if(validFields() == 2){
        alert('Informe um nome válido!')
    } else if(validFields() == 3){
        alert('Informe um CPF válido!')
    } else if(validFields() == 4){
        alert('Informe um RG válido!')
    } else if(validFields() == 5){
        alert('Cliente menor de idade, cadastro cancelado!')
    } else if(validFields() == 6){
        alert('Informe um telefone válido!')
    } else if(validFields() == 7){
        alert('Informe um CEP válido!')
    } else if(validFields() == 0){
        alert('Prencha todos os campos!')
    }
}



const setAgeField = () => {
    const dt = document.querySelector('#dt-field').value 
    const age = getAge(dt)
    document.querySelector('#age-field').value = age + ' anos'

}
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
    document.querySelector('#principal').innerHTML = ``
}

const clearFields = () => {
    const fields = document.querySelectorAll('.field')
    fields.forEach(field => field.value = "")
}

const openForm = () => {
    generateFormAdd()
}

document.querySelector('#add-client').addEventListener('click', openForm)