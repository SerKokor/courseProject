// https://run.mocky.io/v3/ced24126-e530-48f5-bb23-68efa4a532d1
const countImage =6; //кількість букетів на слайдері
const countComent = 2;
let index = 0;
let indexCom = 0;
let dataGlobal = [];
let liNavGlobal = [];
let liComGlobal = [];

// *****  arrow  *************
function arrowSlider(dataArr, classElement, countElementInGroup) {
	if (dataArr.length > countElementInGroup) {
		const nav = document.getElementById(`${classElement}-nav`);
		nav.style.display = `flex`;
		ulNav = document.getElementById(`${classElement}-ul`);
		for (let i = 1; i <= Math.min(Math.trunc(dataArr.length / countElementInGroup), 5); i+=1) {
			let liNav = document.createElement('li');
			ulNav.appendChild(liNav);
		}
	}
}
// *************


function addBlockToSlider(data) {
	const gallery = document.getElementById('flowerGallery');
	if (index <= data.length && index >= 0) {gallery.innerHTML = '';}

	const len = index + countImage < data.length ? index + countImage : data.length;
	for (let i = index; i < len; i++) {
	    //  create catalogItem
	    const flowerDiv = document.createElement('section');
	    flowerDiv.className = 'catalog-item';
	    const img = document.createElement('img');
	    img.src = data[i].img;
	    img.alt = data[i].title;
	    const title = document.createElement('p');
	    title.innerHTML = `${data[i].title}:  <br>  ${data[i].description}`;
	    title.className = 'section-content';  
	    const price = document.createElement('p');
	    price.textContent = `${data[i].price} грн`;
	    price.className = 'section-content';  
			const inBasket = document.createElement('button');
			inBasket.className = 'button-border';
			inBasket.textContent = 'В кошик';

	    // Додавання елементів до блоку
	    flowerDiv.appendChild(img);
	    flowerDiv.appendChild(title);
	    flowerDiv.appendChild(price);
	    flowerDiv.appendChild(inBasket);
	    gallery.appendChild(flowerDiv);
	  };

	 const nextBtn = document.getElementById('nextBtn');
	 if (index + countImage >= data.length) {
	 	nextBtn.src = "images/ArrowNextFalse.png";
	 } else nextBtn.src = "images/ArrowNext.png";

	 const prevBtn = document.getElementById('prevBtn');
	 if (index - countImage < 0) {
	 	prevBtn.src = "images/ArrowPrev.png";
	 } else	prevBtn.src = "images/ArrowPrevTrue.png";
	  
};


	
document.getElementById('nextBtn').addEventListener('click', () => {
  if (index + countImage < dataGlobal.length  ) {
    index += countImage;
    addBlockToSlider(dataGlobal, index);
    liNavGlobal[Math.trunc(index / countImage)].style.color = 'var(--accent-color-second)';
    liNavGlobal[Math.trunc(index / countImage) -1].style.color = 'var(--accent-color-primary)';
  }
});

document.getElementById('prevBtn').addEventListener('click', () => {
  if (index > 0 ) {
    index -= countImage;
    addBlockToSlider(dataGlobal, index);
    liNavGlobal[Math.trunc(index / countImage)  ].style.color = 'var(--accent-color-second)';
    liNavGlobal[Math.trunc(index / countImage) + 1 ].style.color = 'var(--accent-color-primary)';
  }
});
		
	

// отримуємо каталог зображень
document.addEventListener('DOMContentLoaded', function() {
  	fetch('https://run.mocky.io/v3/ced24126-e530-48f5-bb23-68efa4a532d1')  
    .then(response => response.json())
    .then(data => {
    	dataGlobal = data;
    	// arrowSlider(dataGlobal);
    	arrowSlider(dataGlobal, 'catalog', countImage);
    	addBlockToSlider(dataGlobal, index);
    	liNavGlobal = document.querySelectorAll(".catalog-nav ul li");

    })
    .catch(error => {
    	console.log('Error loading the flowers:', error);
    	flowerDiv = document.createElement('section');
        flowerDiv.className = 'catalog-item';
        const err = document.createElement('p');
        err.textContent = `Сталась помилка при завантаженні  каталогу. Спробуйте ще, або зателефонуйте (095) 000 00 00 для замовлення`;
        err.className = 'section-content';  
        flowerDiv.appendChild(err);
        const gallery = document.getElementById('flowerGallery');
        gallery.appendChild(flowerDiv);

   	});
});

