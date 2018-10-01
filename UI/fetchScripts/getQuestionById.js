window.onload = () => {
  loadPage();
 
}                

function accept(answerid){
  let id = getUrlParameter('id');

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  
  fetch(`https://stackoverflow-litee.herokuapp.com/api/v1/questions/${id}/answers/${answerid}`, options) 
  .then(response => response.json())
  .then((data) => {
    if(data){
      console.log(data);
      const { success, message}= data;
      document.getElementById('post_answers').innerHTML = '';
     loadPage();
    }
  })
  .catch((error) => {
    console.log(error);
  });
}

function upvote(answerid){
  let id = getUrlParameter('id');

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },

  };
  
  fetch(`https://stackoverflow-litee.herokuapp.com/api/v1/questions/${id}/answers/${answerid}/upvotes`, options) 
  .then(response => response.json())
  .then((data) => {
    if(data){
      const { success, message}= data;
      window.location.reload();
    }
   
  })
  .catch((error) => {
    console.log(error);
  });
}

function downvote(answerid){
  let id = getUrlParameter('id');

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },

  };
  
  fetch(`https://stackoverflow-litee.herokuapp.com/api/v1/questions/${id}/answers/${answerid}/downvotes`, options) 
  .then(response => response.json())
  .then((data) => {
    if(data){
      const { success, message}= data;
      window.location.reload();

    }
  })
  .catch((error) => {
    console.log(error);
  });
}

function is_accepted(value){
  if(value && value === true){
    return '<i style="color:purple "class="fa fa-check-square"></i> accepted';
  }else{
   return'<i class="fa fa-check-square"></i> accept';
  }
}


function loadPage(){
  
  const token = localStorage.getItem('authToken');
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },

  };

  let id = getUrlParameter('id');
  fetch(`https://stackoverflow-litee.herokuapp.com/api/v1/questions/${id}`, options)
    .then(response => response.json())
    .then((data) => {
      
      const author = data.data[0].fullname;
      const questionBody = data.data[0].questionbody;

      document.getElementById('author_name').innerHTML = author;
      document.getElementById('question_body').innerHTML = questionBody;
      data.answers.map((answers) => {
       
        const {answerid, fullname, answer, downvotes, upvotes, is_preferred, created_at, } = answers

       
        
       let result = `
            <div class="post-body">
            <div class="article-author">
              ${fullname}
              <span class="light-grey">
                answered.
              </span>
              <span class="post-time">
                2m ago
              </span>
            </div>
            <div class="article-preview">
              ${answer}
              <br/>
              <br/> I decided to use the Quora feed page because it would force me to create a navigation bar, a grid ...
              <a href="#" class="more-link">
                (more)
              </a>
            </div>
          </div>
          <!-- post body -->

          <!-- reactions -->
          <div class="feed-item-actions">
            <ul class="action-buttons">
              <li class="button" id="button-up" onclick="upvote(${answerid});">
                <i class="fa fa-hand-point-up" id="upvoter" data-id="${answerid}"></i> ${upvotes}
              </li>
              <li class="button" id="button-up" onclick="downvote(${answerid});">
                <i class="fa fa-hand-point-down" id="downvoter"></i> ${downvotes}
              </li>
              <li class="button" id="button-up">
                <i class="fa fa-edit"></i> Comments
              </li>
              <li class="button" id="button-up" onclick="accept(${answerid})";>
                ${ is_accepted(is_preferred)}
              </li>
            </ul>
          </div>
        `
      document.getElementById('post_answers').innerHTML +=result;
      });
    }).catch((error) => {
      console.log(error);
    });
}

