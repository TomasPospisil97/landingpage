//database info
const { Client } = require('pg');
const simpleGit = require('simple-git');

// Database connection parameters
const client = new Client({
    user: 'postgres', 
    host: 'localhost',
    database: 'landing_page', 
    password: 'postgres', 
    port: 5432, 
});

async function connectDatabase() {
    try {
        await client.connect();
        console.log("Connected to the database.");
    } catch (err) {
        console.error("Failed to connect to the database:", err);
    }
}

connectDatabase();

// Initialize simple-git
const git = simpleGit();


//const commitData = [
   // { message: 'first commit', date: '2023-05-02', time: '19:12:00', files_changed: 1, insertions: 0, deletions: 0 },
    //{ message: 'pushed?', date: '2023-05-02', time: '19:14:00', files_changed: 37, insertions: 1409, deletions: 0 },
    //{ message: 'pushed successfully', date: '2023-05-02', time: '19:20:00', files_changed: 1, insertions: 4, deletions: 0 },
    //{ message: 'added calculator to experience', date: '2023-05-04', time: '16:42:00', files_changed: 2, insertions: 5, deletions: 5 },
    //{ message: 'added flappy and calculator option in education for now', date: '2023-05-28', time: '19:07:00', files_changed: 7, insertions: 170, deletions: 5 },
  //  { message: 'added new menu link and flappy+calc independ. sites', date: '2023-06-01', time: '20:53:00', files_changed: 21, insertions: 757, deletions: 32 },
  //  { message: 'h/w adjusted for flappy', date: '2023-06-01', time: '20:57:00', files_changed: 1, insertions: 2, deletions: 2 },
  //  { message: 'added fact generator', date: '2023-06-02', time: '21:58:00', files_changed: 8, insertions: 245, deletions: 1 },
   // { message: 'added password generator', date: '2023-06-06', time: '16:46:00', files_changed: 14, insertions: 300, deletions: 4 },
   // { message: 'image adjusted', date: '2023-06-06', time: '17:54:00', files_changed: 4, insertions: 11, deletions: 5 },
   // { message: 'first page adjusted, propably will transfer all to first page', date: '2023-06-11', time: '20:36:00', files_changed: 3, insertions: 273, deletions: 5 },
   // { message: 'little adjustments', date: '2023-06-30', time: '23:09:00', files_changed: 2, insertions: 42, deletions: 28 },
   // { message: 'landing page reorganized, totally new, for now is under vzdelani part', date: '2023-07-04', time: '19:14:00', files_changed: 5, insertions: 503, deletions: 304 },
  //  { message: 'portfolio and contact adjusted, added the links for the portfolio+each page adjusted, also some ideas commented in the main page', date: '2023-07-08', time: '19:20:00', files_changed: 11, insertions: 317, deletions: 301 },
   // { message: 'added a few adjustments', date: '2023-07-13', time: '13:53:00', files_changed: 2, insertions: 42, deletions: 11 },
  //  { message: 'starting the interactive calendar project, 50% done', date: '2023-07-13', time: '16:26:00', files_changed: 3, insertions: 517, deletions: 0 },
  //  { message: 'left side logic done', date: '2023-07-13', time: '19:21:00', files_changed: 2, insertions: 92, deletions: 9 },
  //  { message: 'right side in the works, mostly css', date: '2023-07-18', time: '20:00:00', files_changed: 2, insertions: 269, deletions: 1 },
  //  { message: 'added more logic for js', date: '2023-07-28', time: '18:51:00', files_changed: 3, insertions: 250, deletions: 6 },
  //  { message: 'added more logic to js, next time will finish the visuals etc.', date: '2023-08-01', time: '20:50:00', files_changed: 2, insertions: 198, deletions: 21 },
  //  { message: 'calendar is ok, only need to realize how to adjust the mediacss, languages added to landing page - need to adjust to work', date: '2023-08-06', time: '23:32:00', files_changed: 8, insertions: 190, deletions: 6 },
  //  { message: 'README.md adjusted, new name for the main page', date: '2023-08-24', time: '19:49:00', files_changed: 11, insertions: 79, deletions: 24 },
  //  { message: 'Added password generator for CLI', date: '2023-08-28', time: '17:17:00', files_changed: 1, insertions: 59, deletions: 0 },
  //  { message: 'adjustments for the About section', date: '2023-11-19', time: '19:30:00', files_changed: 160, insertions: 14360, deletions: 6 },
  //  { message: 'changes', date: '2023-11-19', time: '20:00:00', files_changed: 2, insertions: 1, deletions: 137 }
