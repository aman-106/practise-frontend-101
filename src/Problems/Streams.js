async function Streams() {
  const res = new Response("hellow eod");

  const buffer = await res.arrayBuffer();

  const chars = new Uint8Array(buffer);
  console.log(chars);
}

Streams();

// using streams built in
//www.digitalocean.com/community/tutorials/how-to-work-with-files-using-streams-in-node-js

// https:
function reverse(filePath) {
  const readStream = fs.createReadStream(filePath);
  const reversedDataFilePath =
    filePath.split(".")[0] + "-reversed." + filePath.split(".")[1];
  const writeStream = fs.createWriteStream(reversedDataFilePath);

  const reverseStream = new Transform({
    transform(data, encoding, callback) {
      const reversedData = data.toString().split("").reverse().join("");
      this.push(reversedData);
      callback();
    },
  });

  readStream
    .pipe(reverseStream)
    .pipe(writeStream)
    .on("finish", () => {
      console.log(
        `Finished reversing the contents of ${filePath} and saving the output to ${reversedDataFilePath}.`
      );
    });
}
