// https://run.mocky.io/v3/ced24126-e530-48f5-bb23-68efa4a532d1

const COUNTFLOWERS = 6; //кількість букетів на слайдері
const COUNTCOMENT = 3;
const ARROWNEXT = "images/ArrowNext.png";
const ARROWNEXTFALSE = "images/ArrowNextFalse.png";
const ARROWPREV = "images/ArrowPrev.png";
const ARROWPREVFALSE = "images/ArrowPrevFalse.png";
let indexFlowers = 0;
let indexComents = 0;
let dataFlowersGlobal = [];
let dataComentsGlobal = [];
let liFlowersGlobal = [];
let liComentsGlobal = [];

readCatalogData();
readComentsData();
addOnclickForSlidersArrow();
addBurgerOnClick();
		
// *****  function  *************//
function addBurgerOnClick() {
	const burger = document.getElementById('burger'); 
	burger.addEventListener('click', toggleMobileMenu);
}

function toggleMobileMenu() {
	const nav = document.getElementById('nav');
	const burger = document.getElementById('burger');
	nav.classList.toggle('open');
	burger.classList.toggle('open');
}
// *****  arrows  ************* 
function createArrowToSlider(dataArr, classElement, countElementInGroup) {
	if (dataArr.length > countElementInGroup) {
			const nav = document.getElementById(`${classElement}-nav`);
			nav.style.display = `flex`;
			ulNav = document.getElementById(`${classElement}-ul`);
			for (let i = 1; i <= Math.min(Math.ceil(dataArr.length / countElementInGroup), 5); i++) {
					let liNav = document.createElement('li');
					ulNav.appendChild(liNav);
			}
	}
}

// *****  change next-prev arrows  *************
function changeArrow(dataArr, containerId, index, countElementInGroup) {
 		const container = document.getElementById(containerId);
		const nextBtn = container.querySelector('.nextBtn');
		const prevBtn = container.querySelector('.prevBtn');
		(index + countElementInGroup >= dataArr.length) ? nextBtn.src = ARROWNEXTFALSE : nextBtn.src = ARROWNEXT;
 		(index - countElementInGroup < 0) ?	prevBtn.src = ARROWPREVFALSE :	prevBtn.src = ARROWPREV;
	}

function addBlockToContainer(data, containerId, index, countElementInGroup) {
		const container = document.getElementById(containerId);
		if (index <= data.length && index >= 0) {container.innerHTML = '';}
		const len = index + countElementInGroup < data.length ? 		// if the last block of flowers is not complete
					index + countElementInGroup : 
					data.length;
		for (let i = index; i < len; i++) {
				if (containerId === 'flowerGallery') {
						createCatalogItem(data[i], container);
				} else createComentsItem(data, container, i);
		}
	 	containerId === 'flowerGallery' ? 
	 			changeArrow(data, 'catalog-nav', indexFlowers, COUNTFLOWERS) :
	 			changeArrow(data, 'coments-nav', indexComents, COUNTCOMENT);
}

// *****  create  slider items  *************
function createCatalogItem(item, container) {
	const flowerDiv = newFlowers(item);
	container.appendChild(flowerDiv);
}

function newFlowers(item) {
	const flower = document.createElement('section');
	flower.className = 'catalog-item';
    const img = document.createElement('img');
    img.src = item.img;
    img.alt = item.title;
    const title = document.createElement('p');
    title.innerHTML = `${item.title}:  <br>  ${item.description}`;
    title.className = 'section-content';  
    const price = document.createElement('p');
    price.textContent = `${item.price} грн`;
    price.className = 'section-content';  
		const inBasket = document.createElement('button');
		inBasket.dataset.productId = item.id; 
		const elemInBasket = cartPay.some( (obj) => obj.id === item.id);
		if (elemInBasket) {
				(inBasket.className = 'button-border in-basket', inBasket.textContent = 'Обрано');
				let delItem = document.createElement('span');
				delItem.className = 'close';
				delItem.innerHTML = '&times;';
				delItem.dataset.productId = item.id; 
				flower.appendChild(delItem);
		} else {
				(inBasket.className = 'button-border', inBasket.textContent = 'В кошик');
		}
	flower.appendChild(img);
    flower.appendChild(title);
    flower.appendChild(price);
    flower.appendChild(inBasket);
	return flower
}


