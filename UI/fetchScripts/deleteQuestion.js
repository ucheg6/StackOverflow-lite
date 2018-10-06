const deleteQuestion = (id) => {
  
  const token = localStorage.getItem('authToken');
  const deleteUrl = `https://stackoverflow-litee.herokuapp.com/api/v1/questions/${id}`; 

  const deleteBtn = document.getElementById('deleteBtn');
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  };

  fetch(deleteUrl, options)
    .then(response => response.json())
    .then((data) => {
          
      if (data.success === 'false') {
        dangerDiv.innerHTML = `${data.message}`;
        dangerDiv.style.display = 'block';
        dangerTimeout();
      } else {
        successDiv.innerHTML = `${data.message}`;
        successDiv.style.display = 'block';
        successTimeout();
      }


    }).catch((error) => {
      console.log(error);
    });

  };