const formContainer = document.getElementById('form-container');
const reservationsContainer = document.getElementById('reservations-container');
const successTemplate = document.getElementById("successTemplate");
const formEmbedTemplate = document.getElementById("formEmbedTemplate");
const formNotWorkingTemplate = document.getElementById("formNotWorkingTemplate");

var tryCount = 0;
var tryThreshold = 2;
var notWorkingButtonExists = false;

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function checkForm() {
  /* Get Values of Form */
  var firstName = document.getElementById("fName").value;
  var maidenName = document.getElementById("mName").value;
  var lastName = document.getElementById("lName").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;

  /* Check if values are present and highlights invalid fields. */
  var valid = true;

  if (!firstName) {
    document.getElementById("fNameField").style.backgroundColor = "rgb(255, 205, 205)";
    valid = false;
  } else {
    document.getElementById("fNameField").style.backgroundColor = "#eaeaea";
  }
  if (!lastName) {
    document.getElementById("lNameField").style.backgroundColor = "rgb(255, 205, 205)";
    valid = false;
  } else {
    document.getElementById("lNameField").style.backgroundColor = "#eaeaea";
  }
  if (!validateEmail(email)) {
    document.getElementById("emailField").style.backgroundColor = "rgb(255, 205, 205)";
    valid = false;
  } else {
    document.getElementById("emailField").style.backgroundColor = "#eaeaea";
  }
  if (!phone) {
    document.getElementById("phoneField").style.backgroundColor = "rgb(255, 205, 205)";
    valid = false;
  } else {
    document.getElementById("phoneField").style.backgroundColor = "#eaeaea";
  }
  

  /* If all fields are valid and present, submits the form. */
  if (valid) {
    /* Attempts to submit form through API, if it fails then will switch to an embed of a google form. */
    if (!submitForm(firstName, maidenName, lastName, email, phone)) {
      tryCount+=1;
      if (tryCount >= tryThreshold && !notWorkingButtonExists) {
        let template = formNotWorkingTemplate.content.cloneNode(true);
        formContainer.appendChild(template);
        notWorkingButtonExists = true;
      }
      alert("Something went wrong! Please fill out this alternative form.")
      useFormEmbed();
      return;
    }
    /* If API successful, shows success message. */
    formContainer.style.display = "none";
    let template = successTemplate.content.cloneNode(true);
    reservationsContainer.appendChild(template);
  } else {
    /* If user enterse data incorrectly or not at all, highlights the input in red. */
    tryCount+=1;
    if (tryCount >= tryThreshold && !notWorkingButtonExists) {
      let template = formNotWorkingTemplate.content.cloneNode(true);
      formContainer.appendChild(template);
      notWorkingButtonExists = true;
    }
  }
}


/* Uses SheetsDB API to add responses to a google sheet */
function submitForm(firstName, maidenName, lastName, email, phone) {
  fetch('https://sheetdb.io/api/v1/w5s9cpcgstmso?sheet=responses', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        data: [
            {
                'First Name': firstName,
                'Maiden Name': maidenName,
                'Last Name': lastName,
                'Email': email,
                'Phone Number' : phone
            }
        ]
    })
})
  .then((response) => {
    if (!response.ok) {
      return false;
    }
  })
  .then((data) => console.log(data));
  return true;
}

/* Enabled a template to use google sheets embed instead of custom form. */
function useFormEmbed() {
  formContainer.style.display = "none";
  let template = formEmbedTemplate.content.cloneNode(true);
  reservationsContainer.appendChild(template);
}

/* Textarea resizing code */
const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = 0;
  this.style.height = (this.scrollHeight) + "px";
}