function createComentsItem(data, elem, i) {
		const comentsItem = document.createElement('section');
		comentsItem.className = 'coments-item';
		const img = document.createElement('img');
		data[i].img ? img.src = data[i].img : img.src = 'images/nopicture.png';
		data[i].title ? img.alt = data[i].title : img.alt = 'no foto';
		const comentsDiv = document.createElement('section');
		comentsDiv.className = 'coments-item-text';
		const comentsBody = document.createElement('p');
		comentsBody.textContent = data[i].body;
		comentsBody.className = 'coments-body section-content';
		const line = document.createElement('div');
		line.className = 'line';
	  	const comentsName = document.createElement('p');
		comentsName.textContent = data[i].name;
		comentsName.className = 'coments-name section-content';
		comentsDiv.appendChild(comentsBody);
		comentsDiv.appendChild(line);
		comentsDiv.appendChild(comentsName);
		comentsItem.appendChild(img);
		comentsItem.appendChild(comentsDiv);
		elem.appendChild(comentsItem);
}

// read catalog-data
function readCatalogData() {
	document.addEventListener('DOMContentLoaded', function() {
	  	fetch('https://run.mocky.io/v3/ced24126-e530-48f5-bb23-68efa4a532d1')  
	    .then(response => response.json())
	    .then(data => {
		    	// we increase the number of compositions for the test
		    	dataFlowersGlobal = data.concat(data.map(item => {
		    			const el = {...item};
		    			el.id = item.id + 6;
		    			el.title = item.title + ' Lux';
		    			el.price = item.price + 30;
	    				return el;
					}));
		    	dataFlowersGlobal = dataFlowersGlobal.concat(dataFlowersGlobal.map(item => {
		    			const el = {...item};
		    			el.id = item.id + 12;
		    			el.title = item.title + ' Grand';
		    			el.price = item.price + 40;
	    				return el;
					}));
		    	createArrowToSlider(dataFlowersGlobal, 'catalog', COUNTFLOWERS);
		    	addBlockToContainer(dataFlowersGlobal, 'flowerGallery', indexFlowers, COUNTFLOWERS);
		    	liFlowersGlobal = document.querySelectorAll("#catalog-ul li");
	    })
	    .catch(error => {
		    	console.log('Error loading the flowers:', error);
		    	flowerDiv = document.createElement('section');
		      flowerDiv.className = 'catalog-item';
		      const err = document.createElement('p');
		      err.textContent = `Сталась помилка при завантаженні  каталогу. 
		      									 Спробуйте ще, або зателефонуйте (095) 000 00 00 для замовлення`;
		      err.className = 'section-content';  
		      flowerDiv.appendChild(err);
		      const gallery = document.getElementById('flowerGallery');
		      gallery.appendChild(flowerDiv);
	   	});
	});
}

