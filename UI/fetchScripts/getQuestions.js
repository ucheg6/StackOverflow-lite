window.onload = () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

  };

  fetch('https://stackoverflow-litee.herokuapp.com/api/v1/questions', options)
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

              <li class="button" id="button-up">
              <a href="question.html?id=${questionid}">
                  <i class="fa fa-share-square"></i> View Question </a>
              </li>

            </ul>
          </div>

        </div>
      </div>`;
        document.getElementById('questionResult').children[1].innerHTML += result;
      });
    }).catch((error) => {
      console.log(error);
    });


    fetch('https://stackoverflow-litee.herokuapp.com/api/v1//questions/mostanswers', options)
    .then(response => response.json())
    .then((data) => {
      console.log(data)
        data.data.map((questions) => {
       
        const { questionid, answersnumber, questionbody, created_at } = questions
       
        console.log(questions)
        let result =
          `  <div class="feed-item" id="mostAnswers">
          
          <div class="post-body">
            <div class="article-title">
              ${questionbody}
            </div>

          </div>
          <div class="feed-item-actions">
            <ul class="action-buttons">

              <li class="button" id="button-up">
                <a href="question.html">
                  <i class="fa fa-share-square"></i> ${ answersnumber} Answers </a>
              </li>

            </ul>
          </div>
        </div>`;
        document.getElementById('mostAnswered').innerHTML += result;
      });
    }).catch((error) => {
      console.log(error);
    });
             

}