// const products = document.getElementById('products');
// const orders = document.getElementById('orders');
// const package = document.getElementById('package');
// const accounting = document.getElementById('accounting');
// const terminal = document.getElementById('terminal');
//
// const productsExp = document.querySelector("[data-id='products']");
// const ordersExp = document.querySelector("[data-id='orders']");
// const packageExp = document.querySelector("[data-id='package']");
// const accountingExp = document.querySelector("[data-id='accounting']");
// const terminalExp = document.querySelector("[data-id='terminal']");
//
// const total = document.getElementById('total-price');

function Input (id) {
    this.source = document.getElementById(id);
    this.target = document.querySelector("[data-id=" + id + "]");
    // for (let key in user) {
    //     if (typeof user[key] == 'function') {
    //         user[key] = user[key].bind(user);
    //     }
    // }
}

// function func() {
//     console.log(this);
// }

Input.prototype.changeVisibility = function () {
    console.log(this);
    this.target.classList.toggle('block-display');
}

Input.prototype.addListener = function () {
    this.source.addEventListener('click', terminal.changeVisibility);
}


const products = new Input ('products');
const terminal = new Input ('terminal');

terminal.addListener();