// read coments-data
function readComentsData() {
	document.addEventListener('DOMContentLoaded', function() {
	    fetch('https://jsonplaceholder.typicode.com/comments')  
	    .then(response => response.json())
	    .then(data => {
		    	dataComentsGlobal = data;
		    	document.dispatchEvent(new CustomEvent('DataLoaded'));
					createArrowToSlider(dataComentsGlobal, 'coments', COUNTCOMENT);
					addStartComents(dataComentsGlobal);
					addBlockToContainer(dataComentsGlobal, 'comentsGallery', indexComents, COUNTCOMENT);
		    	liComentsGlobal = document.querySelectorAll("#coments-ul li");
	    })
	    .catch(error => {
	    	console.error('Error loading the coments:', error);
	   	});
	});
	// send  coment
	document.getElementById('coments').addEventListener('submit', function(event) {
	    event.preventDefault(); 
	    let formData = new FormData(this);
			formData.append('email', 'user@example.com');
		  fetch('https://jsonplaceholder.typicode.com/comments', {
		      method: 'POST',
		      body: formData
		  })
		  .then(response => response.json())
		  .then(data => console.log('Success:', data))
		  .catch(error => console.error('Error:', error));
	});
}
// onClick for slider arrows
function addOnclickForSlidersArrow() {
	document.getElementById('nextBtn').addEventListener('click', () => {
		  if (indexFlowers + COUNTFLOWERS < dataFlowersGlobal.length  ) {
			    indexFlowers += COUNTFLOWERS;
			    addBlockToContainer(dataFlowersGlobal, 'flowerGallery', indexFlowers, COUNTFLOWERS);
			    liFlowersGlobal[ Math.min(Math.trunc(indexFlowers / COUNTFLOWERS), 4)    ].style.color = 'var(--accent-color-second)';
			    liFlowersGlobal[ Math.min(Math.trunc(indexFlowers / COUNTFLOWERS), 4) - 1].style.color = 'var(--accent-color-primary)';
		  }
	});

	document.getElementById('prevBtn').addEventListener('click', () => {
		  if (indexFlowers - COUNTFLOWERS >= 0 ) {
			    indexFlowers -= COUNTFLOWERS;
			    addBlockToContainer(dataFlowersGlobal, 'flowerGallery', indexFlowers, COUNTFLOWERS);
			    liFlowersGlobal[Math.min(Math.trunc(indexFlowers / COUNTFLOWERS), 3  ) + 1 ].style.color = 'var(--accent-color-primary)';
			    liFlowersGlobal[Math.min(Math.trunc(indexFlowers / COUNTFLOWERS), 4)     ].style.color = 'var(--accent-color-second)';
		  }
	});

	document.getElementById('nextBtnCom').addEventListener('click', () => {
		  if (indexComents + COUNTCOMENT < dataComentsGlobal.length   ) {
			    indexComents += COUNTCOMENT;
			    addBlockToContainer(dataComentsGlobal, 'comentsGallery', indexComents, COUNTCOMENT);
			    liComentsGlobal[Math.min(Math.trunc(indexComents / COUNTCOMENT),4) ].style.color = 'var(--accent-color-second)';
			    liComentsGlobal[Math.min(Math.trunc(indexComents / COUNTCOMENT),4)  - 1 ].style.color = 'var(--accent-color-primary)';
		  }
	});

	document.getElementById('prevBtnCom').addEventListener('click', () => {
		  if (indexComents - COUNTCOMENT >= 0 ) {
		    indexComents -= COUNTCOMENT;
		    addBlockToContainer(dataComentsGlobal, 'comentsGallery', indexComents, COUNTCOMENT);
			  liComentsGlobal[ Math.min(Math.trunc(indexComents / COUNTCOMENT),3) + 1 ].style.color = 'var(--accent-color-primary)';
			  liComentsGlobal[ Math.min(Math.trunc(indexComents / COUNTCOMENT),4) ].style.color = 'var(--accent-color-second)';
		  }
	});
}
// temporary function) 
function addStartComents(data) {
		let coment = {};
		coment.img = 'images/reviews-photo1.png';
		coment.name = 'Людмила 22.04.24';
		coment.body = `“Замовляла квіти у неробочий час (увечері), але зі мною дуже оперативно зв'язався 
		співробітник та пообіцяв доставити букет вранці у призначений час. Так і сталося, квіти були доставлені 
		з точністю секунда в секунду, свіжі та красиві. Рекомендую.”`
		data.unshift(coment);
		coment = {};
		coment.img = 'images/reviews-photo2.png';
		coment.name = 'Володимир 19.04.24';
		coment.body = `"Сам не фахівець з квітів, але дружині дуже сподобався оригінальний весняний букет, 
		зібраний із позитивним настроєм. Залишаю свій позитивний відгук магазину на вул.Добровольчих батальонів."`
		data.unshift(coment);
}