//];

// insert commit data 
//async function insertCommits(data) {
    //try {
        // Connect to the database
       // await client.connect();

        // Get the current maximum ID
       // const res = await client.query('SELECT MAX(id) AS max_id FROM github_push;');
       // let currentId = res.rows[0].max_id || 0; 

        
       // for (let i = 0; i < commitData.length; i++) {
        //    const { message, date, time, files_changed, insertions, deletions } = commitData[i];
//
           
          //  currentId++;

          //  try {
                // Insert into the github_push table
               // const insertQuery = `
             //       INSERT INTO github_push (id, message, date, time, files_changed, insertions, deletions)
             //       VALUES ($1, $2, $3, $4, $5, $6, $7);
             //   `;
              //  await client.query(insertQuery, [currentId, message, date, time, files_changed, insertions, deletions]);
            //    console.log(`Inserted commit: ${message}`);
        //    } catch (err) {
        //        console.error(`Failed to insert commit: ${message}`, err);
       //     }
      //  }

    //    console.log("Data insertion process completed.");
   // } catch (err) {
   //     console.error("An error occurred while connecting to the database:", err);
   // } finally {
        
    //    await client.end();
   // }
//}

//insertCommits(commitData);



// Function to insert commit data into the database
async function insertCommits(data) {
    try {
        
        const res = await client.query('SELECT MAX(id) AS max_id FROM github_push;');
        let currentId = res.rows[0].max_id || 0; // Start from 0 if no records exist

        
        for (let i = 0; i < data.length; i++) {
            const { message, date, time, files_changed, insertions, deletions } = data[i];

            
            currentId++;

            try {
                
                const insertQuery = `
                    INSERT INTO github_push (id, message, date, time, files_changed, insertions, deletions)
                    VALUES ($1, $2, $3, $4, $5, $6, $7);
                `;
                await client.query(insertQuery, [currentId, message, date, time, files_changed, insertions, deletions]);
                console.log(`Inserted commit: ${message}`);
            } catch (err) {
                console.error(`Failed to insert commit: ${message}`, err);
            }
        }

        console.log("Data insertion process completed.");
    } catch (err) {
        console.error("An error occurred while connecting to the database:", err);
    } finally {
        
        await client.end();
    }
}

// latest commit 
async function fetchLatestCommit() {
    try {
        const log = await git.log({ n: 1 }); 
        if (log.all.length === 0) {
            console.log("No commits found.");
            return null; 
        }

        const commit = log.all[0]; 
        const diff = await git.diff([commit.hash]); 

        const insertions = (diff.match(/\+\S/g) || []).length; 
        const deletions = (diff.match(/-\S/g) || []).length; 
        const filesChanged = commit.files ? commit.files.length : 0; 

        return {
            message: commit.message,
            date: commit.date.split(' ')[0], // date
            time: commit.date.split(' ')[1] || '00:00:00', // time, default to '00:00:00'
            files_changed: filesChanged, // files changed
            insertions: insertions, //  lines added
            deletions: deletions, //  lines removed
        };
    } catch (err) {
        console.error("Error fetching the latest commit from git repository:", err);
        return null;
    }
}

// Main function 
async function insertLatestCommit() {
    const latestCommit = await fetchLatestCommit();
    if (latestCommit) {
        await insertCommits([latestCommit]); 
    } else {
        console.log("No new commits to insert.");
    }
}


setInterval(insertLatestCommit, 60000); 