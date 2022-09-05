//get total
// create proudect
//clear input
//read
//count
//deleted
// update
// search

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submitBtn = document.getElementById("submit");

//delusory variable
let mode = 'create'
let productId;


// integration
let dataProduct = [];
function getData() {
  fetch("http://localhost:8080/allProducts")
  .then((response) => response.json())
  .then((json) => {
    dataProduct = json.result;
    showData();
    console.log(dataProduct);
  });
}
getData()


//get total
function getTotal() {
  if (price.value != "" && taxes.value != "") {
    const result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.classList.add("bg-success");
  } else {
    total.innerHTML = "";
    total.classList.remove("bg-success");
  }
}
price.addEventListener("keyup", getTotal);
taxes.addEventListener("keyup", getTotal);
ads.addEventListener("keyup", getTotal);
discount.addEventListener("keyup", getTotal);



// create proudect
function submit() {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if(title.value !='' && price.value != ''&& category.value != ''&& newProduct.count <= 100 ) {
    if( mode === 'create') {
      if(newProduct.count >  1 ) {
        for (let i = 0; i < newProduct.count ; i++) {
          crudData('addProduct','POST', newProduct)
        }
      }else {
        crudData('addProduct','POST', newProduct)
      }
  
    }else {
      const myProduct = {...newProduct}
      const getIdProduct = {
        id: productId
      }
      const result = Object.assign(getIdProduct , myProduct )
      crudData('update','PUT', result)
      count.classList.remove('d-none');
      submitBtn.innerHTML = "Create";
      mode = 'create'
    }
    clearInput()
  }
  total.classList.remove("bg-success");
  console.log(newProduct);
}
submitBtn.addEventListener("click", submit);

function crudData(endPoint,method,data) {
      // POST request using fetch()
  fetch(`http://localhost:8080/${endPoint}`, {
    // Adding method type
    method: method,
    // Adding body or contents to send
    body: JSON.stringify(data),
    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    // Converting to JSON
    .then((response) => response.json())
    // Displaying results to console
    .then((json) => {
      if(json.message === 'success') {
        getData()
      }
    });

}


// showData
function showData() {
  let table = ``;
  for (let i = 0; i < dataProduct.length; i++) {
    table += `<tr>
            <td>${i + 1}</td>
            <th>${dataProduct[i].title}</th>
            <th>${dataProduct[i].price}</th>
            <th>${dataProduct[i].taxes}</th>
            <th>${dataProduct[i].ads}</th>
            <th>${dataProduct[i].discount}</th>
            <th class="text-primary">${dataProduct[i].total}</th>
            <th>${dataProduct[i].category}</th>
            <td> <button onclick="upDateData(${i} , ${dataProduct[i].id})" class="btn btn-warning" id="update">Update</button></td>
            <td> <button onclick="deleteProduct(${dataProduct[i].id})" class="btn btn-danger" id="delete">Delete</button></td>
            </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  const numberOfProducts = document.getElementById('numberOfProducts')
  if(dataProduct.length > 0) {
    numberOfProducts.innerHTML = `<span class="bg-info p-2 rounded-3 text-white">number Of Products ${dataProduct.length}</span>`
  }else {
    numberOfProducts.innerHTML = ''
  }
}



//update
function upDateData(i , id) {
  productId = id
  title.value = dataProduct[i].title
  price.value = dataProduct[i].price
  taxes.value = dataProduct[i].taxes
  ads.value = dataProduct[i].ads
  discount.value = dataProduct[i].discount
  total.innerHTML = dataProduct[i].total;
  getTotal()
  category.value = dataProduct[i].category
  count.classList.add('d-none');
  submitBtn.innerHTML = "Update";
  mode = 'update'
  scroll({
    top:0,
    behavior: "smooth"
  })
}

//delete
function deleteProduct(id) {
  crudData('delete','DELETE',{id})

}


// search
let search = document.getElementById("search");
function searchDate(e){
  let userValue = e.target.value.toLowerCase();
  let table = ``
  for (let i = 0; i < dataProduct.length; i++) {
    if(dataProduct[i].title.toLowerCase().includes(userValue)  || dataProduct[i].category.toLowerCase().includes(userValue)) {
      table += `<tr>
      <td>${i + 1}</td>
      <th>${dataProduct[i].title}</th>
      <th>${dataProduct[i].price}</th>
      <th>${dataProduct[i].taxes}</th>
      <th>${dataProduct[i].ads}</th>
      <th>${dataProduct[i].discount}</th>
      <th class="text-primary">${dataProduct[i].total}</th>
      <th>${dataProduct[i].category}</th>
      <td> <button onclick="upDateData(${i} , ${dataProduct[i].id})" class="btn btn-warning" id="update">Update</button></td>
      <td> <button onclick="deleteProduct(${dataProduct[i].id})" class="btn btn-danger" id="delete">Delete</button></td>
      </tr>`;
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
search.addEventListener('keyup' ,searchDate )


//clear input
function clearInput() {
  title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}





// dark mode 
function addDarkmodeWidget() {
  new Darkmode().showWidget();
}
window.addEventListener('load', addDarkmodeWidget);
const options = {
  bottom: '64px', // default: '32px'
  right: 'unset', // default: '32px'
  left: '32px', // default: 'unset'
  time: '0.5s', // default: '0.3s'
  mixColor: '#fff', // default: '#fff'
  backgroundColor: '#fff',  // default: '#fff'
  buttonColorDark: '#100f2c',  // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: false, // default: true,
  label: '🌓', // default: ''
  autoMatchOsTheme: true // default: true
}
const darkmode = new Darkmode(options);
darkmode.showWidget();




// Wrap every letter in a span
var textWrapper = document.querySelector('.ml9 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml9 .letter',
    scale: [0, 1],
    duration: 1500,
    elasticity: 600,
    delay: (el, i) => 45 * (i+1)
  }).add({
    targets: '.ml9',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });