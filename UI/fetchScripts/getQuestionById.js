window.onload = () => {
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
      data.data.map((questions) => {
        console.log(data)
        const { questionid, userid, fullname, questiontopic, questionbody, created_at } = questions

        console.log(questions)
        let result =
          ` <div id="questionsResult" class="feed"> 
          <div class="feed-item">
          <div class="post-title">
            <span class="user-name">
            ${fullname}
            </span>
  
            <span class="post-time">
              2m ago
            </span>
          </div>
  
          <div class="feed-user-pic">
            <img class="pic" src="images/1.jpg" />
          </div>
  
  
          <div class="article-title">
          ${questionbody}
          </div>
          <div class="post-body">
  
            <div class="article-author">
              Santiago Garza
  
              <span class="light-grey">
                answered.
              </span>
              <span class="post-time">
                2m ago
              </span>
            </div>
            <div class="article-preview">
              This is my first attempt at using CSS to create a page.
              <br/>
              <br/> I decided to use the Quora feed page because it would force me to create a navigation bar, a grid ...
              <a href="/" class="more-link">
                (more)
              </a>
            </div>
          </div>
          <div class="feed-item-actions">
            <ul class="action-buttons">
              <li class="button" id="button-up">
                <i class="fa fa-hand-point-up"></i> Upvote
              </li>
              <li class="button" id="button-up">
                <i class="fa fa-hand-point-down"></i> downvote
              </li>
              <li class="button" id="button-up">
                <i class="fa fa-edit"></i> Comment
              </li>
              <li class="button" id="button-up">
                <i class="fa fa-check-square"></i> accept
              </li>
  
            </ul>
          </div>
           
          <div class="">
            <form>
              <textarea name="" id="" cols="20" class="form-input" rows="7" placeholder="Enter your answer here"></textarea>
              <button class="search-btn fa fa-edit"> Submit Answer</button>
  
            </form>
          </div>
      
        </div>
        </div> `;
  
        document.getElementById('questionsResult').innerHTML = result;
        });
    }).catch((error) => {
      console.log(error);
    });
}                