//************************************************************************
// додавання коментів
function addBlockToComents(data, vector) {
	const paragraph1 = document.querySelector('#coments-container .coment-body');
	const paragraph2 = document.querySelector('#coments-container2 .coment-body');
	const paragraph12 = document.querySelector('#coments-container .coment-name');
	const paragraph22 = document.querySelector('#coments-container2 .coment-name');
	paragraph1.textContent = data[indexCom].body;
	paragraph12.textContent = data[indexCom].name;
	indexCom+=vector;
	paragraph2.textContent = data[indexCom].body;
	paragraph22.textContent = data[indexCom].name;
	indexCom+=vector;
	
	const nextBtnCom = document.getElementById('nextBtnCom');
	if (indexCom + countComent >= data.length) {
		nextBtnCom.src = "images/ArrowNextFalse.png";
	} else nextBtnCom.src = "images/ArrowNext.png";

	const prevBtnCom = document.getElementById('prevBtnCom');
	if (indexCom - countComent < 0) {
		prevBtnCom.src = "images/ArrowPrev.png";
	} else	prevBtnCom.src = "images/ArrowPrevTrue.png";
	  
};

// малюємо стрілки "відгуки"
// function arrowComents(data) {
// 	if (data.length > countComent) {
// 		const nav = document.getElementById('coment-nav');
// 		nav.style.display = `flex`;
// 		ulNav = document.getElementById('coment-ul');
// 		for (let i = 1; i <= Math.min(Math.trunc(data.length / countComent), 5); i+=1) {
// 			let liNav = document.createElement('li');
// 			ulNav.appendChild(liNav);
// 		}
// 	}
// }

// onClick для стрілок-коментів
document.getElementById('nextBtnCom').addEventListener('click', () => {
  if (indexCom + countComent < comentGlobal.length - 1  ) {
    addBlockToComents(comentGlobal, 1);
    liComGlobal[Math.min(Math.trunc(indexCom / countComent ), 4)].style.color = 'var(--accent-color-second)';
    liComGlobal[Math.min(Math.trunc(indexCom / countComent  - 1), 3)].style.color = 'var(--accent-color-primary)';
  }
});

document.getElementById('prevBtnCom').addEventListener('click', () => {
  if (indexCom > 1 ) {
    addBlockToComents(comentGlobal, -1);
    if (indexCom <=6 ) {
    	liComGlobal[Math.min(Math.trunc(indexCom / countComent), 3) ].style.color = 'var(--accent-color-second)';
    	liComGlobal[Math.min(Math.trunc(indexCom / countComent) + 1, 4) ].style.color = 'var(--accent-color-primary)';
  	}
  }
});
		

// отримуємо відгуки
document.addEventListener('DOMContentLoaded', function() {
  fetch('https://jsonplaceholder.typicode.com/comments')  
    .then(response => response.json())
    .then(data => {
    	comentGlobal = data;
    	// arrowComents(comentGlobal);
			arrowSlider(comentGlobal, 'coment', countComent);
    	liComGlobal = document.querySelectorAll("#coment-nav ul li");
    })
    .catch(error => {
    	console.error('Error loading the coments:', error);
   	});
});
// send  відгуки
document.getElementById('coment').addEventListener('submit', function(event) {
    event.preventDefault(); 

    let formData = new FormData(this);
	formData.append('email', 'user@example.com');
	// console.log(...formData);
    fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
});
