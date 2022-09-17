let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

// console.log(shopItemData);

let basket = JSON.parse(localStorage.getItem('data')) || []; //dont forget || [] when there is no data storaged. If you forget it will break your app.

let calculation = () => {
  let cartIcon = document.getElementById('cartAmount');

  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        // console.log(x);
        let { id, item } = x;
        let search = shopItemData.find((y) => y.id === id) || [];
        let { img, name, price } = search;
        return `
        <div class="cart-item">
        <img width='100' src=${img} />
        <div class="details">

        <div class="title-price-x">
        <h4 class="title-price">
        <p>${name}</p>
        <p class="cart-item-price">$ ${price}</p>
        </h4>
        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
        </div>

        <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${item}</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>

        <h3>$ ${item * search.price}</h3>

        </div>
        </div>
        `;
      })
      .join(''));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href='index.html'>
    <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();

  localStorage.setItem('data', JSON.stringify(basket));
  //   console.log(basket);
  update(selectedItem.id);
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0)
    return; //completely stop the process when it reaches 0
  else {
    search.item -= 1;
  }
  //   localStorage.setItem('data', JSON.stringify(basket)); move this line below after everything is edited
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  //   console.log(basket); move this line up because it need to be updated first before filter() can work properly
  //   update(selectedItem.id);
  generateCartItems();
  localStorage.setItem('data', JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //   console.log(search.item);
  document.getElementById(id).innerHTML = search.item; //item number will shown on DOM
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  //   console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  calculation();
  localStorage.setItem('data', JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem('data', JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>

    `;
  } else return;
};

TotalAmount();
