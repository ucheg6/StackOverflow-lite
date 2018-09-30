const signupUrl = 'https://stackoverflow-litee.herokuapp.com/api/v1/auth/signup';

const fullNameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const registerBtn = document.getElementById('register');

const dangerDiv = document.getElementById('danger-alert');
const successDiv = document.getElementById('success-alert');

const dangerTimeout = () => {
  setTimeout(() => {
    dangerDiv.style.display = 'none';
  }, 3000);
};

const successTimeout = () => {
  setTimeout(() => {
    successDiv.style.display = 'none';
    window.location.href = './login.html ';
  }, 3000);
};

const signUpUser = (e) => {
  e.preventDefault();
  const signupBody = {
    fullName: fullNameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(signupBody),
    headers: {
      'Content-Type': 'application/json',
    },
  };


  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const checkInput = (data) => {
    if (!signupBody.fullName) {
      dangerDiv.innerHTML = `${data.message}`;
      dangerDiv.style.display = 'block';
    }

    if (!signupBody.email) {
      dangerDiv.innerHTML = `${data.message}`;
      dangerDiv.style.display = 'block';
    }

    if (signupBody.email && !emailPattern.test(signupBody.email.trim())) {
      dangerDiv.innerHTML = `${data.message}`;
      dangerDiv.style.display = 'block';
    }
    if (!signupBody.password) {
      dangerDiv.innerHTML = `${data.message}`;
      dangerDiv.style.display = 'block';
    }
    if (signupBody.password && signupBody.password.length < 6) {
      dangerDiv.innerHTML = `${data.errors.password}`;
      dangerDiv.style.display = 'block';
    }
    if (signupBody.password && signupBody.password.length > 15) {
      dangerDiv.innerHTML = `${data.errors.password}`;
      dangerDiv.style.display = 'block';
    }
    if (signupBody.fullName && signupBody.fullName.length < 2) {
      dangerDiv.innerHTML = `${data.errors.fullName}`;
      dangerDiv.style.display = 'block';
    }
    if (signupBody.fullName && signupBody.fullName.length > 20) {
      dangerDiv.innerHTML = `${data.errors.fullName}`;
      dangerDiv.style.display = 'block';
    }
   
  };


  fetch(signupUrl, options)
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      if (data.success === 'false') {
        dangerDiv.innerHTML = '';
        checkInput(data);
        dangerTimeout();
      } else if (data.success === false) {
        dangerDiv.innerHTML = '';
        dangerDiv.innerHTML = `${data.message}`;
        dangerDiv.style.display = 'block';
        dangerTimeout();
      } else {
        fullNameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        successDiv.innerHTML = `${data.message}`;
        successDiv.style.display = 'block';
        successTimeout();
        
      }
    }).catch((error) => {
      console.log(error);
    });
};

registerBtn.addEventListener('click', signUpUser);

