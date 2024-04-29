const basket = document.querySelector('#basket');
const input = document.querySelector('#input');
let searchArr = [];

document.addEventListener('DataLoaded', function() {

	searchKeyUp();
	searchOnClickLupa();
	addCloseAllOpen();
	// console.log('test:');
	// console.log(searchData('KSKSZVB nh1jz1zylfvB')); ліл троя
});


function searchOnClickLupa() {
	const searchButton = document.querySelector('.nav-icons .search img');
	// const input = document.querySelector('.nav-icons .search input[name="input"]');
	searchButton.addEventListener('click', () => {
		if (input.value == '') {
			input.classList.toggle('open');
			input.focus();
		} else {
			viewDataSearch(searchData(input.value));
			onClickPayButton ('cart-container-search');
			input.value = '';
		}
	});
}

function searchKeyUp() {
		input.addEventListener('keyup', function(event) {
	    	if (event.key === "Enter") {
		    	
		    	viewDataSearch(searchData(input.value));
		    	input.value = '';
		    	onClickPayButton ('cart-container-search');
	    	}
		});
}

function addCloseAllOpen() {
	document.addEventListener('click', function(event) {
	    // const basket = document.querySelector('#basket');
	    const burger = document.querySelector('#burger');
	    const search = document.querySelector('#search');
	    // const input = document.querySelector('#input');
	    const cartModal = document.querySelector('#cart-modal');
	    const cartModalContent = document.querySelector('#cart-modal .modal-content');
	    const nav = document.querySelector('#nav');
	    const cartSearch = document.querySelector('#cart-search');
	    const cartSearchContent = document.querySelector('#cart-search .modal-content');

	    // Перевіряємо, чи клік був зроблений поза визначеними елементами
	    if (!basket.contains(event.target) && !cartModalContent.contains(event.target) && cartModal.classList.contains('open')) {
	        cartModal.classList.remove('open'); // Закриття модального вікна кошика
	        // console.log('cartModal');
	    }
	    if (!burger.contains(event.target) && nav.classList.contains('open')) {
	        nav.classList.remove('open'); // Закриття навігаційного меню
	        burger.classList.remove('open');
	    }
	    if (!search.contains(event.target) && input.classList.contains('open')) {
	        input.classList.remove('open'); // Закриття текстового поля пошуку
	        input.value = '';
	    }
	    if (!search.contains(event.target) && !cartSearchContent.contains(event.target) && cartSearch.classList.contains('open')) {
	        cartSearch.classList.remove('open'); // Закриття результатів пошуку
	    }
	    // event.stopPropagation();
	});
}


function searchData(queryText) {
    let text = String(queryText.toLowerCase().trim().replace(/[^\u0400-\u04FF\s]/g, '')); // only cyrylic
    if (!text.trim()) { // якщо в text пусто або лише пробіли
    	text = fixKeyboardLayout(queryText.toLowerCase().trim().replace(/[^\a-zA-Z\s]/g, '')); // if error keyboard <- only latin
    	if (!inFlowersDictionary(text)) { return [] };
    };
    const textArr = text.split(' ').map(str => str.slice(0, 4));
    let partialMatches = new Set();
    let fullMatches = new Set();

    dataFlowersGlobal.forEach(p => {
        let allInclude = true;
        for (let el of textArr) {
            const titleIncludes = p.title?.toLowerCase().includes(el);
            const descIncludes = p.description?.toLowerCase().includes(el);

            if (titleIncludes || descIncludes) {
                partialMatches.add(p);
            } else {
                allInclude = false;
                // break;
            }
        }
        if (allInclude) {
            fullMatches.add(p);
        }
    });

    return fullMatches.size ? Array.from(fullMatches) : Array.from(partialMatches);
}

function inFlowersDictionary(text) {
	let words = ["троя", "хриз", "ліл", "соня", "солі"];

	return words.some(word => text.includes(word));
}

function fixKeyboardLayout(input) {
    const enToUk = {
        'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г', 'i': 'ш', 'o': 'щ', 'p': 'з', '[': 'х', ']': 'ї', 
        'a': 'ф', 's': 'і', 'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д', ';': 'ж', '\'': 'є',
        'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и', 'n': 'т', 'm': 'ь', ',': 'б', '.': 'ю', '/': '.',
        'Q': 'Й', 'W': 'Ц', 'E': 'У', 'R': 'К', 'T': 'Е', 'Y': 'Н', 'U': 'Г', 'I': 'Ш', 'O': 'Щ', 'P': 'З', '{': 'Х', '}': 'Ї',
        'A': 'Ф', 'S': 'І', 'D': 'В', 'F': 'А', 'G': 'П', 'H': 'Р', 'J': 'О', 'K': 'Л', 'L': 'Д', ':': 'Ж', '"': 'Є',
        'Z': 'Я', 'X': 'Ч', 'C': 'С', 'V': 'М', 'B': 'И', 'N': 'Т', 'M': 'Ь', '<': 'Б', '>': 'Ю', '?': ','
    };

    return input.split('').map(char => enToUk[char] || char).join('');
}

function viewDataSearch (arr) {
	const cartContainer = document.getElementById('cart-container-search');
    cartContainer.innerHTML = '';
    if (arr.length) {
		arr.forEach( (item) => {
	        createCatalogItem(item, cartContainer)
	    });
	} else {
		const title = document.createElement('p');
	    title.innerHTML = `Нічого не знайдено`;
	    title.className = 'section-content'; 
	    cartContainer.appendChild(title); 
	}

    toggleOpen('#cart-search');

}
function searchClose() {
	const searchText = document.querySelector('.nav-icons .search input[name="searchText"]');
	searchText.value = '';
	searchText.classList.toggle('open');
	toggleOpen('#cart-search');
}
