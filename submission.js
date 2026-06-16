const form = document.getElementById('submissionForm')
const overlayBackground = document.getElementById('doneOverlay');
const overlayMessage = document.querySelector('.overlay');
const btnSubmit = document.querySelector(".btn-submit");

const errorEmail = document.getElementById("error-email");
const errorTitle = document.getElementById("error-title");
const errorDesc = document.getElementById("error-description");
const errorTags = document.getElementById("error-tags");
const errorUpload = document.getElementById("error-upload-file");
const errorRadio = document.getElementById("error-radio");

const fileInput = document.getElementById("upload-file");
const fileLabel = document.querySelector(".custom-file-upload");

function isEmpty(value){
  return value.trim() === "";
}

function isValidEmail(value){
  return value.includes("@") && value.includes(".");
}

function isValidTag(value){
    return value.includes("#")
}

function isSpecialChar(value){
    const SpecialChar = "!@#$%^&*()_-+=~`{}[]\|;:'<>,.?/"
    for(let i = 0 ; i <value.length ; i++){
        if(SpecialChar.includes(value[i])){
            return true;
        }
    }
    return false;
}

function validate(){
    let valid = 0;
    
    const email = form.email.value
    if(isEmpty(email)){
        errorEmail.textContent = "E-mail cannot be EMPTY!"
    }
    else if(!isValidEmail(email)){
        errorEmail.textContent = "E-mail is NOT valid!"
    }
    else{
        errorEmail.textContent = ""
        valid = valid+1;
    }

    const title = form.title.value
    if(isEmpty(title)){
        errorTitle.textContent = "Title cannot be EMPTY!"
    }
    else if(isSpecialChar(title)===true){
        errorTitle.textContent = "Title must NOT contain special characters!"
    }
    else{
        errorTitle.textContent = ""
        valid = valid+1;
    }

    const desc = form.description.value
    if(isEmpty(desc)){
        errorDesc.textContent = "Description cannot be EMPTY!"
    }
    else{
        errorDesc.textContent = ""
        valid = valid+1;
    }
    
    
    const tags = form.tags.value
    if(isEmpty(tags)){
        errorTags.textContent = "Tags cannot be EMPTY!"
    }
    else if(!isValidTag(tags)){
        errorTags.textContent = "Tags are NOT valid!"
    }
    else{
        errorTags.textContent = ""
        valid = valid+1;
    }
    
    const file = fileInput.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 2*1024*1024;

    if (!file) {
        errorUpload.textContent = "Please upload a file!";
    }
    else if (!allowedTypes.includes(file.type)) {
        errorUpload.textContent = "Only JPG, PNG, and GIF files are allowed!";
    }
    else if (file.size > maxSize) {
        errorUpload.textContent = "File size must be under 2MB.";
    }
    else{
        errorUpload.textContent = ""
        valid = valid+1;
    }

    const selected = document.querySelector('input[name="choice"]:checked');
    if (!selected) {
        errorRadio.textContent = "Please select an option!";
    }
    else{
        errorRadio.textContent = ""
        valid = valid+1;
    }

    if(valid == 6){
        return true;
    }
    return false;
}

fileInput.addEventListener("change", () => {
    if(fileInput.files.length > 0) {
        fileLabel.textContent = fileInput.files[0].name;
    }
    else {
        fileLabel.textContent = "No file attached";
    }
});

form.addEventListener("input", validate);

form.addEventListener("submit", function(e){
  e.preventDefault();
  if(!validate()) return;
  console.log("Success!");
  overlayBackground.style.display = "block";
  overlayMessage.style.display = "flex";
});
