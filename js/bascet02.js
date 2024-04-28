// {
// "id": 1,
// "title": "Ніжна свіжість",
// "description": "троянди та лілії",
// "price": 445,
// "img": "https://courses.prometheus.org.ua/asset-v1:Prima+FRONTEND101+2023_T3+type@asset+block@flower1.png"
// }

const storedData = localStorage.getItem('cartPay');
let cartPay = storedData ? JSON.parse(storedData) : [];
console.log(storedData);
console.log(cartPay);
// let cartPay = [];


// якщо дані з сервера зчитано
document.addEventListener('DataLoaded', function() {
    startInit();
    onClickPayButton ();
    onClickBasket();
    // addOnClick('basket', toggleModal);
    delItemBasket();
});

// *****  function  **********
function lastOrderPreview (){

}

function startInit () {
    if (cartPay.length) {
        const basketCounter =  document.getElementById('basket-counter'); 
        toggleOpen('#basket-counter');
        basketCounter.textContent = cartPay.length;
        const totalBasket =  document.querySelector('#total'); 
        const h1Basket =  document.querySelector('.modal-content h1'); 
        h1Basket.textContent = 'Шикарний вибір!',
        totalBasket.textContent =  "До оплати: " + cartPay.reduce((sum, obj) => sum + obj.price, 0) + ' грн.';
        const payButton =  document.querySelector('.modal-content .button-fill'); 
        payButton.classList.toggle('open');
        updateCartUI();
        console.log('startInit');
    } 
}

function toggleModal() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('open');
}

function toggleOpen(selector) {
    elem = document.querySelector(selector);
    elem.classList.toggle('open');
}

function onClickBasket() { 
    const basket = document.getElementById('basket'); 
    basket.addEventListener('click', toggleModal);
}


function onClickPayButton (){
        const container = document.getElementById('flowerGallery'); 
        container.addEventListener('click', function(event) {
            event.stopPropagation();
            if (event.target.className.includes('button-border')) {
                const productId = Number(event.target.dataset.productId);
                if (event.target.textContent==='В кошик') {
                    addToCart(productId, dataFlowersGlobal);
                    event.target.textContent = 'Обрано';
                } else {
                    removeFromCart(productId);
                    event.target.textContent = 'В кошик';
                }
                event.target.classList.toggle('in-basket');            
            }
        });
}

function delItemBasket () {
        const container = document.getElementById('cart-container'); 
        container.addEventListener('click', function(event) {
            event.stopPropagation();
            if (event.target.className.includes('close')) {
                let productId = Number(event.target.dataset.productId);
                removeFromCart(productId);
                addBlockToContainer(dataFlowersGlobal, 'flowerGallery', indexFlowers, COUNTFLOWERS);
            }
        });
}

function addToCart(productId, productsArr) {
    const product = productsArr.find(p => p.id === productId);
    cartPay.push(product);
    const payButton =  document.querySelector('.modal-content .button-fill'); 
    cartPay.length === 1   && payButton.classList.toggle('open');
    updateCartUI();
    const basketCounter =  document.getElementById('basket-counter'); 
    basketCounter.textContent = cartPay.length;
    cartPay.length === 1 && toggleOpen('#basket-counter');
}


function removeFromCart(productId) {
    cartPay = cartPay.filter(p => p.id !== productId);
    const payButton =  document.querySelector('.modal-content .button-fill'); 
    cartPay.length === 0 && payButton.classList.toggle('open');
    updateCartUI();
    const basketCounter =  document.getElementById('basket-counter'); 
    cartPay.length === 0 && toggleOpen('#basket-counter');
    basketCounter.textContent = cartPay.length;
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';
    cartPay.forEach( (item) => {
        createCatalogItem(item, cartContainer)
    });
    const totalBasket =  document.querySelector('#total'); 
    const h1Basket =  document.querySelector('.modal-content h1'); 

    if (cartPay.length === 0) { 
        h1Basket.innerHTML = 'Кошик порожній.<br><br> Потрібна консультація?<br> Зателефонуйте 0950100101';
        totalBasket.textContent = '';
    } else {
        h1Basket.textContent = 'Шикарний вибір!',
        totalBasket.textContent =  "До оплати: " + cartPay.reduce((sum, obj) => sum + obj.price, 0) + ' грн.';
    }

    // додати логіку запису в локалсторейж
    localStorage.setItem('cartPay', JSON.stringify(cartPay));

}
// reset after ordering
function resetAfterOrdering () {
    if (cartPay) {
        cartPay = [];
        const basketCounter =  document.getElementById('basket-counter'); 
        toggleOpen('#basket-counter');
        const totalBasket =  document.querySelector('#total');
        const h1Basket =  document.querySelector('.modal-content h1'); 
        h1Basket.innerHTML = 'Кошик порожній.<br><br> Потрібна консультація?<br> Зателефонуйте 0950100101';
        totalBasket.textContent = '';
        const payButton =  document.querySelector('.modal-content .button-fill'); 
        payButton.classList.toggle('open');
        updateCartUI();
        addBlockToContainer(dataFlowersGlobal, 'flowerGallery', indexFlowers, COUNTFLOWERS);
        toggleModal();
    }
}

function lastOrder() {
    localStorage.setItem('cartPayLast', JSON.stringify(cartPay));
}

function sendOrder() {
    lastOrder();
    document.getElementById('pay-button').addEventListener('click', function(event) {
        // event.preventDefault(); 
        let payData = JSON.stringify(cartPay);
        fetch('https://jsonplaceholder.typicode.com/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: payData
        })
        .then(response => response.json())
        .then(data => console.log('pay Success:', data))
        .catch(error => console.error('pay Error:', error));

    });
    resetAfterOrdering();
    alert("Дякуємо за замовлення!"); //замінити на власне модальне, відцентроване
    

}