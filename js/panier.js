// RECUPERER DONNEES LOCALSTORAGE
let panier = JSON.parse(window.localStorage.getItem("productList"));
const productDetails = document.getElementById('table_cart');

for(let i in panier){

    // CREER UN CONTENAIRE PRODUIT
    let productTable = document.createElement('table');
        productTable.className = "table";

    let productInfo = document.createElement('tr');
        productInfo.className = "product_summary";

    // 2 TD POUR ORGANISER
    let leftColumn = document.createElement('td');
    let rightColumn = document.createElement('td');
        rightColumn.className = "prix_panier";

    // CREER LES DETAILS DES PRODUITS
    let productTitle = document.createElement('h3');
        productTitle.innerText = `${panier[i].name}`;
    let productImage = document.createElement('img');
        productImage.src = `${panier[i].imageUrl}`;

    let productPrice = document.createElement('td');
        productPrice.innerText = 'Prix unitaire : ' + `${panier[i].price}` / 100 + ` €`;

    // CREER LES BOUTONS + ET - QUANTITE
    let productQuantity = document.createElement('td');
        productQuantity.className = "quantity_cursor";
        
    let quantityMinus = document.createElement('td');
        quantityMinus.innerText = `-`;
        // AJOUTER UNE FONCTION POUR REDUIRE LE NOMBRE DE PRODUIT 
        quantityMinus.onclick = function (){
            let productsTable = localStorage.getItem("productList");
            
            productsTable = JSON.parse(productsTable);

            if(!productsTable[i]){
                return false;
            }
            productsTable[i].quantity--;
            document.location.reload(true);
            if(productsTable[i].quantity <= 0 ){
                // SUPPRIMER UN PRODUIT
                productsTable.splice(i,1);
                document.location.reload(true);
            }
            
            productsTable = JSON.stringify(productsTable);
            // RAJOUTER ARRAY AU LOCALSTORAGE
            localStorage.setItem("productList", productsTable);
        };
        
    let quantityPlus = document.createElement('td');
        quantityPlus.innerText = `+`;
        // AJOUTER UNE FONCTION POUR AUGMENTER LA QUANTITE
        quantityPlus.onclick = function (){
            let productsTable = localStorage.getItem("productList");
            
            productsTable = JSON.parse(productsTable);
            
            // AUGMENTER LA QUANTITE
            productsTable[i].quantity++;
            document.location.reload(true);
            
        
            // ENCODER L'ARRAY
            productsTable = JSON.stringify(productsTable);
        
            // RE METTRE ARRAY DANS LOCALSTORAGE
            localStorage.setItem("productList", productsTable);
            };
        
    let quantityShow = document.createElement('td');
        quantityShow.innerHTML = `${panier[i].quantity}`;

    let productDelete = document.createElement('i');
            productDelete.className = 'fas fa-times-circle';
            productDelete.onclick = function removeItem(){
                let productsTable = localStorage.getItem("productList");
                // DECODER L'ARRAY
                productsTable = JSON.parse(productsTable);
                // SUPPRIMER UN PRODUIT DU PANIER
                productsTable.splice(i,1);
                alert("Ce produit a été supprimé du panier");
                document.location.reload(true);
                 // ENCODER L'ARRAY
                productsTable = JSON.stringify(productsTable);
        
                // REMETTRE L'ARRAY DANS LOCALSTORAGE
                localStorage.setItem("productList", productsTable);
            }

            
    productDetails.append(productTable);
    let recap = document.getElementById('recap');
    recap.append(productTable);
    productTable.append(productInfo);
    productInfo.append(leftColumn, rightColumn, productDelete);
    leftColumn.append(productTitle, productImage);
    rightColumn.append(productQuantity, productPrice);
    productQuantity.append(quantityMinus, quantityShow, quantityPlus);
}

// CALCULER LE PRIX TOTAL

 let totalPrice = document.getElementById('total_price');
 let totalAmount = 0;
 for(let i = 0; i<panier.length; i++){
    totalAmount += panier[i].price * panier[i].quantity;
 }
 totalPrice.innerText = `${totalAmount}` / 100 + ` €`;
 



if(panier){
     document.getElementById("empty_basket").classList.replace("hide", "show");
}

 function emptyCart(){
    localStorage.clear();
    alert("Le panier a été vidé avec succès");
    document.location.reload(true);
 }

 // FAIRE APPARAITRE LE FORMULAIRE
// CONDITION : SI PANIER VIDE, AFFICHE VOTRE PANIER EST VIDE
function showCloseForm(){
    if (panier){
    document.getElementById("form_order").classList.toggle('form_show');  
    }else if(!panier){
        let emptyCart = document.getElementById("table_cart");
        let emptyMessage = document.createElement('p');
        emptyMessage.innerText = "Aucun produit dans le panier";
        emptyCart.append(emptyMessage);
    }
};


document.getElementById('formOrder').addEventListener('submit', function(e){
    e.preventDefault();
    sendData();
})


// ENVOYER L'ORDER

function sendData(){
    // DEFINIR L'OBJET CONTACT
    let formData = document.getElementsByClassName("form-input");
    
    let contact = {
        lastName : formData[0].value,
        firstName : formData[1].value,
        email : formData[2].value,
        tel : formData[3].value,
        address: formData[4].value,
        postcode : formData[5].value,
        city : formData[6].value,
    }

    let data = JSON.stringify(contact);
    localStorage.setItem("contact", JSON.stringify(contact) );
    console.log(data);
    
    // DEFINIR ARRAY AVEC LES PRODUCTS ID
    let products = [];
    panier.forEach(function(product){
        products.push(product._id);
    });

    let orderData = {contact, products};
    console.log(orderData);

    // CREER UNE REQUETE VARIABLE ET LUI ASSIGNER UN NOUVEL OBJET XMLHtppRequest

    request('POST', 'http://localhost:3000/api/teddies/order', function(response) {
        console.log("resp",response);
        let orderId = response.orderId;
        localStorage.clear();
        localStorage.setItem("totalAmount", totalAmount);
        localStorage.setItem("orderId", orderId);
        localStorage.setItem("contact", data);
        window.open("index.html","_self");
    }, orderData);

    window.open("confirmation.html");
}



