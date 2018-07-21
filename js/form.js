class ProductCart {
  constructor() {
    this.products = JSON.parse(localStorage.getItem('PRODUCTS')); 
    this.loadProducts();
   
    }

    
  loadProducts() {
    let productsHtml = this.products.reduce((html, product, index) => html +=  
    this.generateProductHtml(product, index), '');
    document.getElementById('cart_total').setAttribute('value',productsHtml);     
  }

 generateProductHtml(product, index, e) {
   return `
   	<p> Наименование:  ${this.products[index].product_title} </p>
    <p> Цена 1 товара: ${this.products[index].product_price} </p>         
    <p> Количество:  ${this.products[index].product_quantity}</p>
    `;
}
   
}//constructor

let cart;

window.addEventListener("load", () => {
  cart = new ProductCart();
});























// class Carts {
//     constructor() {
//       // this.cart = JSON.parse(localStorage.getItem('Cart'));
//       if(!this.products) {
//         this.products = [];
        
//       }
//       else {
//       	this.products = [
//           {product_title: product_title, product_price: product_price},
          
//         ];
//       }

//       // this.loadCart();
//       this.addEventListeners();
//     }

//     addEventListeners() {
//       $(document).click(function(e){
//       var buttonPressed = e.target.parentElement;
//       var product_title= $(buttonPressed).children(".good_title").text();
//       var product_price= $(buttonPressed).children("input[name='product_price']").val();
//       var product_quantity= $(buttonPressed).children("[name='product_quantity']").val();
//       var good_picture= $(buttonPressed).children(".good_picture").attr('src');
//       var product_id = $(buttonPressed).children("[name='product_id']").val(); 
//       console.log(product_title);
//       console.log(product_price);
//       console.log(product_quantity);
//       console.log(good_picture);
//       console.log(product_id);     
//         });
//      }

          
//       // Add Task
//       // document.getElementsByClassName('.sc-add-to-cart').addEventListener("click", event => {
         
//           // var product_title= $(buttonPressed).children(".good_title").text();
//           // var product_price= $(buttonPressed).children("input[name='product_price']").val();
//           // var product_quantity= $(buttonPressed).children("[name='product_quantity']").val();
//           // var good_picture= $(buttonPressed).children(".good_picture").attr('src');
//           // var product_id = $(buttonPressed).children("[name='product_id']").val(); 
//           // console.log(product_title);
//           // console.log(product_price);
//           // console.log(product_quantity);
//           // console.log(good_picture);
//           // console.log(product_id);

//           // console.log(products);
//     //   });
//     // }

//    } 
  


// let Cart;

// window.addEventListener("load", () => {
//   Cart = new Carts();
// });




