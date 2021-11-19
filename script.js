// Assignment Code
var generateBtn = document.querySelector("#generate");
const allowedPasswordCharTypes = {
  lowercase: false,
  uppercase: false,
  numeric: false,
  special: false,
};

const lowercaseOptions = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const uppercaseOptions = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const numericOptions = [1,2,3,4,5,6,7,8,9,0];
const specialOptions = ['@', '%', '+', '\\', '\/', '\'', '!', '#', '$', '^', '?', ':', '.', '(', ')', '{', '}', '[', ']', '~', '-', '_', '`'];


// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// reset all allowedPasswordCharTypes to false
function resetAllowedPasswordCharType() {
  // console.log('WORKING');
  for (const property in allowedPasswordCharTypes) {

    if (allowedPasswordCharTypes[property]) {
      allowedPasswordCharTypes[property] = false;
    }
  }
}

/* 
  if all password character types are NOT allowed, send an alert 
  and reset allowedPasswordCharTypes
  */
  function wereAnyPasswordCharTypesApproved() {
    for (const property in allowedPasswordCharTypes) {
     
      // if at least one character type is true, stop loop early
      if (allowedPasswordCharTypes[property] === true) {
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
    allowedPasswordCharTypes[allowedPasswordCharTypeKey] = true;
  }
}

function generatePassword() {
  // reset types if needed
  resetAllowedPasswordCharType()

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
  checkPasswordCharTypes("lowercase", "lowercase letter?");
  checkPasswordCharTypes("uppercase", "uppercase letter?");
  checkPasswordCharTypes("numeric", "numbers?");
  checkPasswordCharTypes("special", "special characters?");

  console.log("allowedPasswordCharTypes ", allowedPasswordCharTypes);

  const ifAnyPasswordCharTypesApproved = wereAnyPasswordCharTypesApproved();
  
  if (!ifAnyPasswordCharTypesApproved) {
    alert('At least one character type must be allowed!');
    return '';
  }

  // create a large array using the characters approved by the user
  const approvedPasswordCharArray = [];
  for (const property in allowedPasswordCharTypes) {
    // object value is true, append to approvedPasswordCharArray
    if (allowedPasswordCharTypes[property]) {
      const ArrayToAdd = `${property}Options`;
      console.log('ArrayToAdd', [ArrayToAdd]);
      console.log('lowercaseOptions', lowercaseOptions);
      approvedPasswordCharArray.concat(ArrayToAdd);
    }

  }

  console.log(approvedPasswordCharArray);

  // console.log("allowedPasswordCharTypes ", allowedPasswordCharTypes);

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
