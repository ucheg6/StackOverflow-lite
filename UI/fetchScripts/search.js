const token = localStorage.getItem('authToken');
let id = getUrlParameter('id');
const searchUrl = `https://stackoverflow-litee.herokuapp.com/api/v1/search`;

function searchFunc(){
  let searchKey = document.getElementById("myInput");
     const searchQuery = {
      searchQuery: searchKey.value
        };
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(searchQuery),
    };
  
    const checkInput = (data) => {
      if (data.status === 'error') {
        dangerDiv.innerHTML = `${data.message}`;
        dangerDiv.style.display = 'block';
      }
    };
  
    fetch(searchUrl, options)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        if (data.status === 'error') {
          checkInput(data);
          dangerTimeout();
         } 

        data.data.map((result) => {
          const { questionbody, questionid } = result;
         console.log(result)
          let ul = document.getElementById('myUL');
          let li = document.createElement('li');
          let a = document.createElement('a');
          a.href=`question.html?id=${questionid}`;
          a.textContent= questionbody;

          while(ul.firstChild) {
            ul.removeChild(ul.firstChild)
          }

           li.appendChild(a);
          ul.appendChild(li);

          

        })

        
      }).catch((error) => {
        console.log(error);
      });

}
