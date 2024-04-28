// { "id": 1, "title": "Ніжна свіжість", "description": "троянди та лілії", "price": 445, "img": "https://" }

const storedData = localStorage.getItem('cartPay');
let cartPay = storedData ? JSON.parse(storedData) : [];
const storedDataLast = localStorage.getItem('cartOrderLast');
let cartOrderLast = storedDataLast ? JSON.parse(storedDataLast) : [];
console.log(storedData);
console.log(cartPay);
console.log(cartOrderLast);


// якщо дані з сервера зчитано
document.addEventListener('DataLoaded', function() {
    startInit();
    onClickPayButton ('flowerGallery');
    onClickBasket();
    delItemBasket();
});

// *****  function  **********
function startInit () {
    if (cartPay.length) {
        const basketCounter =  document.getElementById('basket-counter'); 
        toggleOpen('#basket-counter');
        basketCounter.textContent = cartPay.length;
        const totalBasket =  document.querySelector('#total'); 
        const h1Basket =  document.querySelector('#cart-modal .modal-content h1'); 
        h1Basket.textContent = 'Шикарний вибір!',
        totalBasket.textContent =  "До оплати: " + cartPay.reduce((sum, obj) => sum + obj.price, 0) + ' грн.';
        const payButton =  document.querySelector('#cart-modal .modal-content .button-fill'); 
        payButton.classList.toggle('open');
        updateCartUI(cartPay);
        console.log('startInit');
    } else {
        lastOrderView();
    }
}

function onClickBasket() { 
    const basket = document.getElementById('basket'); 
    basket.addEventListener('click', toggleModal);
    if (cartPay==[]) {
        lastOrderView();
    }
}


function onClickPayButton (containerId){
        const container = document.getElementById(containerId); 
 
        if (!container.isEventAttached) {
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
            container.isEventAttached = true;
        }
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

function toggleModal() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('open');
}

function toggleOpen(selector) {
    elem = document.querySelector(selector);
    elem.classList.toggle('open');
}

function addToCart(productId, productsArr) {
    const product = productsArr.find(p => p.id === productId);
    const basketSticker =  document.querySelector('#cart-modal .modal-content .button-fill'); 
    const basketCounter =  document.getElementById('basket-counter'); 

    cartPay.push(product);
    cartPay.length === 1  && basketSticker.classList.toggle('open');
    updateCartUI(cartPay);
    basketCounter.textContent = cartPay.length;
    cartPay.length === 1 && toggleOpen('#basket-counter');
}


function removeFromCart(productId) {
    const payButton =  document.querySelector('#cart-modal .modal-content .button-fill'); 
    const basketCounter =  document.getElementById('basket-counter'); 

    cartPay = cartPay.filter(p => p.id !== productId);
    cartPay.length === 0 && payButton.classList.toggle('open');
    updateCartUI(cartPay);
    cartPay.length === 0 && toggleOpen('#basket-counter');
    basketCounter.textContent = cartPay.length;
}

function updateCartUI(cartArr) {
    const cartContainer = document.getElementById('cart-container');
    const totalBasket =  document.querySelector('#total'); 
    const h1Basket =  document.querySelector('#cart-modal .modal-content h1'); 

    cartContainer.innerHTML = '';
    cartArr.forEach( (item) => {
        createCatalogItem(item, cartContainer)
    });

    if (cartArr.length === 0) { 
        h1Basket.innerHTML = 'Кошик порожній.<br><br> Потрібна консультація?<br> Зателефонуйте 0950100101';
        totalBasket.textContent = '';
        lastOrderView();
    } else {
        h1Basket.textContent = 'Шикарний вибір!',
        totalBasket.textContent =  "До оплати: " + cartArr.reduce((sum, obj) => sum + obj.price, 0) + ' грн.';
    }
    // додати логіку запису в локалсторейж
    localStorage.setItem('cartPay', JSON.stringify(cartPay));
}

function resetAfterOrdering () {
    if (cartPay) {
        cartPay = [];
        const basketCounter =  document.getElementById('basket-counter'); 
        toggleOpen('#basket-counter');
        const totalBasket =  document.querySelector('#total');
        const h1Basket =  document.querySelector('#cart-modal .modal-content h1'); 
        h1Basket.innerHTML = 'Кошик порожній.<br><br> Потрібна консультація?<br> Зателефонуйте 0950100101';
        totalBasket.textContent = '';
        const payButton =  document.querySelector('#cart-modal .modal-content .button-fill'); 
        payButton.classList.toggle('open');
        updateCartUI(cartPay);
        addBlockToContainer(dataFlowersGlobal, 'flowerGallery', indexFlowers, COUNTFLOWERS);
        toggleModal();
    }
}

function lastOrder() {
    localStorage.setItem('cartOrderLast', JSON.stringify(cartPay));
    cartOrderLast = storedDataLast ? JSON.parse(storedDataLast) : [];
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
function lastOrderView (){
    const updatedStoredDataLast = localStorage.getItem('cartOrderLast');
    const h1modalContent = document.querySelector('#cart-modal .modal-content .section-title');
    const cartContainer = document.getElementById('cart-container');
 
    cartOrderLast = updatedStoredDataLast ? JSON.parse(updatedStoredDataLast) : [];
    h1modalContent.innerHTML = h1modalContent.innerHTML + '<br><br>  Нещодавно Ви замовляли:';
    cartOrderLast.forEach( (item) => {
        createCatalogItem(item, cartContainer)
    });
}