# NodeJS Commands Runnder

This app will allows you to run your commands that are are wroten in the file `command.txt` like:

### Setup:
You can just clone this repo or download it:
```shell
git clone https://github.com/averrois/fs-node-app.git
```

and run this:
```shell
cd ./fs-node-app

node app.js
```

### Create Files: 
`create file`: This will create an file in the root directory, or you can specify and path for it.
```shell
create file <path>
```

### Delete files:
`delete file`: This command for deleting stored files.
```shell
delete file <path>
```

### Rename file / change destination:

`rename file`: This for renaming files or change there destination.
```shell
rename file <oldPath> to <new-path>
```

### Updating Content of file:
`update file`: This will update an content of a file by appnding new content to it.
```shell 
update file <path> content: <content>
```