// Assignment Code
var generateBtn = document.querySelector("#generate");
const allowedPasswordCharTypes = {
  lowercase: false,
  uppercase: false,
  numeric: false,
  special: false,
};

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// reset all allowedPasswordCharTypes to false
function resetAllowedPasswordCharType() {
  for (const property in allowedPasswordCharTypes) {

    console.log('allowedPasswordCharTypes[property]', allowedPasswordCharTypes[property]);
    if (allowedPasswordCharTypes[property]) {
      allowedPasswordCharTypes[property] = false;
    }
  }
}

function checkPasswordCharTypes(allowedPasswordCharTypeKey, confirmMsg) {
  const isCharacterTypeAllowed = confirm(
    `Should your password contain ${confirmMsg}`
  );

  // if the user approves of the confirmation message, change objs value to true
  if (isCharacterTypeAllowed) {
    allowedPasswordCharTypes[allowedPasswordCharTypeKey] = true;
  }
}

function generatePassword() {
  const passwordSize = prompt("How long would you like you password to be?");
  const parsedPasswordSize = parseInt(passwordSize) || "";
  // console.log('passwordSize', passwordSize);
  // check password size
  if (!Number.isInteger(parsedPasswordSize)) {
    // any provided value that is not a number is not allowed
    return alert("Please enter a number");
  } else if (parsedPasswordSize < 8) {
    return alert("Too short! Your password needs to be at least 8 characters.");
  } else if (parsedPasswordSize > 128) {
    return alert(
      "Too long! Your password needs to be less that 128 characters."
    );
  }

  /*
    check if the user is okay with their password having these types: 
    lowercase, uppercase, numeric, and/or special characters.
  */
  checkPasswordCharTypes(
    "lowercase",
    "lowercase letter?"
  );
  checkPasswordCharTypes(
    "uppercase",
    "uppercase letter?"
  );
  checkPasswordCharTypes(
    "numeric", 
    "numbers?"
  );
  checkPasswordCharTypes(
   "special",
    "special characters?"
  );

  console.log("allowedPasswordCharTypes ",allowedPasswordCharTypes);

  /* 
  if all password character types are NOT allowed, send an alert 
  and reset allowedPasswordCharTypes
  */
 // !! make a function for this
  for (const property in allowedPasswordCharTypes) {
    // console.log(`${property}: ${object[property]}`);
    if (allowedPasswordCharTypes[property] === true) {
      break;
    }

    // add after for loop
    // alert('At least one character type must be allowed!');
    // resetAllowedPasswordCharType();
    // return;
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
