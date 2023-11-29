const fs = require('fs/promises');

(async () => {
    // Open the File 'r' flag is for just knwing that we are only attempt to read the file.
    const commandFileHandler = await fs.open('./command.txt', 'r');
    // Watching the file
    const watcher = fs.watch("./command.txt");
    for await (const event of watcher) {
        console.log('The File Changed');
        
        // Getting the size of the file
        const fileSize = (await commandFileHandler.stat()).size();

        // Reading the Content for the file & allocating buffer size
        const content = await commandFileHandler.read(Buffer.alloc(fileSize));
        // console.log(content)
    }
})()