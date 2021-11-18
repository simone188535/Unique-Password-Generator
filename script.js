// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// function password
function generatePassword() {
  const passwordSize = prompt("How long would you like you password to be?");
  
  // console.log('passwordSize', passwordSize);
  if (passwordSize < 8) {
    return alert('Too short! Your password needs to be at least 8 characters.');
  } else if (passwordSize > 128) {
    return alert('Too long! Your password needs to be less that 128 characters.');
  } else if (typeof passwordSize !== 'number') {
    return alert('Please enter a number');
  }

  // console.log("hello world");

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
