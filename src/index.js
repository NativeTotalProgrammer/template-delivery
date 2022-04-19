//############################################
const app = document.getElementById('app');
//############################################

import sheet from './styles.css' assert {type: 'css'};
document.adoptedStyleSheets = [sheet]; 

// import { menudata } from  './data/menu.js';

//################################################### CREATING ELEMENTS AND NAVBAR 

const header = document.createElement('header');
const nav    = document.createElement('nav');
const a      = document.createElement('a');
const ul     = document.createElement('ul');
const strong = document.createElement('strong');
const em     = document.createElement('em');


let listLi;

for (let i = 0; i <= 3; i++) {
  let li = document.createElement('li');
  li.setAttribute('id', `${i}`)
  li.classList.add('li');
  ul.appendChild(li);
}

//####################################################

a.textContent = ' Lunch Delivery';
a.setAttribute('href', '#');
em.textContent = 'Express';
ul.childNodes[0].innerText   = 'All'; 
ul.childNodes[1].textContent = 'Breakfast'; 
ul.childNodes[2].textContent = 'Lunch'; 
ul.childNodes[3].innerText   = 'Shakes'; 
ul.childNodes[0].classList.add('active')

header.classList.add('header');
nav.classList.add('nav');
a.classList.add('logo');
ul.classList.add('ul');
// ul.childNodes[0].classList.add('active');

//####################################################
a.prepend(strong);
strong.appendChild(em);
nav.appendChild(a);
nav.appendChild(ul);
header.appendChild(nav);
app.appendChild(header)

//################################################################################# 



//======================================= 
// ============== BUTTONS AND FILTER DATA;

const main         = document.createElement('main');
const divProducts  = document.createElement('div');


//=======================================
//============================ FETCH JSON

function filterFunction(value) {

  fetch('./menu.json')
  .then(res => res.json())
  .then(data => {

    if (value === 'all') {
      const arrayCategory = Object.values(data);
    
      let allDishesArray = []
      
      for (let i = 0; i < arrayCategory.length; i++) {
        for (let j = 0; j < arrayCategory[i].length; j++) {
          allDishesArray.push(arrayCategory[i][j])
        };
      };

      const myDish = allDishesArray.map(dish => {
        
        return `
          <div class='single-card'>
            <img src="./src/assets/${dish.image}.jpg" alt="img..." />
            <div class='dish-description'>
              <h2>  ${dish.title}    <span>$ ${dish.price}</span></h2>
              <p>${dish.description}</p>
              <button>ADD</button>
            </div>
          </div>
        `
      }).join('');
      divProducts.innerHTML = myDish;

    } else {
      const myDish = data[value].map(dish => {
        
        return `
          <div class='single-card'>
            <img src="./src/assets/${dish.image}.jpg" alt="img..." />
            <div class='dish-description'>
              <h2>  ${dish.title}    <span>$ ${dish.price}</span></h2>
              <p>${dish.description}</p>
              <button>ADD</button>
            </div>
          </div>
        `
      }).join('');
      divProducts.innerHTML = myDish;
    };  
  })
  .catch(err => console.log(err))

};

divProducts.classList.add('cards');
main.appendChild(divProducts);
app.appendChild(main)

const liItem = document.querySelectorAll('ul li');

liItem.forEach(li => {
  li.onclick = function() {

    liItem.forEach(li => {
      li.className = "";
    });

    li.className = "active";

    let category = li.textContent.toLocaleLowerCase();
    
    if (category === 'all') {
      console.log(category);
      filterFunction(category)
    } else if (category === 'breakfast') {
      console.log(category);
      filterFunction(category)

    } else if (category === 'lunch') {
      console.log(category);
      filterFunction(category);
      
    } else if (category === 'shakes') {
      console.log(category);
      filterFunction(category);
      
    }
  };
});

//==================================================
//=====================================SHOPPING CART

const footer          = document.createElement('footer');
const shoppingCartDiv = document.createElement('div');
const div1TitleOrder  = document.createElement('div');     
const div2ListItems   = document.createElement('div');     
const div3TwoButtons  = document.createElement('div');
const titleCart       = document.createElement('h2');    
const btnClear        = document.createElement('button');
const btnPlacerOrder  = document.createElement('button');
const divAdd          = document.createElement('div');
const msgAdd          = document.createElement('h3');

titleCart.textContent      = 'Order Details';
btnClear.textContent       = 'Clear';
btnPlacerOrder.textContent = 'Placer Order';
msgAdd.textContent         = 'Add'

msgAdd.classList.add('add__square');
divAdd.classList.add('nav__add');
titleCart.classList.add('title__cart');
shoppingCartDiv.classList.add('main__cart');
div1TitleOrder.classList.add('div__title');
div2ListItems.classList.add('div__items');
div3TwoButtons.classList.add('div__buttons');
btnClear.classList.add('red__btn');
btnPlacerOrder.classList.add('green__btn');

divAdd.appendChild(msgAdd);
div3TwoButtons.appendChild(btnClear);
div3TwoButtons.appendChild(btnPlacerOrder);
div1TitleOrder.appendChild(titleCart);
shoppingCartDiv.appendChild(div1TitleOrder);
shoppingCartDiv.appendChild(divAdd);
shoppingCartDiv.appendChild(div2ListItems);
shoppingCartDiv.appendChild(div3TwoButtons);
footer.appendChild(shoppingCartDiv);
app.appendChild(footer);

window.onload = function () {
  filterFunction('all');
};



