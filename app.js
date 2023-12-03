const fs = require('fs/promises');

// Commands
const CRETE_FILE = "create file";
const DELETE_FILE = "delete file";
const RENAME_FILE = "rename file";
const UPDATE_FILE = "update file";


// Function to create a file with in a patch
const createFile = async (path) => {
    // if the file is already exist
    if (!path) {
        const err = "You didn't mentioned a path or file name!"
        return err;
    }
    try {
        const existingFileHandle = await fs.open(path, 'r')
        await existingFileHandle.close();
    } catch (e) {
        const newFileHandle = await fs.open(path, 'w');
        console.log('New File is Successfuly created.');
        newFileHandle.close();
        console.log(`The file ${path} already exist!`)
    }
}

// Deleting File
const deleteFile = async (path) => {
    try {
        // there is also the `rm` method to delete files, dir...
        await fs.unlink(path);
        console.log(`The file ${path} deleted!`);
    } catch (e) {
        if (e.code === "ENOENT") {
            console.log(`The file ${path} does not exist!`);
        } else {
            console.log(`An error occurd ${e.message}`);
        }
    }
}

// Rename File
const renameFile = async (oldPath, newPath) => {
    try {
        await fs.rename(oldPath, newPath);
        console.log(`Done.`);

    } catch (error) {
        if (error.code === "ENOENT") {
            console.log("The file or destination doesn't exist");
        } else {
            console.log(`An error occured: ${error.message}`);
        }
    }
}

//Update File
const updateFile = async (path, content) => {
    try {
        const existingFileHandle = await fs.open(path, 'a');
        await fs.writeFile(path, content)
        await existingFileHandle.close();
        console.log(`The file ${path} has been updated!`);
    } catch (error) {
        if (error.code === "ENOENT") {
            console.log("The file or the content are incorrect!");
        } else {
            console.log(`An error occured: ${error.message}`);
        }
    }
}

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
        const command = buff.toString();

        // create file <path>
        if (command.includes(CRETE_FILE)) {
            const filePath = command.substring(CRETE_FILE.length + 1);
            createFile(filePath);

        }
        // delete file <path>
        else if (command.includes(DELETE_FILE)) {
            const filePath = command.substring(DELETE_FILE.length + 1);
            console.log(`This is the filePath: ${filePath}`)
            deleteFile(filePath);
        }
        // rename file <path> to <new-path>
        else if (command.includes(RENAME_FILE)) {
            const _idx = command.indexOf(" to ");
            const oldPath = command.substring(RENAME_FILE.length + 1, _idx);
            const newPath = command.substring(_idx + 4);
            renameFile(oldPath, newPath);
        }
        // updat file <path> content: <content>
        else if (command.includes(UPDATE_FILE)) {
            const _idx = command.indexOf(" content:");
            const filePath = command.substring(UPDATE_FILE.length + 1, _idx);
            const content = command.substring(_idx + 10);
            updateFile(filePath, content);

        }
    })

    // Watching the file
    const watcher = fs.watch("./command.txt");
    for await (const event of watcher) {
        commandFileHandler.emit("change");
    }
})()

module.exports = {
    createFile,
    deleteFile,
    updateFile,
    renameFile
};
