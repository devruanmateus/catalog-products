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

// Array criado para armazenar os produtos adicionados pelo usuário
let products = [
    { id: 1, name: 'Camiseta Azul', category: 'Camisetas', price: 80, imageUrl: '' }, 
    { id: 2, name: 'Air Jordan 1 High OG', category: 'Calçados', price: 750, imageUrl: '' },
]

// Função para publicar o produto descrito pelo usuário
function publishProduct(product) {
    addProductList = document.querySelector('#products-list');
    addProductList.innerHTML += `
    <li class="products">
        <img class="preview" src="${product.imageUrl}" alt="Imagem do Produto" width="100"/>
        <p><span class="product-category"><span class="material-symbols-outlined category-icon">category</span>${product.category}</span> <span class="product-name">${product.name}</span> <span class="product-price">R$ ${product.price}</span></p>
    </li>
`;
}

// Função que cria o preview da imagem do produto escolhido pelo usuário
function readImage(inputElement, callback) {
    if (inputElement.files && inputElement.files[0]) {
        let file = new FileReader();
        file.onload = function(e) {
            document.getElementById("preview").src = e.target.result;
            if (callback) callback(e.target.result); // Passa a URL da imagem de volta via callback
        };
        file.readAsDataURL(inputElement.files[0]);
    }
}

// Evento para cadastro de novos produtos
document.querySelector('#btn-cadastrar').addEventListener('click', function() {
    let name = document.querySelector('#iproduct').value;
    let category = document.querySelector('#icategory').value;
    let price = parseFloat(document.querySelector('#iprice').value);
    let alerts = document.querySelector('#alerts');

    if (!name || !category || isNaN(price)) {
        alerts.innerHTML = 'Por favor, preencha todos os campos do produto.'
        return;
    }

    let uploadImg = document.getElementById("upload-img");

    readImage(uploadImg, function(imageUrl) {
        let img = new Image();
        img.src = imageUrl;

        img.onload = function() {
            // Condicional criada para verificar se a largura natural da imagem é maior que 450px
            if (img.naturalWidth > 450) {
                alerts.innerHTML = 'A imagem enviada pode ter no máximo 450px de largura.';
                return;
            }

            let id = products.length ? products[products.length - 1].id + 1 : 1;
            let newProduct = { id, name, category, price, imageUrl };
            products.push(newProduct);

            publishProduct(newProduct);
        };
    });
});

// Função para remover produtos
function productRemove(id) {
    products = products.filter(produto => produto.id !== id);

}

