// Assignment Code
var generateBtn = document.querySelector("#generate");
const allowedPasswordCharTypes = [
  {
    type: 'lowercase',
    inUse: false,
    Options: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  },
  {
    type: 'uppercase',
    inUse: false,
    Options: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  },
  {
    type: 'numeric',
    inUse: false,
    Options: [1,2,3,4,5,6,7,8,9,0]
  },
  {
    type: 'special',
    inUse: false,
    Options: ['@', '%', '+', '\\', '\/', '\'', '!', '#', '$', '^', '?', ':', '.', '(', ')', '{', '}', '[', ']', '~', '-', '_', '`']
  }
];




// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// reset all allowedPasswordCharTypes to false
function resetAllowedPasswordCharType() {
  for (const property of allowedPasswordCharTypes) {

    if (property.inUse) {
      property.inUse = false;
    }
  }
}

/* 
  if all password character types are NOT allowed, send an alert 
  and reset allowedPasswordCharTypes
  */
  function wereAnyPasswordCharTypesApproved() {
    for (const property of allowedPasswordCharTypes) {
     
      // if at least one character type is true, stop loop early
      if (property.inUse) {
        return true;
      }
    }

    return false;
  }


function checkPasswordCharTypes(allowedPasswordCharTypeKey, confirmMsg) {
  const isCharacterTypeAllowed = confirm(
    `Should your password contain ${confirmMsg}`
  );

  // if the user approves of the confirmation message, change objs value to true
  if (isCharacterTypeAllowed) {
    allowedPasswordCharTypes[allowedPasswordCharTypeKey].inUse = true;
  }
}

function generatePassword() {
  // reset types if needed
  resetAllowedPasswordCharType();

  const passwordSize = prompt("How long would you like you password to be?");
  const parsedPasswordSize = parseInt(passwordSize) || "";

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
  checkPasswordCharTypes(0, "lowercase letter?");
  checkPasswordCharTypes(1, "uppercase letter?");
  checkPasswordCharTypes(2, "numbers?");
  checkPasswordCharTypes(3, "special characters?");

  const ifAnyPasswordCharTypesApproved = wereAnyPasswordCharTypesApproved();
  
  if (!ifAnyPasswordCharTypesApproved) {
    alert('At least one character type must be allowed!');
    return '';
  }

  // create a large array using the characters approved by the user
  let approvedPasswordChars = [];
  for (const property of allowedPasswordCharTypes) {
   
    // if object value is true, append to approvedPasswordChars
    if (property.inUse) {
      approvedPasswordChars = approvedPasswordChars.concat(property.Options);
    }

  }

  // select random password using the approved characters
  let password = '';
  for (let i = 0; i < parsedPasswordSize; i++) {

    const random = Math.floor(Math.random() * approvedPasswordChars.length);
    password += approvedPasswordChars[random];
  }

  return password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
