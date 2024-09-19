// Evento para abrir e fechar o modal (popup)
let modal = document.querySelector('#modal-container')

document.querySelector('#add-product').addEventListener('click', function() {
    modal.classList.add('abrir')

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'close' || e.target.id == 'modal-container') {
            modal.classList.remove('abrir')
        }
    })
})

// Evento
let products = [
    { id: 1, nome: 'Camiseta Azul', categoria: 'Camisetas', preco: 80 }, 
    { id: 1, nome: 'Air Jordan 1 High OG', categoria: 'Calçados', preco: 750 },
]

document.querySelector('#btn-cadastrar').addEventListener('click', function() {
    let name = document.querySelector('#iproduct').value
    let category = document.querySelector('#icategory').value
    let price = document.querySelector('#iprice').value

    let id = products.length ? products[products.length - 1].id + 1 : 1;
    let newProduct = { id, name, category, price };
    products.push(newProduct);
    console.log(products)
})

