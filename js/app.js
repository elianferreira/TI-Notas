let addTask = document.getElementById('btn-add-task');
let contentCad = document.getElementById('content-cad');
let closeBtnCad = document.getElementById('close-btn-cad');

addTask.addEventListener('click', () => {
  contentCad.classList.toggle('active');
});

closeBtnCad.addEventListener('click', () => {
  contentCad.classList.toggle('active');
});
