const fs = require('fs/promises');

(async () => {
    // Open the File 'r' flag is for just knwing that we are only attempt to read the file.
    const commandFileHandler = await fs.open('./command.txt', 'r');

    commandFileHandler.on("change", async () => {

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

        // Reading the whole Content for the file from start to end 
        await commandFileHandler.read(
            buff,
            offset,
            length,
            position
        );
        const content = buff.toString();
    })

    // Watching the file
    const watcher = fs.watch("./command.txt");
    for await (const event of watcher) {
        commandFileHandler.emit("change");
    }
})()