const fs = require('fs/promises');

(async () => {
    const watcher = fs.watch("./");
    for await (const event of watcher) {
        if (event.eventType === 'change' && event.filename === 'command.txt') {
            console.log('The File Changed');
        }
    }
})()