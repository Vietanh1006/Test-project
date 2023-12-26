function registerUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const email = document.getElementById("email").value;

    // Kiểm tra tính hợp lệ của dữ liệu
    if (!validateFields(username, password, confirmPassword, email)) {
      return;
    }

    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra xem username hoặc email đã tồn tại chưa
    const isUsernameExist = users.some(user => user.username === username);
    const isEmailExist = users.some(user => user.email === email);

    if (isUsernameExist || isEmailExist) {
      alert("Username or email already exists. Please choose a different one.");
    } else {
      // Thêm người dùng mới vào danh sách
      users.push({ username, password, email });

      // Lưu danh sách người dùng mới vào localStorage
      localStorage.setItem("users", JSON.stringify(users));

      // Hiển thị thông báo thành công
      alert("Registration successful!");
    }
  }

  function validateFields(username, password, confirmPassword, email) {
    // Xóa thông báo lỗi trước khi kiểm tra lại
    resetErrors();

    let isValid = true;

    // Kiểm tra tính hợp lệ của từng trường dữ liệu
    if (username.trim() === "") {
      displayError("usernameError", "Please enter a username.");
      isValid = false;
    }

    if (password.trim() === "") {
      displayError("passwordError", "Please enter a password.");
      isValid = false;
    }

    if (confirmPassword.trim() === "") {
      displayError("confirmPasswordError", "Please confirm your password.");
      isValid = false;
    } else if (password !== confirmPassword) {
      displayError("confirmPasswordError", "Passwords do not match.");
      isValid = false;
    }

    if (email.trim() === "") {
      displayError("emailError", "Please enter an email address.");
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      displayError("emailError", "Please enter a valid email address.");
      isValid = false;
    }

    return isValid;
  }

  function displayError(elementId, errorMessage) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = errorMessage;
  }

  function resetErrors() {
    const errorElements = document.querySelectorAll(".error");
    errorElements.forEach(element => {
      element.textContent = "";
    });
  }