const fs = require('fs/promises');

(async () => {
    // Open the File 'r' flag is for just knwing that we are only attempt to read the file.
    const commandFileHandler = await fs.open('./command.txt', 'r');
    // Watching the file
    const watcher = fs.watch("./command.txt");
    for await (const event of watcher) {
        console.log('The File Changed');
        
        // Getting the size of the file
        const fileSize = (await commandFileHandler.stat()).size;

        // Create Buffer, Offset, Lenght, Position. Because they are and arg of read fun
        const buff = Buffer.alloc(fileSize);
        const offset = 0;
        const length = buff.byteLength;
        const position = 0;

        // Reading the Content for the file & allocating buffer size
        const content = await commandFileHandler.read(buff, offset, length, position);
        // console.log(content)
    }
})()