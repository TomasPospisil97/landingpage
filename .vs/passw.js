const readline = require('readline');

console.log('This is password generator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter "YES" to generate password: ', (userInput) => {
    if (userInput.toUpperCase() === 'YES') {
      createPassword(); 
        } else {
      console.log('Invalid input. Please try again.');
        }
});


const length = 16;
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const specialSymbol = ".,-ů§¨ú()<>*$ß¤×÷#&@đĐ[]\|€_!?";

const allChars = upperCase + lowerCase + numbers + specialSymbol;

function createPassword(){
    let password = "";
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialSymbol[Math.floor(Math.random() * specialSymbol.length)];

    while(length > password.length){
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    console.log(`Generated password: ${password}`);
    generatePasswordAgain();
}

function generatePasswordAgain() {
    rl.question('Enter "YES" to generate a new password, or "EXIT" to quit: ', (userInput) => {
        if (userInput.toUpperCase() === 'YES') {
            createPassword();
            generatePasswordAgain();
        } else if (userInput.toUpperCase() === 'EXIT') {
            console.log('Thank you for using me!');
            rl.close();
        } else {
            console.log('Invalid input. Please try again.');
            generatePasswordAgain();
        }
    });
}





