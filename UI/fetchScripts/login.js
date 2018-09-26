const loginUrl = 'https://stackoverflow-litee.herokuapp.com/api/v1/auth/login';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const loginBtn = document.getElementById('loginUser');

const dangerDiv = document.getElementById('danger-alert');

const dangerTimeout = () => {
  setTimeout(() => {
    dangerDiv.style.display = 'none';
  }, 3000);
};

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

  const checkInput = (data) => {
    if (data.success === 'false') {
      dangerDiv.innerHTML = `${data.message}`;
      dangerDiv.style.display = 'block';
    }
  };

  fetch(loginUrl, options)
    .then(response => response.json())
    .then((data) => {
      if (data.success === 'false') {
        dangerDiv.innerHTML = '';
        checkInput(data);
        dangerTimeout();
        }
      else {
        localStorage.setItem('authToken', `Bearer ${data.token}`);
       window.location.href = './dashboard.html';
        }

    }).catch((error) => {
      console.log(error);
    });
};

loginBtn.addEventListener('click', loginUser);