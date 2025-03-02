const { Client } = require('pg');
const readline = require('readline');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('This function will update your password database on KINGSTON_TP');



// Database connection parameters (same for both local and remote)
const dbConfig = {
    user: 'postgres', 
    host: 'localhost',
    database: 'passwords', 
    password: 'postgres', 
    port: 5432, // Default PostgreSQL port
};

// Function to sync local database to remote database
async function syncDatabases() {
    const localClient = new Client(dbConfig);
    const remoteClient = new Client({ ...dbConfig, host: 'localhost' }); // Change host for remote

    try {
        // Connect to both databases
        await localClient.connect();
        await remoteClient.connect();
        console.log("Connected to both databases.");
        await delay(2000);
        console.log("Checking the data for synchronization.");
        await delay(2000);

        const res = await localClient.query('SELECT * FROM password_details WHERE updated = $1', [true]); // Adjust your query as needed
        const passwords = res.rows;

        const newPasswordsCount = passwords.filter(p => p.isNew).length; // Assuming you have a way to determine new passwords
        const updatedPasswordsCount = passwords.filter(p => p.updated).length; // Assuming you can identify updated passwords

        // Check if there are new or updated passwords
        if (newPasswordsCount === 0 && updatedPasswordsCount === 0) {
            console.log("The database is up to date. No new or updated passwords to synchronize.");
            await delay(2000);
            console.log("Application will now end.");
            await localClient.end();
            await remoteClient.end();
            rl.close(); // Close the readline interface
            return; // Exit the function
        }

        console.log(`You have ${newPasswordsCount} new passwords and ${updatedPasswordsCount} updated passwords to synchronize.`);
        await delay(2000);

        rl.question('Type "YES" to update the remote database: ', async (answer) => {
            if (answer.toUpperCase() === 'YES') {
                // Fetch new or updated passwords from the local database
                const res = await localClient.query('SELECT * FROM password_details WHERE updated = $1', [true]); // Adjust your query as needed
                const passwords = res.rows;
    
                for (const password of passwords) {
                    // Insert or update each password in the remote database
                    await remoteClient.query(
                        'INSERT INTO password_details (id, password, date_of_origin, time_of_origin) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET password = EXCLUDED.password, updated = $5, updated_date = $6',
                        [password.id, password.password, password.date_of_origin, password.time_of_origin, true, new Date()]
                    );
                    console.log(`Synchronized password ID: ${password.id}`);
                    await delay(2000);
                }
    
                console.log("Synchronization completed successfully.");
                await delay(2000);
            } else {
                console.log("Synchronization operation cancelled by the user.");
            }
    
            // Close the database connections after the user input
            await localClient.end();
            await remoteClient.end();
            console.log("Database connections closed.");
            
            // Close the readline interface
            rl.close();
        });
    } catch (err) {
        console.error("Error during synchronization:", err);
    console.log("Database connections closed.");
    rl.question('Enter "EXIT" to quit: ', (userInput) => {
        if (userInput.toUpperCase() === 'EXIT') {
            console.log("Exiting the synchronization process.");
            rl.close();
            return; // Exit the function
        }
    });
}};

// Run the sync function
syncDatabases();