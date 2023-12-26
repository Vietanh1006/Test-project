document.addEventListener("DOMContentLoaded", function () {
   const btns = document.querySelectorAll(".btn-item");
   const clickCounts = {}; // Dùng để lưu trữ số lần người dùng click cho mỗi sản phẩm

   btns.forEach(function (btn, index) {
      btn.addEventListener("click", function (event) {
         const btnItem = event.target;
         const product = btnItem.parentElement;
         const productName = product.querySelector(".product-name").innerText;

         addToCart(productName, product);
      });
   });

   function addToCart(productName, product) {
      if (!clickCounts[productName]) {
         clickCounts[productName] = 1;
   
         // Nếu chưa có sản phẩm trong giỏ hàng, thêm sản phẩm vào giỏ hàng
         const productImg = product.querySelector("img").src;
         const productPrice = product.querySelector(".product-price").innerText;
         addCart(productImg, productPrice, productName);
   
         // Gọi hàm để tính lại tổng giỏ hàng
         cartTotal();
      } else {
         clickCounts[productName]++;
      }
      let inputElement = document.querySelector(`[data-product-name="${productName}"] input`);
      inputElement.value = clickCounts[productName];
   
      // Gọi hàm để tính lại tổng giỏ hàng
      cartTotal();
   }
   

   function addCart(productImg, productPrice, productName) {
      const addtr = document.createElement("tr");
      const trContent = `
         <td style="display: flex; align-items: center;">
            <img style="width: 100px; height: 100px;" src="${productImg}" alt="${productName}">
            <span class="title">${productName}</span>
         </td>
         <td><span class="price">${productPrice}</span></td>
         <td><input style="width: 40px;" type="number" value="1" min="1" data-product-name="${productName}" class="quantity-input"></td>
         <td style="cursor: pointer;"><span class = "cart-delete">Xóa</span></td>
      `;
      addtr.innerHTML = trContent;

      const cartTable = document.querySelector("tbody");
      cartTable.append(addtr);
   }

   function cartTotal() {
      let cartItems = document.querySelectorAll("tbody tr");
      let totalC = 0;

      cartItems.forEach(function (cartItem) {
         let productPriceText = cartItem.querySelector(".price").textContent;
         let productQuantity = parseInt(cartItem.querySelector(".quantity-input").value);

         let productPrice = parseFloat(productPriceText.replace('$', '').replace(',', ''));
         let totalA = productPrice * productQuantity;

         totalC += totalA;
      });

      let cartTotalA = document.querySelector(".total");
      cartTotalA.innerHTML = "$" + totalC.toFixed(2);
   }

   document.addEventListener("input", function (event) {
      const target = event.target;

      // Kiểm tra xem sự kiện đến từ ô input số lượng hay không
      if (target.classList.contains("quantity-input")) {
         // Gọi hàm để tính lại tổng giỏ hàng
         cartTotal();
      }
   });
});

 // Thêm sự kiện click cho nút "Xóa"
 document.addEventListener("click", function (event) {
   if (event.target.classList.contains("cart-delete")) {
      let cartDelete = event.target.parentElement;
      let cartE = cartDelete.parentElement;

      let productPriceText = cartE.querySelector(".price").textContent;
      let productQuantity = parseInt(cartE.querySelector(".quantity-input").value);

      // Lấy giá trị từ chuỗi và chuyển đổi thành số
      let productPrice = parseFloat(productPriceText.replace('$', '').replace(',', ''));

      let totalA = productPrice * productQuantity;
      cartE.remove();

      updateTotal(-totalA);
   }
});

function updateTotal(amount) {
   let cartTotalA = document.querySelector(".total");

   let currentTotal = parseFloat(cartTotalA.innerHTML.replace('$', ''));

   let newTotal = currentTotal + amount;
   cartTotalA.innerHTML = "$" + newTotal.toFixed(2);
}

// BUTTON ĐẶT HÀNG
document.addEventListener("DOMContentLoaded", function () {
   const btnOrder = document.querySelector(".btn-order");
   const totalSpan = document.querySelector(".total");

   btnOrder.addEventListener("click", function () {
       // Lấy danh sách sản phẩm từ tbody
       const tbody = document.querySelector("tbody");
       const products = tbody.querySelectorAll("tr");

       // Khởi tạo biến tổng tiền
       let totalPrice = 0;

       // Duyệt qua từng sản phẩm trong danh sách
       products.forEach(function (product) {
           // Lấy giá và số lượng từ hàng sản phẩm
           const price = parseFloat(product.querySelector("td:nth-child(2)").textContent);
           const quantity = parseInt(product.querySelector("td:nth-child(3) input").value);

           // Tính tổng tiền cho sản phẩm hiện tại
           const productTotal = price * quantity;

           // Cộng dồn vào tổng tiền
           totalPrice += productTotal;
       });

       // Hiển thị tổng tiền
       totalSpan.textContent = totalPrice;

       // Lưu thông tin đơn hàng vào Local Storage (hoặc thực hiện các bước khác tùy thuộc vào yêu cầu của bạn)
       const orderInfo = {
           products: Array.from(products).map(product => ({
               name: product.querySelector("td:nth-child(1)").textContent.trim(),
               price: parseFloat(product.querySelector("td:nth-child(2)").textContent),
               quantity: parseInt(product.querySelector("td:nth-child(3) input").value),
           })),
           totalPrice: totalPrice,
       };

       localStorage.setItem("orderInfo", JSON.stringify(orderInfo));

       // Hiển thị thông báo đặt hàng thành công (hoặc thực hiện các bước khác tùy thuộc vào yêu cầu của bạn)
       alert("Đơn hàng đã được đặt thành công!");
   });
});

// NÚT THOÁT
document.addEventListener("click", function (event) {
   // Kiểm tra nếu sự kiện được kích hoạt bởi nút "x"
   if (event.target.classList.contains("fa-xmark")) {
       // Lấy phần tử cha (phần tử td) của nút "Xóa"
       let cartDelete = event.target.parentElement;

       // Lấy phần tử cha (phần tử tr) của phần tử td
       let cartE = cartDelete.parentElement;

       // Xóa phần tử tr khỏi DOM
       cartE.remove();

       // Gọi hàm để tính lại tổng giỏ hàng sau khi xóa
       cartTotal();
   }
});


// ẩn hiện thẻ div
let links = document.getElementsByClassName("product-thumb");
let myDiv = document.getElementsByClassName("cart")[0]; 

function toggleDiv(event) {
   event.preventDefault();
   if (myDiv.style.display === "none" || myDiv.style.display === "") {
      myDiv.style.display = "block";
   } else {
      myDiv.style.display = "none";
   }
}
for (let i = 0; i < links.length; i++) {
   links[i].addEventListener("click", toggleDiv);
}
