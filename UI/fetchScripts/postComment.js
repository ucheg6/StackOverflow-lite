const token = localStorage.getItem('authToken');
let id = getUrlParameter('id');
const postCommentUrl = `https://stackoverflow-litee.herokuapp.com/api/v1/questions/answers/${id}/comments`;

const commentBody = document.getElementById('commentBody');
const submitComment = document.getElementById('submitComment');

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
    window.location.reload();
  }, 3000);

};

const createComment = (e) => {
   e.preventDefault();
   const newComment = {
    commentBody: commentBody.value
      };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(newComment),
  };

  const checkInput = (data) => {
    if (data.success === 'false') {
      dangerDiv.innerHTML = `${data.message}`;
      dangerDiv.style.display = 'block';
    }
  };

  fetch(postCommentUrl, options)
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      if (data.success === 'false') {
        checkInput(data);
        dangerTimeout();
       } else {
        document.getElementById('commentBody').value = '';
        successDiv.innerHTML = `${data.message}`;
        successDiv.style.display = 'block';
        
       successTimeout();
       }
    }).catch((error) => {
      console.log(error);
    });
};

submitComment.addEventListener('click', createComment);