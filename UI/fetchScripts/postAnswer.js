const token = localStorage.getItem('authToken');
let id = getUrlParameter('id');
const postAnswerUrl = `https://stackoverflow-litee.herokuapp.com/api/v1/questions/${id}/answers`;

const answerBody = document.getElementById('answerBody');
const submitAnswer = document.getElementById('submitAnswer');

const successDiv = document.getElementById('success-alert');
const dangerDiv = document.getElementById('danger-alert');

const dangerTimeout = () => {
  setTimeout(() => {
    dangerDiv.style.display = 'none';
  }, 3000);
};
const successTimeout = () => {
  setTimeout(() => {
    successDiv.style.display = 'none';
  }, 3000);
};

const createAnswer = (e) => {
   e.preventDefault();
   const newAnswer = {
    answer: answerBody.value
      };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(newAnswer),
  };

  const checkInput = (data) => {
    if (data.success === 'false') {
      dangerDiv.innerHTML = `${data.message}`;
      dangerDiv.style.display = 'block';
    }
  };

  fetch(postAnswerUrl, options)
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      if (data.success === 'false') {
        checkInput(data);
        dangerTimeout();
       } else {
        document.getElementById('answerBody').value = '';
        successDiv.innerHTML = `${data.message}`;
        successDiv.style.display = 'block';
       successTimeout();
       }
    }).catch((error) => {
      console.log(error);
    });
};

submitAnswer.addEventListener('click', createAnswer);