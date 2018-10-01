const modal = document.getElementById('entryModal');
const btn = document.getElementById('postQuestion');
const span = document.getElementsByClassName('close')[0];

btn.onclick = () => {
  modal.style.display = 'block';
  console.log('clicked')
}

span.onclick = () => {
   modal.style.display = 'none';
}

window.onclick = (event) => {
 event.preventDefault()
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}