const postQuestionUrl = 'https://stackoverflow-litee.herokuapp.com/api/v1/questions';

const questionTopic = document.getElementById('questionTopic');
const questionBody = document.getElementById('questionBody');
const submitQuestion = document.getElementById('submitQuestion');

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

const createQuestion = (e) => {
  e.preventDefault();
   const newQuestion = {
    questionTopic: questionTopic.value,
    questionBody: questionBody.value,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(newQuestion),
  };

  const checkInput = (data) => {
    if (data.success === 'false') {
      dangerDiv.innerHTML = `${data.message}`;
      dangerDiv.style.display = 'block';
    }
  };

  fetch(postQuestionUrl, options)
    .then(response => response.json())
    .then((data) => {
      if (data.success === 'false') {
        checkInput(data);
        dangerTimeout();
       } else {
        document.getElementById('questionTopic').value = '';
        document.getElementById('questionBody').value = '';
        successDiv.innerHTML = `${data.message}`;
        successDiv.style.display = 'block';
       successTimeout();
       }
    }).catch((error) => {
      console.log(error);
    });
};

submitQuestion.addEventListener('click', createQuestion);

