const fs = require('fs/promises');

(async () => {
    // Open the File
    fs.open('./command.txt', 'r');
    // Watching the file
    const watcher = fs.watch("./command.txt");
    for await (const event of watcher) {
        console.log('The File Changed');
        // Reading the Content for the file
    }
})()