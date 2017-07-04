/*============================================================
VARIABLES
============================================================*/
const fieldset = document.getElementsByTagName("fieldset")[0];
const input = document.getElementById("name");
const selectColor = document.getElementById("color");
const colorOption = document.getElementById("color").children;
const payment = document.getElementById("payment");
const creditCarMethod = document.getElementById("credit-card");
const paypalMethod = document.getElementById("paypal");
const bitcoinMethod = document.getElementById("bitcoin");
const nameField = document.getElementById("name");
const emailField = document.getElementById("mail");
const jobTitle = document.getElementById("title");
const otherTitle = document.getElementById("other-title");
const ccNumField = document.getElementById("cc-num");
const zipField = document.getElementById("zip");
const cvvField = document.getElementById("cvv");
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const nameError = document.createElement("p");
const emailError = document.createElement("p");
const jobError = document.createElement("p");
const ccNumError = document.createElement("p");
const zipError = document.createElement("p");
const cvvError = document.createElement("p");

const basicInfoSection = nameField.parentElement;
const ccParent = document.getElementById("credit-card");
basicInfoSection.insertBefore(nameError, nameField);
basicInfoSection.insertBefore(emailError, emailField);
basicInfoSection.insertBefore(jobError, otherTitle);
ccParent.insertBefore(ccNumError, ccNumField.parentElement);
ccParent.insertBefore(zipError, ccNumField.parentElement);
ccParent.insertBefore(cvvError, ccNumField.parentElement);

let nameValid = false;
let emailValid = false;
let jobValid = true;
let activityValid = false;
let ccNumValid = false;
let zipValid = false;
let cvvValid = false;

/*============================================================
Waiting for the HTML to load to set a focus on the Name input
============================================================*/
document.addEventListener("DOMContentLoaded", () => {
  input.focus();
});

/*============================================================
Function used to create a text area for the Other Job Role
============================================================*/
function addTitle() {
  otherTitle.style.display = "none";

  jobTitle.addEventListener('change', () => {
      if (jobTitle.value === 'other') {
          otherTitle.style.display = "block";
      } else {
          otherTitle.style.display = "none";
          jobValid = true;
      }
  });
}

addTitle();

/*============================================================
Function used to change the display style of the color options depending on the T-shirt design selected
============================================================*/
function colorListChange() {
  const selectDesign = document.getElementById("design");
  const colorDiv = document.getElementById("colors-js-puns");
  const colorDivLabel = colorDiv.getElementsByTagName("label")[0];
  selectColor.style.display = "none";
  colorDivLabel.style.display = "none";

  selectDesign.addEventListener("change", (e) => {
    if(e.target.value === "js puns") {
      selectColor.style.display = "block";
      colorDivLabel.style.display = "block";
      colorOption[3].style.display = "none";
      colorOption[4].style.display = "none";
      colorOption[5].style.display = "none";
      colorOption[0].style.display = "block";
      colorOption[1].style.display = "block";
      colorOption[2].style.display = "block";
    } else if(e.target.value === "heart js"){
      selectColor.style.display = "block";
      colorDivLabel.style.display = "block";
      colorOption[0].style.display = "none";
      colorOption[1].style.display = "none";
      colorOption[2].style.display = "none";
      colorOption[3].style.display = "block";
      colorOption[4].style.display = "block";
      colorOption[5].style.display = "block";
    } else if(e.target.value === "select theme"){
      selectColor.style.display = "none";
      colorDivLabel.style.display = "none";
      colorOption[3].style.display = "none";
      colorOption[4].style.display = "none";
      colorOption[5].style.display = "none";
      colorOption[0].style.display = "none";
      colorOption[1].style.display = "none";
      colorOption[2].style.display = "none";
    }
  });
}

colorListChange();

