// seção de Script para o Modal
let modal = document.querySelector('#modal-container')

document.querySelector('#add-product').addEventListener('click', function() {
    modal.classList.add('abrir')

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'close' || e.target.id == 'modal-container') {
            modal.classList.remove('abrir')
        }
    })
})

