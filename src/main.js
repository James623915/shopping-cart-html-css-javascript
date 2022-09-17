let shop = document.getElementById('shop');
console.log(shop);

// let basket = []; we have to change it to below line to retrieve the data from the localstorage
let basket = JSON.parse(localStorage.getItem('data')) || []; //dont forget || [] when there is no data storaged. If you forget it will break your app.

let generateShop = () => {
  return (shop.innerHTML = shopItemData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `      
    <div id=product-id-${id} class="item">
      <img width="220" src=${img} alt="" />
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
          <h2>$ ${price}</h2>
          <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
        </div>
      </div>
    </div>`;
    })
    .join(''));
};

generateShop();

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
  localStorage.setItem('data', JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //   console.log(search.item);
  document.getElementById(id).innerHTML = search.item; //item number will shown on DOM
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById('cartAmount');
  //   console.log('calculation function is running');
  //   cartIcon.innerHTML = 100;
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  //   console.log(basket.map((x) => x.item).reduce((x, y) => x + y, 0));
};
calculation();
