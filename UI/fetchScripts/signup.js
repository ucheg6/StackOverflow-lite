const signupUrl = 'https://stackoverflow-litee.herokuapp.com/api/v1/auth/signup';

const fullNameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const registerBtn = document.getElementById('register');

const dangerDiv = document.getElementById('danger-alert');

const dangerTimeout = () => {
  setTimeout(() => {
    dangerDiv.style.display = 'none';
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
  
  const checkInput = (data) => {
    if (data.success === 'false') {
      dangerDiv.innerHTML = `${data.message}`;
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
        } else {
          window.location.href = './index.html ';
      }
    }).catch((error) => {
      console.log(error);
    });
};

registerBtn.addEventListener('click', signUpUser);

