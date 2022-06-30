function GetCategories(){
    fetch("http://fakestoreapi.com/products/categories")
    .then(function(response){
       return response.json();
    })
    .then(function(data){
        data.unshift("all");
        for(var item of data)
        {
            var option = document.createElement("option");
            option.text = item.toUpperCase();
            option.value = item;

            document.getElementById("lstCategories").appendChild(option);
        }
    })
}

function GetProducts(url){
    document.getElementById("productsContainer").innerHTML="";
    fetch(url)
    .then(function(response){
       return response.json();
    })
    .then(function(data){
        for(var item of data)
        {
            var card = document.createElement("div");
            card.className = "card m-2 p-2";
            card.style.width = "190px";
            card.innerHTML = `
              <img src=${item.image} height="150" class="card-img-top">
              <div class="card-header" style="height:140px">
                 <p>
                   ${item.title}  
                 </p>
              </div>
              <div class="card-body">
                  <dl>
                     <dt>Price</dt>
                     <dd>${item.price}</dd>
                     <dt>Rating</dt>
                     <dd>${item.rating.rate} [${item.rating.count}]</dd>
                  </dl>
              </div>  
              <div class="card-footer">
                <button onclick="AddToCartClick(${item.id})" class="btn btn-danger w-100">
                  <span class="bi bi-cart4"></span> Add to Cart
                </button>
              </div>
            `;
            document.getElementById("productsContainer").appendChild(card);
        }
    })
}


function bodyload(){
    GetCategories();
    GetProducts("http://fakestoreapi.com/products");
    GetCartCount();
}
function CategoryChanged(){

    var categoryName = document.getElementById("lstCategories").value;
    
    if(categoryName=="all")
    {
        GetProducts("http://fakestoreapi.com/products");
    } else {
       GetProducts(`http://fakestoreapi.com/products/category/${categoryName}`);
    }
}
var count = 0;
var cartItems = [];
function GetCartCount(){
   document.getElementById("count").innerHTML = cartItems.length;
}
function AddToCartClick(id){
    fetch(`http://fakestoreapi.com/products/${id}`)
    .then(function(response){
       return response.json();
    })
    .then(function(data){
        cartItems.push(data);
        alert(data.title + " Added to Cart");
        GetCartCount();
    })
}
function LoadCartItems(){
    document.getElementById("cartBody").innerHTML ="";
    for(var item of cartItems)
    {
        var tr = document.createElement("tr");
        var tdTitle = document.createElement("td");
        var tdPrice = document.createElement("td");
        var tdImage = document.createElement("td");

        tdTitle.innerHTML = item.title;
        tdPrice.innerHTML = item.price;

        var img = document.createElement("img");
        img.src=item.image;
        img.width="50";
        img.height="50";

        tdImage.appendChild(img);

        tr.appendChild(tdTitle);
        tr.appendChild(tdPrice);
        tr.appendChild(tdImage);

        document.getElementById("cartBody").appendChild(tr);
    }
}