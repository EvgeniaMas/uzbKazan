class ProductCart {
  constructor() {
    this.products = JSON.parse(localStorage.getItem('PRODUCTS'));
    if(!this.products) {
     document.getElementById('cart').innerHTML = '<h3 class="empty_cart">Ваша корзина пуста!</h3> <br>\
      <a class="back_to_shop_link" href="products.html">Вернуться в каталог </a>'; 
     $('#clear_button').hide();
     $('.total_sum').hide(); 
     $('#goTo_Form').hide();      
     }    
    this.loadProducts();
    this.changeQuantity();
    this.totalPricecalc();
    this.deleteCart();   
    }

  loadProducts() {
    let productsHtml = this.products.reduce((html, product, index) => html +=  
    this.generateProductHtml(product, index), '');
    document.getElementById('cart').innerHTML = productsHtml;
    if(this.products.length ==0) {
      document.getElementById('cart').innerHTML = '<h3 class="empty_cart">Ваша корзина пуста!</h3> <br>\
      <a class="back_to_shop_link" href="products.html">Вернуться в каталог </a>';
     $('#clear_button').hide();
     $('.total_sum').hide(); 
     $('#goTo_Form').hide(); 
     }       
     
  }

    deleteProduct(index) { 
     let mi= this;
     this.products.splice(index, 1);     
     localStorage.setItem('PRODUCTS', JSON.stringify(this.products));     
      window.location.href="cart.html";
      this.loadProducts();
      // console.log(this.products);
         
  }

  changeQuantity(){
$(document).ready(function() {
      $(this).find('.less_goods').click(function () {
        var $input = $(this).parent().find('input[name="product_quantity"]');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
      });
      $(this).find('.more_goods').click(function () {
        var $input = $(this).parent().find('input[name="product_quantity"]');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
      });
    });
    
  }



  deleteCart() {
    let mi =this;
    $('#clear_button').click(function(e){      
    this.products = [];
    localStorage.clear();
    mi.loadProducts();
    window.location.href="cart.html";
    
    });    
  }



  totalPricecalc() {
  let total_sum_blocks = $('.total_price');
    let sum =0;
      $.each(total_sum_blocks, function( index, value ) {
        let prices = Number($(total_sum_blocks[index]).text());
        sum += prices;
      });
     $('.total_sum').text("Всего на сумму: " + sum);

  }

  calculate_price(index) {
  let mi = this; 
  $('.products_in_cart').change((e) => {   
    var current = e.target;
    var current_block = e.target.parentElement.parentElement;
    var currentId = $(current_block).find('.table_product_id').text();
    let currentQuantity = $(current_block).find('.products_in_cart').val();
    var price = $(current_block).find('.product_price').text();
    var current_amount = $(current).val();
    var total_product_price = Number(price) * Number(current_amount);
    $(current_block).find('.total_price').text(total_product_price);
    mi.totalPricecalc();
    let a = mi.findProductToUpdate(currentId);
    mi.updateCart(a, currentQuantity);
    // console.log(mi.products);
  });
}

findProductToUpdate(currentId) {
  let products = this.products;
  // console.log(currentId);
  for (let a=0; a<products.length; a++) {
        if (products[a].product_id == currentId ) {
        return a;     
        }//IF     
    } //f

}

updateCart(a, currentQuantity){
  this.products[a].product_quantity = currentQuantity;
  localStorage.setItem('PRODUCTS', JSON.stringify(this.products));
}


 generateProductHtml(product, index, e) {
   return `
   	<div class="container cart_section">
      <div class="row products_row">
      <div class="col-md-12">
        <div class="col-md-3 cart_structure">
        <p class="product_title"> ${this.products[index].product_title} </p>
                
         </div>
         <div class="col-sm-12 col-md-3 cart_structure">
         <img class="product_in_cart image_product" src= ${this.products[index].product_image} alt="Выбранный товар"/>
         </div>
         <div class="col-md-2 cart_structure">
         
         <span class="more_goods more_goods2 pluses2 table_quantity">+</span>
         <input class="products_in_cart table_quantity" name="product_quantity" min="1" value=${Number(this.products[index].product_quantity)} type="number"
         onchange="cart.calculate_price(${index})">
         <span class="less_goods less_goods2 minus2 table_quantity">-</span>
         <span class="table_product_id hidden">${this.products[index].product_id}</span>
         </div>
         <div class="col-md-2 cart_structure ">
         <p class="product_price"> ${Number(this.products[index].product_price)} </p>
         </div>
         <div class="col-md-2 cart_structure ">
         <p class="data_table total_price"> ${Number(this.products[index].product_price) * Number(this.products[index].product_quantity)} </p>
         <button class="btn delete_product" onclick="cart.deleteProduct(${index})">X</button>
         </div>
       </div> 
      </div>
  </div>
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




