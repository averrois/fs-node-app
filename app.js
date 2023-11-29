const fs = require('fs/promises');

(async () => {
    // Open the File 'r' flag is for just knwing that we are only attempt to read the file.
    const commandFileHandler = await fs.open('./command.txt', 'r');
    // Watching the file
    const watcher = fs.watch("./command.txt");
    for await (const event of watcher) {
        // Getting the size of the file
        const fileSize = (await commandFileHandler.stat()).size;
        // Create Buffer, Offset, Lenght, Position. Because they are and arg of read fun
        // alloc our buffer with size of content in file
        const buff = Buffer.alloc(fileSize);
        // offset: the location at which we want to start filling out our buff
        const offset = 0;
        // Represet how many bytes we want to read from our content that sotresd in the buffer
        // in this case we reading it all of it.
        const length = buff.byteLength;
        // The position where we want to start reading file from.
        const position = 0;

        // Reading the Content for the file & allocating buffer size
        const content = await commandFileHandler.read(
            buff,
            offset,
            length,
            position
        );
        console.log(content)
        console.log(position, offset, length);
    }
})()