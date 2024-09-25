// Evento para abrir e fechar o modal (popup)
let modal = document.querySelector('#modal-container');
let uploadImg = document.getElementById("upload-img");
let imgSuccess = false

document.querySelector('#add-product').addEventListener('click', function() {
    modal.classList.add('abrir')

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'close' || e.target.id == 'modal-container') {
            modal.classList.remove('abrir')
        }
    })

    alerts.innerHTML = ''; // Limpa o alerta

    let name = document.querySelector('#iproduct').value = '';
    let category = document.querySelector('#icategory').value = '';
    let price = document.querySelector('#iprice').value = ''
})

// Array criado para armazenar os produtos adicionados pelo usuário
let products = []

// Função para publicar o produto descrito pelo usuário
function publishProduct(product) {
    addProductList = document.querySelector('#products-list');
    addProductList.innerHTML += `
    <li class="products" data-id="${product.id}">
        <img class="preview" src="${product.imageUrl}" alt="Imagem do Produto" width="100"/>
        <p><span class="product-category"><span class="material-symbols-outlined category-icon">category</span>${product.category}</span> <span class="product-name">${product.name}</span> <span class="product-price">R$ ${product.price}</span></p>
        <span class="material-symbols-outlined remove-product" data-id='${product.id}'>delete</span>
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

// Evento de confirmação do upload da imagem
uploadImg.addEventListener('input', function() {
    let alerts = document.querySelector('#alerts');

    alerts.style.color = 'green';
    alerts.innerHTML = 'A imagem foi selecionada!';
});

// Evento para cadastro de novos produtos
document.querySelector('#btn-cadastrar').addEventListener('click', function() {
    let name = document.querySelector('#iproduct').value;
    let category = document.querySelector('#icategory').value;
    let price = parseFloat(document.querySelector('#iprice').value);
    let uploadImg = document.getElementById("upload-img");
    let alerts = document.querySelector('#alerts');


    alerts.innerHTML = ''; // Limpa o alerta

    if (!name || !category || isNaN(price)) {
        alerts.innerHTML = 'Por favor, preencha todos os campos do produto.'
        return;
    }

    if (uploadImg.files.length === 0) {
        alerts.innerHTML = 'Você precisa selecionar uma imagem do seu produto.';
        return;
    }

    readImage(uploadImg, function(imageUrl) {
        let img = new Image();
        img.src = imageUrl;

        img.onload = function() {
            // Condicional criada para verificar se a largura natural da imagem é maior que 450px
            if (img.naturalWidth > 5000) {
                alerts.innerHTML = 'A imagem enviada não pode ter mais de 5000px de largura.';
                return;
            }

            if (document.getElementById("preview").src = '') {
                alerts.innerHTML = 'Você precisa selecionar uma imagem do seu produto.'
            }

            let id = products.length ? products[products.length - 1].id + 1 : 1;
            let newProduct = { id, name, category, price, imageUrl };
            products.push(newProduct);

            publishProduct(newProduct);

            // Reseta os campos do formulário após o cadastro ser feito.
            name.value = '';
            price.values = '';
            category.value = '';
            document.getElementById("preview").src = '';
        };
    });
});

// Função para remover produtos
function removeProduct(id) {
    // Remove o produto do array de produtos
    products = products.filter(product => product.id !== id);

    let productElement = document.querySelector(`[data-id='${id}']`);
    if (productElement) {
        productElement.remove();
    }
}

// Evento para remover produtos
document.querySelector('#products-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-product')) {
        let productId = parseInt(event.target.getAttribute('data-id'));
        removeProduct(productId);
    }
});

// Evento para abrir barra lateral de filtro de categorias
document.querySelector('#filter').addEventListener('click', function() {
    const body = document.querySelector('body');
    const sidebar = document.querySelector('#classifier');
    const contentOutside = document.querySelector('#content-container');
    const closeFilter = document.querySelector('#close-filter')

    sidebar.classList.toggle('open');

    closeFilter.addEventListener('click', function() {
        sidebar.classList.remove('open');
    })
})

// Evento para filtrar produtos
document.querySelector('#iclassifier-category').addEventListener('change', function() {
    let selectedCategory = document.querySelector('#iclassifier-category').value
    
    productsList = document.querySelector('#products-list');
    productsList.innerHTML = '';

    if (selectedCategory === 'Todas') {
        products.forEach(product => {
            publishProduct(product)
        })
    } else {
        let filteredProducts = products.filter(product => product.category === selectedCategory);

        filteredProducts.forEach(product => {
            publishProduct(product);
        })
    }
});