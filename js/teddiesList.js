/* REQUETE POUR RECUPERER API TEDDIE */

request('GET','http://localhost:3000/api/teddies', function(teddies){
    displayTeddies(teddies);
});

/* CONSTANTE POUR AJOUTER TEDDIE DANS INDEX */

const teddiesList = document.getElementById('bloc');

function displayTeddies(teddies){
    for(let i in teddies) {
        let productCard = document.createElement('section');
            productCard.classList.add('product_card');
            productCard.onclick = function storeData(){
                window.localStorage.setItem('productDetails', JSON.stringify(teddies[i]));
                
            };

        /* CREATION VARIABLES ET AJOUT STRUCTURE INDEX */

        let productLeftDiv = document.createElement('div');
        let productName = document.createElement('h3');
            productName.innerText = `${teddies[i].name}`;

        let productImage = document.createElement('img');
            productImage.src = `${teddies[i].imageUrl}`;

        let productRightDiv = document.createElement('div');
        let productPrice = document.createElement('p');
            productPrice.classList.add('product_price');
            productPrice.innerText = `${teddies[i].price / 100}` + ` €`;

        let productDescription = document.createElement('p');
            productDescription.classList.add('description');
            productDescription.innerText = `${teddies[i].description}`;
        
        let productLink = document.createElement('a');
            productLink.innerText = `Consulter la page produit`;
            productLink.setAttribute('href', 'products.html?id=' + teddies[i]._id);

        teddiesList.append(productCard);
        productCard.append(productLeftDiv,productRightDiv);
        productLeftDiv.append(productName,productImage);
        productRightDiv.append(productPrice,productDescription,productLink);
    }
}

