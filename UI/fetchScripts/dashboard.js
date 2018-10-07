window.onload = () => {
  user();
  userQuestions();
  
  };

  
const user = () => {
  const token = localStorage.getItem('authToken');

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },

  };

  fetch('https://stackoverflow-litee.herokuapp.com/api/v1/user', options)
    .then(response => response.json())
    .then((data) => {
      const user = data.user[0].fullname;
      const questionCount = data.user[0].questioncount;
      const answerCount = data.user[0].answercount;


      document.getElementById('user_name').textContent = user;
      document.getElementById('questCount').textContent = questionCount;
      document.getElementById('ansCount').textContent = answerCount;

    }).catch((error) => {
      console.log(error);
    });
}


  const userQuestions = () =>  {
    
  const token = localStorage.getItem('authToken');

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
  
    };
    
    fetch('https://stackoverflow-litee.herokuapp.com/api/v1/user/questions', options)
    .then(response => response.json())
    .then((data) => {
      data.data.map((questions) => {
  
        const { questionid, userid, fullname, questiontopic, questionbody, created_at } = questions
  
        let result =
          ` <div class="feed">
        <div class="feed-item">
          <div class="post-title">
            <span class="user-name">
             ${fullname}
            </span>
            <span class="light-grey">
              asked a question.
            </span>
            <span class="post-time">
            ${formatTime(created_at)}
            </span>
          </div>
  
          <div class="feed-user-pic">
            <img class="pic" src="images/1.jpg" />
          </div>
  
          <div class="post-body">
            <div class="article-title">
            ${questionbody}
            </div>
  
          </div>
          <div class="feed-item-actions">
            <ul class="action-buttons">
  
              <li class="button" id="deleteBtn" onclick="deleteQuestion(${questionid});">
              <a href="dashboard.html?id=${questionid}">
                  <i class="fa fa-trash" data-id="${questionid}"></i> Delete </a>
              </li>
  
            </ul>
          </div>
  
        </div>
      </div>`;
        document.getElementById('result').children[1].innerHTML += result;
      });
    }).catch((error) => {
      console.log(error);
    });
  }
  