const loginUrl = 'https://stackoverflow-litee.herokuapp.com/api/v1/auth/login';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const loginBtn = document.getElementById('loginUser');

const loginUser = (e) => {
  e.preventDefault();
  const loginBody = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(loginBody),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  fetch(loginUrl, options)
    .then(response => response.json())
    .then((data) => {
      if (data.success === false) {
        console.log(data.message)
      }
      if (data.success === true) {
        localStorage.setItem('authToken', `Bearer ${data.token}`);
       window.location.href = './dashboard.html';
       console.log(data)
      }

    }).catch((error) => {
      console.log(error);
    });
};

loginBtn.addEventListener('click', loginUser);