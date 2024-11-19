const readline = require('readline');
const { Client } = require('pg');

console.log('This is password generator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// PostgreSQL client setup
const client = new Client({
    user: 'postgres', // Replace with your database username
    host: 'localhost',
    database: 'passwords', // Replace with your database name
    password: 'postgres', // Replace with your database password
    port: 5432, // Default PostgreSQL port
});

client.connect(); // Connect to the database

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
     // Add the password to the database
     addPasswordToDatabase(password);

    //generatePasswordAgain();
}

async function addPasswordToDatabase(password) {
    // Prompt for password active status
    rl.question('Is the password active, updated, or none? (ACTIVE/UPDATED/NONE): ', async (activeInput) => {
        const isActive = activeInput.toUpperCase() === 'ACTIVE';
        const isUpdated = activeInput.toUpperCase() === 'UPDATED';
        const isNone = activeInput.toUpperCase() === 'NONE';

        if (isNone) {
            console.log('Password is not active. Generating a new password...');
            generatePasswordAgain();
            return;
        }

        if (isUpdated) {
            rl.question('Enter the ID of the password to update: ', async (id) => {
                const updatedId = parseInt(id);

                // Update the password in the database
                await client.query('UPDATE password_details SET updated = $1, updated_date = $2, new_password = $3 WHERE id = $4', [true, new Date(), password, updatedId]);

                console.log('Password updated successfully.');
                generatePasswordAgain();
            });
            return;
        }

        if (isActive) {
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
                await client.query('INSERT INTO passwords (id, active, active_where) VALUES ($1, $2, $3)', [nextId, true, location]);

                // Get current date and time
                const dateOfOrigin = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
                const timeOfOrigin = new Date().toISOString().split('T')[1].split('.')[0]; // HH:MM:SS

                // Insert into password_details table
                await client.query('INSERT INTO password_details (id, password, date_of_origin, time_of_origin) VALUES ($1, $2, $3, $4)', [nextId, password, dateOfOrigin, timeOfOrigin]);

                console.log('Password added to database successfully.');
                generatePasswordAgain();
            });
        }
    });
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





