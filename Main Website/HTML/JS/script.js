//Please regard THIS PART of the CODE as it is not used right now (THIS CODE is saved for later use.)
//Please scroll down to see the staring of the MAIN CODE.

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('addToCartBtn')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', onFormSubmit)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('menuItem')[0].innerText
    var price = shopItem.getElementsByClassName('itemPrice')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('foodImage')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button" onclick="deleteValue('')">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('₹', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '₹' + total
}



function onFormSubmit() {
    var formData = readFormData();
    insertNewRecord(formData);

    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function readFormData() {

    var formData = {};

    formData["fullName"] = document.getElementById('fNameinput').value
    formData["lastName"] = document.getElementById('lNameinput').value
    formData["address"] = document.getElementById('deliveryAddressinput').value
    formData["email"] = document.getElementById('deliveryEmailinput').value
    formData["phoneNumber"] = document.getElementById('deliveryNumberinput').value
    formData["order"] = document.getElementsByClassName('cart-items')[0].innerText
    formData["quantity"] = document.getElementsByClassName('cart-quantity-input')[0].value
    formData["total"] = document.getElementsByClassName('cart-total-price')[0].innerText

    return formData;

}

function insertNewRecord(data) {

    var table = document.getElementById('orderDetails').getElementsByTagName('tbody')[0];

    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.lastName;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.address;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.email;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.phoneNumber;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.order;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.quantity;
    cell8 = newRow.insertCell(7);
    cell8.innerHTML = data.total;
}

//main Code STARTS from HERE.

//This part is related to the menu TAB SECTION. 
var tabs = document.querySelectorAll(".tabs ul li");
var tab_wraps = document.querySelectorAll(".tabWrap");

tabs.forEach(function(tab, tab_index) {
    tab.addEventListener("click", function() {
        tabs.forEach(function(tab) {
            tab.classList.remove("AcTive");
        })
        tab.classList.add("AcTive");

        tab_wraps.forEach(function(content, content_index) {
            if (content_index == tab_index) {
                content.style.display = "block";
            } else {
                content.style.display = "none";
            }
        })

    })
})