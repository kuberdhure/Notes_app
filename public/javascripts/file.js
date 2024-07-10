const detailsTextarea = document.getElementById("details");
const editButton = document.getElementById("edit-btn");
const saveButton = document.getElementById("saveButton");
const cancelButton = document.getElementById("cancelButton");
const taskname = document.getElementById('filename')


const prevDetails = detailsTextarea.textContent;

function edit() {
  detailsTextarea.disabled = false;
  saveButton.hidden = false;
  cancelButton.hidden = false;
}

editButton.addEventListener("click", ()=> edit());

saveButton.addEventListener('click',()=>{
  fetch("/save", {
    method: "POST",
    body: JSON.stringify({
      file:taskname.textContent,
      data:detailsTextarea.value
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
  detailsTextarea.disabled = true;
  saveButton.hidden = true;
  cancelButton.hidden = true
})

cancelButton.addEventListener('click',()=>{
  detailsTextarea.value = prevDetails;
  saveButton.hidden = true
  cancelButton.hidden = true
})