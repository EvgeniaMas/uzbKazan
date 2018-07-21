class ProductCart {
  constructor() {
    this.products = JSON.parse(localStorage.getItem('PRODUCTS'));
    // console.log(this.products);
    if(!this.products) {
      this.products = [];
     } 
    this.totalProductscalc();
    this.addEventListeners(); 

    }  

  totalProductscalc() {   
    let products = this.products;
    let allProducts = 0; 
      $.each(products, function( index, value ) {        
        let total_products = Number(products[index].product_quantity);
        allProducts += total_products;               
      });
      $('.products_quantity').text(allProducts);
    }        

 addEventListeners() {
      let mi = this;
      $('.add_to_cart').click(function(e){
      let buttonClicked = e.target;
      let buttonPressed = e.target.parentElement;
      let product_title= $(buttonPressed).children(".good_title").text();
      let product_price= $(buttonPressed).children("input[name='product_price']").val();
      let product_quantity= $(buttonPressed).children("[name='product_quantity']").val();
      let product_image= $(buttonPressed).children(".good_picture").attr('src');
      let product_id = $(buttonPressed).children("[name='product_id']").val(); 
      let product_quantity_block= $(buttonPressed).children("[name='product_quantity']");

      let newProduct = {
      product_title: product_title,
      product_id: product_id,
      product_price: product_price, 
      product_quantity: product_quantity, 
      product_image: product_image,
       };

      let z = mi.checkDoubles(newProduct);
      mi.addProduct(newProduct, z);
         buttonClicked.innerHTML ="В корзине!";         
         
         setTimeout(function(){buttonClicked.innerHTML ="Купить"}, 1500); 
    
      var counter = JSON.parse(sessionStorage.getItem('COUNTER'));
      console.log(counter);
      if(!counter) {
        counter =1;
      }
      
       if (counter==1) {        
        counter++;
        sessionStorage.setItem('COUNTER', JSON.stringify(counter));
         $('#popup2').show();
         $("#blindLayer").css("display","block");
        }        
       else if(counter>1 && counter <3) {
        
        window.location.href="cart.html";
        counter++;
        sessionStorage.setItem('COUNTER', JSON.stringify(counter));
      }
      else {
        console.log(counter);
      }
     });
  }


 
checkDoubles(newProduct, z) {
    let products = this.products;
    let newProductId = newProduct.product_id;   
      for (let z=0; z<products.length; z++) {
        if (products.length > 0 && products[z].product_id == newProductId ) {
        return z;     
        }//IF     
      } //for 
}// function

addProduct(newProduct, z) {
     let products = this.products;
     let newProductQuantity = newProduct.product_quantity;
     if (z >= 0) {
       let product_quantity = Number(products[z].product_quantity)+ Number(newProductQuantity);
       products[z].product_quantity = product_quantity;
       localStorage.setItem('PRODUCTS', JSON.stringify(this.products));
     }
      else {
      this.products.push(newProduct);
      localStorage.setItem('PRODUCTS', JSON.stringify(this.products));
      }
      this.totalProductscalc();

  } // function     
}//constructor

let cart;

window.addEventListener("load", () => {
  cart = new ProductCart();
});











