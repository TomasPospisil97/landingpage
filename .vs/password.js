const passwordBox = document.getElementById("password");
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
    passwordBox.value = password;

    /*button.addEventListener('click', createPassword());*/
}

function copyPassword(){
    passwordBox.select();
    document.execCommand("copy");
}

/*button.addEventListener('click', createPassword());*/

    /*var randomFact = facts[Math.floor(Math.random() * facts.length)]*/
    /*output.innerHTML = password;
});*/
