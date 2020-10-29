window.onload = function () {
    if (! localStorage.justOnce) {
        localStorage.setItem("justOnce", "true");
        document.location.reload(true);
    }
}

document.getElementById('id_order').innerText = localStorage.getItem('orderId');
document.getElementById('total_amount').innerText = localStorage.getItem('totalAmount') / 100 + ' €';

