const inputCEP = document.querySelector('#cep')
const inputCidade = document.querySelector('#cidade')
const inputBairro = document.querySelector('#bairro')
const form = document.querySelector('form')
const loading = document.querySelector('.loading')

inputCEP.addEventListener("keypress", (e) => {
    const onlyNumbers = /[0-9]/;
    const key = String.fromCharCode(e.keyCode);
    if (!onlyNumbers.test(key)) {
        e.preventDefault();
        return;
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    doSubmit();
})

function mostrarLoading() {
    loading.innerHTML = '<div class="spinner-grow" role="status"></div>'
    loading.style.display = 'flex'
}

function esconderLoading() {
    loading.innerHTML = ''
    loading.style.display = 'none'
}

function getEndereço(cep) {
    return fetch(`https://viacep.com.br/ws/${cep}/json/`)
}

async function doSubmit() {
    mostrarLoading()
    try {
        let cep = inputCEP.value
        const response = await getEndereço(cep)
        const data = await response.json()
        if (data.erro) {
            alert('A busca foi mal sucedida, insira um cep correto')
        } else {
            inputCidade.value = data.logradouro
            inputBairro.value = data.bairro
        }
    } catch (error) {
        alert('algo deu errado')
        console.log('Erro encontrado: ', error)
    }
    esconderLoading()
}