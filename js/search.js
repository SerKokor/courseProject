let searchArr = [];

document.addEventListener('DataLoaded', function() {
	const searchButton = document.querySelector('.nav-icons .search img');
	const searchText = document.querySelector('.nav-icons .search input[name="searchText"]');

	searchText.addEventListener('keyup', function(event) {
    	if (event.key === "Enter") {
	    	searchData(searchText.value);
	    	searchText.value = '';
	    	viewDataSearch(searchArr);
	    	onClickPayButton ('cart-container-search');
    	}
	});

	searchButton.addEventListener('click', () => {
		if (searchText.value == '') {
			searchText.classList.toggle('open');
			searchText.focus();
		} else {
			searchData(searchText.value);
			viewDataSearch(searchArr);
			onClickPayButton ('cart-container-search');
			searchText.value = '';
		}
	});
});

function searchData(queryText)  {
	searchArr = dataFlowersGlobal.filter(p => 
		p.title?.includes(queryText) || 
		p.description?.includes(queryText));
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
