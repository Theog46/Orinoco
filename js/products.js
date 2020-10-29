/* RECUPERER DONNEES */

let objetProduit = JSON.parse(window.localStorage.getItem("productDetails"));

/* DEFINIR CONSTANTE POUR STRUCTURE PAGE */
const teddiesList = document.getElementById('bloc_1');

/* VARIABLES POUR INTRODUIRE LES ELEMENTS DES TEDDIES */
let teddieName = document.createElement('h3');
    teddieName.innerText = `${objetProduit.name}`;

let teddieImg = document.createElement('img');
    teddieImg.classList.add('img_zoom');
    teddieImg.src = `${objetProduit.imageUrl}`;

let teddiePrice = document.createElement('p');
    teddiePrice.classList.add('teddie_price');
    teddiePrice.innerText = `${objetProduit.price / 100}` + ` €`

let teddieDescription = document.createElement('div');
    teddieDescription.classList.add('teddie_resume');
    teddieDescription.innerText = `${objetProduit.description}`;

    /* FONCTION CHOIX COULEURS */
    function lenseSelection(){
        let colorsData = objetProduit.colors;
        let productPerso = document.getElementById("choix_option");
        /* CREER LA LISTE DE POUR CHOISIR LES COULEURS */
        var selectList = document.createElement("select");
        selectList.id = "mySelect";
        productPerso.appendChild(selectList);
    
        /* CREER ET IMPLEMENTER LES CHOIX DE COULEURS */
        for (var i = 0; i < colorsData.length; i++) {
            var option = document.createElement("option");
            option.value = colorsData[i];
            option.text = colorsData[i];
            selectList.appendChild(option);
        }
    }
    lenseSelection();
/* GESTION ENFANTS PARENTS */
teddiesList.append(teddieName, teddieImg, teddiePrice, teddieDescription);

/* AJOUTER PRODUITS AU PANIER */
function addToCart() {
    let productsTable = localStorage.getItem('productList');

        if (!productsTable) {
            productsTable = [];
            objetProduit.quantity = 1;
            productsTable.push(objetProduit);
        } else {
            productsTable = JSON.parse(productsTable);
            console.log(productsTable);

            if (productsTable.find(product => product._id === objetProduit._id)) {
                objetProduit.quantity++;
                for (var i = 0; i < productsTable.length; i++) {
                    if (objetProduit.id === productsTable[i]._id) {
                        productsTable[i].quantity++;
                        break;
                    }
                }
            } else {
                objetProduit.quantity = 1;
                productsTable.push(objetProduit);
            }
        }
        productsTable = JSON.stringify(productsTable);

    /* AJOUT AU LOCAL STORAGE */
    localStorage.setItem("productList", productsTable);
    
}