/*============================================================
Function used to create a budget summary in the activities section depending which ones are selected
============================================================*/
const activities = document.getElementsByTagName("fieldset")[2];
const mainConference = activities.getElementsByTagName("input")[0];
const frameworksConference = activities.getElementsByTagName("input")[1];
const libsConference = activities.getElementsByTagName("input")[2];
const expressConference = activities.getElementsByTagName("input")[3];
const nodeConference = activities.getElementsByTagName("input")[4];
const toolsConference = activities.getElementsByTagName("input")[5];
const npmConference = activities.getElementsByTagName("input")[6];
const budgetText = document.createElement("label");
const activityError = document.createElement('p');
let budget = 0;
let activitiesSelected = 0;
activityError.style.display = "none";

function checkActivities(checkedOption) {
  if (checkedOption.checked) {
      activitiesSelected += 1;
      activityError.remove();
  } else {
      activitiesSelected -= 1;
      activitiesError();
  }
}

function mainConferenceText() {
  mainConference.addEventListener("change", (e) => {
    if(e.target.checked === true) {
      budget += 200;
    } else {
      budget -= 200;
    }
    budgetText.textContent = "Total cost: " + budget + "$";
    activities.appendChild(budgetText);
  });
}

mainConferenceText();

function otherConferenceText(conference) {
  conference.addEventListener("change", (e) => {
    if(e.target.checked === true) {
      budget += 100;
      activitiesSelected += 1;
    } else {
      budget -= 100;
      activitiesSelected -= 1;
    }
    budgetText.textContent = "Total cost: " + budget + "$";
    activities.appendChild(budgetText);
  });
}

otherConferenceText(frameworksConference);
otherConferenceText(libsConference);
otherConferenceText(expressConference);
otherConferenceText(nodeConference);
otherConferenceText(toolsConference);
otherConferenceText(npmConference);

function disable(option) {
  option.disabled = true;
}

function enable(option) {
  option.disabled = false;
}

function checkIfChecked(checkedOption) {
  checkedOption.addEventListener('change', () => {
      checkedOption.setAttribute("checked", "checked");
      checkActivities(checkedOption);
  });
};

checkIfChecked(mainConference);
checkIfChecked(toolsConference);
checkIfChecked(npmConference);

function disableIfChecked(checkedOption, disabledOption) {
  checkedOption.addEventListener("change", () => {
      checkedOption.setAttribute("checked", "checked");
      checkedOption.checked ? disable(disabledOption) : enable(disabledOption);
      checkActivities(checkedOption)
  });
}

disableIfChecked(frameworksConference, expressConference);
disableIfChecked(expressConference, frameworksConference);
disableIfChecked(libsConference, nodeConference);
disableIfChecked(nodeConference, libsConference);

console.log(activitiesSelected);

function activitiesError() {
  if (activitiesSelected === 0) {
    npmConference.parentNode.insertBefore(activityError, npmConference.nextSibling.nextSibling);
    activityError.textContent = 'You need to select an activity';
    activityError.id = 'error-activities';
    activityError.style.display = "block";
    activityValid = false;
  } else {
    activityValid = true;
  }
}

activitiesError();

/*============================================================
Function used to show only the payment method selected and hide the rest
============================================================*/

function paymentMethod() {
  creditCarMethod.style.display = "block";
  paypalMethod.style.display = "none";
  bitcoinMethod.style.display = "none";
  payment.addEventListener("change", (e) => {
    if(e.target.value === "paypal") {
      creditCarMethod.style.display = "none";
      paypalMethod.style.display = "block";
      bitcoinMethod.style.display = "none";
    } else if(e.target.value === "bitcoin") {
      creditCarMethod.style.display = "none";
      paypalMethod.style.display = "none";
      bitcoinMethod.style.display = "block";
    } else {
      creditCarMethod.style.display = "block";
      paypalMethod.style.display = "none";
      bitcoinMethod.style.display = "none";
    }
  });
}

paymentMethod();

/*============================================================
Validating the form
============================================================*/
function ifEmpty(input, errorDiv, errorMessage) {
  if (!input.value) {
      errorMessages(input, errorDiv, errorMessage);
  } else {
      clearErrorMessage(input, errorDiv)
  }
}

