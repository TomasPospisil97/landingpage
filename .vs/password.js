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



async function addPasswordToDatabase(password) {
    // Prompt for password active status
    rl.question('Is the password active? (YES/NO): ', async (activeInput) => {
        const isActive = activeInput.toUpperCase() === 'YES' ? true : false;
        if (!isActive) {
            console.log('Password is not active. Generating a new password...');
            generatePasswordAgain();
            return;
        }
        // Prompt for location of the password
        rl.question('Where is the password active? (max 20 characters): ', async (location) => {
            if (location.length > 20) {
                console.log('Location exceeds 20 characters. Please try again.');
                return addPasswordToDatabase(password); // Retry
            }

            // Get the next id
            const result = await client.query('SELECT MAX(id) FROM passwords');
            const maxId = result.rows[0].max;

            let nextId;
            if (maxId === null) {
                nextId = 1;
            } else {
                nextId = maxId + 1;
            }

            // Insert into passwords table
            await client.query('INSERT INTO passwords (id, active, active_where) VALUES ($1, $2, $3)', [nextId, isActive, location]);

            // Get current date and time
            const dateOfOrigin = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            const timeOfOrigin = new Date().toISOString().split('T')[1].split('.')[0]; // HH:MM:SS

            // Insert into password_details table
            await client.query('INSERT INTO password_details (id, password, date_of_origin, time_of_origin) VALUES ($1, $2, $3, $4)', [nextId, password, dateOfOrigin, timeOfOrigin]);

            console.log('Password added to database successfully.');
            generatePasswordAgain();
        });
    });
}