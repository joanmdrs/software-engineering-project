const decideServices = (type) => {
    
    if(type == 'Poupança'){
        const services = [
            'limite de 4 saques mensais',
            'limite de depósito diário de até R$ 5.000,00',
            'cheque_especial negativado'
         ]
        return services

    }else if(type == 'Corrente'){
        const income = 5000.500
        const cheque_especial = calcChequeEspecial(income)

        const services = [
           'limite de 4 saques mensais',
           'limite de depósito diário de até R$ 5.000,00',
           'cheque_especial de: R$'+ cheque_especial
        ]
        return services
    }else {
        const services = [
            'limite de 2 saques mensais',
            'não é possível efetuar depósitos, apenas o empregador', 
            'cheque especial negativado'
        ]
        return services
    }
}

const generateNumberAccount = () => Math.round(Math.random() * 1000000)

const calcChequeEspecial = (income) => (income*0.3).toFixed(2)

const createAccount = () => {
    const type_account = document.querySelector('#type-field').value
    const services = decideServices(type_account)
    const account = {
        number: generateNumberAccount(),
        type: document.querySelector('#type-field').value,
        saldo: 0.00,
        status: true,
        services: services
    }
    return account
}
