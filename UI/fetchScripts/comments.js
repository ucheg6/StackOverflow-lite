window.onload = () => {
  loadComment();
 
}                

function loadComment(){
  
  const token = localStorage.getItem('authToken');
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },

  };

  let id = getUrlParameter('id');
  fetch(`https://stackoverflow-litee.herokuapp.com/api/v1/questions/answers/${id}/comments`, options)
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      if(data.message === 'There are no comments yet for this answer!') {
        document.getElementById('post_comments').innerHTML =data.message;
      }
     
      data.data.map((comments) => {
       
        const {commentid, fullname, commentbody, created_at, } = comments

       
        
       let result = `
            <div class="post-body">
            <div class="article-author">
              ${fullname}
              <span class="light-grey">
                commented.
              </span>
              <span class="post-time">
              ${formatTime(created_at)}
              </span>
            </div>
            <div class="article-preview">
              ${commentbody}
              <br/>
              <br/> I decided to use the Quora feed page because it would force me to create a navigation bar, a grid ...
              <a href="#" class="more-link">
                (more)
              </a>
            </div>
          </div>
        <!-- post body -->
        <div class="feed-item-actions">
        <ul class="action-buttons"></ul></div>

        `
      document.getElementById('post_comments').innerHTML +=result;
      });
    }).catch((error) => {
      console.log(error);
    });
}