function errorMessages(input, errorDiv, errorMessage) {
  errorDiv.textContent = errorMessage;
  errorDiv.className = "error-message";
  input.className = "error";
}

function clearErrorMessage(input, errorDiv) {
  errorDiv.textContent = "";
  errorDiv.className = "";
  input.className = "";
}

function validateName() {
  ifEmpty(nameField, nameError, "You must fill in in your name");
  if (nameField.value) {
      nameValid = true;
  }
}

function validateEmail() {
  if (regex.test(emailField.value)) {
      clearErrorMessage(emailField, emailError);
      emailValid = true;
  } else {
      errorMessages(emailField, emailError, "Please type a valid address eg email@email.com");
      emailValid = false;
  }
}

function validateJob() {
  if (jobTitle.value === 'other' && !otherTitle.value) {
      errorMessages(otherTitle, jobError, "You must fill in your Job Role");
      jobValid = false;
  } else {
      clearErrorMessage(otherTitle, jobError);
      jobValid = true;
  }
}

function validateCCNum() {
  if (isNaN(ccNumField.value)) {
      errorMessages(ccNumField, ccNumError, "Credit Card numbers need to be a number");
  } else if (ccNumField.value.length < 13 || ccNumField.value.length > 16) {
      errorMessages(ccNumField, ccNumError, "Your credit car number needs to be min 13 digits and max 16 digits");
  } else {
      clearErrorMessage(ccNumField, ccNumError);
      ccNumValid = true;
  }
}

function validateZip () {
  if (isNaN(zipField.value)) {
      errorMessages(zipField, zipError, "zips need to be a number");
  } else if (zipField.value.length < 5 || zipField.value.length > 5) {
      errorMessages(zipField, zipError, "Your zip code needs to be min 5 digits and max 5 digits");
  } else {
      clearErrorMessage(zipField, zipError);
      zipValid = true;
  }
}

function validateCvv() {
  if (isNaN(cvvField.value)) {
      errorMessages(cvvField, cvvError, "cvv needs to be a number");
  } else if (cvvField.value.length < 3 || cvvField.value.length > 3) {
      errorMessages(cvvField, cvvError, "Your cvv number needs to be 3 digits");
  } else {
      clearErrorMessage(cvvField, cvvError);
      cvvValid = true;
  }
}

nameField.addEventListener("blur", () => {
    validateName();
});
emailField.addEventListener("blur", () => {
    validateEmail();
});
jobTitle.addEventListener("change", () => {
    if (jobTitle.value === "other") {
        jobValid = false;
    } else {
        clearErrorMessage(otherTitle, jobError);
        jobValid = true;
    }
});
otherTitle.addEventListener("blur", () => {
    validateJob();
});
ccNumField.addEventListener("blur", () => {
    validateCCNum();
});
zipField.addEventListener("blur", () => {
    validateZip();
});
cvvField.addEventListener("blur", () => {
    validateCvv();
});

function validateFrom() {
  activitiesError();
  ifEmpty(nameField, nameError, 'You must fill in in your name');
  ifEmpty(emailField, emailError, 'You must fill in in your email');
  ifEmpty(ccNumField, ccNumError, 'you must add your credit card number or choose another payment type');
  ifEmpty(zipField, zipError, 'you must add your zip number');
  ifEmpty(cvvField, cvvError, 'you must add your cvv number');
  if (emailField.value) {
      validateEmail();
  }
  if (ccNumField.value) {
      validateCCNum();
  }
  if (zipField.value) {
      validateZip();
  }
  if (cvvField.value) {
      validateCvv();
  }
  if (jobTitle.value === 'other') {
      jobValid = false;
      validateJob();
  }
};

submit.addEventListener('click', (e) => {
  let allValid = nameValid && emailValid && jobValid && activityValid && zipValid && ccNumValid && cvvValid;
  if (!allValid) {
      e.preventDefault();
      validateFrom();
  }
});
