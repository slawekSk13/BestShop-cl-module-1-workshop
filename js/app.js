const total = document.getElementById('total-price');
const visible = document.getElementsByClassName('open');

function showTotal() {
    if (visible.length < 2 && total.classList.contains('open')) {
        total.classList.remove('open');
    } else if (visible.length > 0) {
        total.classList.add('open');
    }
    total.children[1].innerText = '$ ' + sum;
}

const pricesArr = [0, 0, 0, 0, 0];

function updateSum(context) {
    findObj(context);
    if (obj.source.value > 0) {
        if (obj.id === 'products' || obj.id === 'orders') {
            if (!parseInt(obj.source.value)) {
                obj.target.classList.remove('open');
            }
            obj.target.querySelector('.item__calc').innerText = parseInt(obj.source.value) + ' * $' + obj.price;
            obj.target.querySelector('.item__price').innerText = '$ ' + (parseInt(obj.source.value) * obj.price);
        } else if (obj.id === 'package') {
            console.log('działania dla package');
        }
    }
    else if (obj.id === 'accounting' || obj.id === 'terminal') {
        if (obj.source.checked) {
            obj.target.querySelector('.item__price').innerText = '$ ' + obj.price;
        } else if (!obj.source.checked) {
            obj.target.querySelector('.item__price').innerText = '00';
        } else {
            console.log(obj);
        }
    }


    elements.forEach(function (el, i) {
        if (parseInt(el.target.querySelector('.item__price').innerText.slice(1))) {
            pricesArr[i] = parseInt(el.target.querySelector('.item__price').innerText.slice(1));
        } else {
            pricesArr[i] = 0;
        }
    });
    sum = pricesArr.reduce(function (p, c) {
        return p + c;
    });
}

function Input(id, price) {
    this.id = id;
    this.price = price;
    this.source = document.getElementById(id);
    this.target = document.querySelector("[data-id=" + id + "]");
}

let obj;

function findObj(cont) {
    const thisId = cont.id;
    elements.forEach(function (el) {
        if (el.id === thisId) {
            obj = el;
        }
    });
    return obj
}

Input.prototype.changeVisibility = function () {
    if (this === elements[2]) {
        this.target.classList.add('open');
        this.target.children[1].innerText = pcg;
        this.target.children[2].innerText = '$ ' + this.price[pcg];
    }
    findObj(this);

    if (obj.source.value > 0 || obj.source.checked) {
        obj.target.classList.add('open');
    } else if (!obj.source.value <= 0 && obj.source.checked === false) {
        obj.target.classList.remove('open');
    }
    updateSum(this);
    showTotal();

}

Input.prototype.addListener = function () {
    if (this.source.className === 'checkbox') {
        this.source.addEventListener('click', this.changeVisibility);
    } else if (this.id === 'package') {
        this.source.addEventListener('click', function (e) {
            e.stopPropagation();
            document.querySelector('.select__dropdown').classList.toggle('open');
            this.classList.toggle('open');
        });
    } else if (this.source.className === 'form__input') {
        this.source.addEventListener('change', this.changeVisibility);
        this.source.addEventListener('keyup', this.changeVisibility);
    } else {
        console.log(this);
    }
}

let pcg;
const elements = [];
let sum;

elements.push(new Input('products', 10));
elements.push(new Input('orders', 3));
elements.push(new Input('package', {Basic: 0, Professional: 25, Premium: 60}));
elements.push(new Input('accounting', 20));
elements.push(new Input('terminal', 15));

const dropdownItems = elements[2].source.children[1].children;

elements.forEach(function (el) {
    el.addListener();
    el.target.querySelector('.item__price').innerText = '$ 0';
});

for (let i = 0; i < dropdownItems.length; i++) {
    dropdownItems[i].addEventListener('click', function () {
        pcg = this.dataset.value;
        this.parentElement.parentElement.firstElementChild.innerText = pcg;
        elements[2].changeVisibility();
    });
}

document.querySelector('section.calc').addEventListener('click', function (){
    document.querySelector('.select__dropdown').classList.remove('open');
    document.getElementById('package').classList.remove('open');
});