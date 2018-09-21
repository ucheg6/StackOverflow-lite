const signupUrl = 'https://stackoverflow-litee.herokuapp.com/api/v1/auth/signup';

const fullNameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const registerBtn = document.getElementById('register');

const signUpUser = () => {
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
    const fullNameAlert = document.getElementById('fullname-alert');
    const emailAlert = document.getElementById('email-alert');
    const passwordAlert = document.getElementById('password-alert');

    if (!signupBody.firstName) {
      fullNameAlert.style.display = 'block';
      fullNameAlert.innerHTML = data.body.message;
    }
    if (!signupBody.email) {
      emailAlert.style.display = 'block';
      emailAlert.innerHTML = data.body.message;
    }
    if (!signupBody.password) {
      passwordAlert.style.display = 'block';
      passwordAlert.innerHTML = data.body.message;
    }
  };

  fetch(signupUrl, options)
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      if (data.success === false) {
        checkInput(data);
      } //else {
      //     window.location.href = './index.html ';
      // }
    }).catch((error) => {
      console.log(error);
    });
};

registerBtn.addEventListener('click', signUpUser);

