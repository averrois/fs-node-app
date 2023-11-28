/*
const data = Bun.file("./file.txt");
const text = await data;
console.log(text);
*/ 

const fs = require("fs/promises");

(async () => {
  try {
    await fs.copyFile("./file.txt", "./newFfile.txt");
    console.log("Done")
  } catch (err) {
    console.log(err);
    console.log("ERROR")
  }
})();
