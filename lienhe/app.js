// script.js
document.getElementById("sendMessageButton").addEventListener("click", function () {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // Thực hiện xử lý gửi dữ liệu ở đây (có thể sử dụng AJAX để gửi dữ liệu đến máy chủ)

    // Thêm hiệu ứng khi gửi thành công
    var successMessage = document.createElement("div");
    successMessage.className = "alert alert-success animate__animated animate__fadeIn";
    successMessage.innerHTML = "<strong>Gửi thành công!</strong> Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.";
    
    var formContainer = document.querySelector(".col-lg-12");
    formContainer.innerHTML = "";
    formContainer.appendChild(successMessage);
});

// script.js
document.getElementById("sendMessageButton").addEventListener("click", function () {
    // Lấy giá trị từ các trường input
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // Kiểm tra xem có thể thêm xử lý kiểm tra dữ liệu ở đây

    // Lưu thông tin vào Local Storage
    saveToLocalStorage(name, email, message);

    // Hiển thị thông báo (có thể thay thế bằng xử lý gửi dữ liệu đến máy chủ)
    alert("Gửi thành công!\n\nHọ và tên: " + name + "\nEmail: " + email + "\nNội dung: " + message);

    // Reset form sau khi gửi thành công
    document.getElementById("contactForm").reset();
});

// Hàm để lưu thông tin vào Local Storage
function saveToLocalStorage(name, email, message) {
    // Lấy danh sách thông tin đã lưu từ Local Storage (nếu có)
    var existingData = JSON.parse(localStorage.getItem("contactData")) || [];

    // Thêm thông tin mới vào danh sách
    existingData.push({
        name: name,
        email: email,
        message: message
    });

    // Lưu danh sách mới vào Local Storage
    localStorage.setItem("contactData", JSON.stringify(existingData));
}
