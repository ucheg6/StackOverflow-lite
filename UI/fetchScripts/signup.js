const signupUrl = 'https://stackoverflow-litee.herokuapp.com/api/v1/auth/signup';

const fullNameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const registerBtn = document.getElementById('register');

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

  fetch(signupUrl, options)
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      if (data.success === false) {
        console.log(data.message)
      } else {
          window.location.href = './index.html ';
         console.log(data)
       }
    }).catch((error) => {
      console.log(error);
    });
};

registerBtn.addEventListener('click', signUpUser);

