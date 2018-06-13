const readline = require('readline');
const fs = require('fs');
const stream = require('stream');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the name of the source directory : ', (answer1) => {
  console.log(`The directory is: ${answer1}`);

  fs.readdir(answer1, (err, files) => {
    if (err) {
      console.log('some error occured')
      console.log(err.message)
    }
    else {
      let i = 0;
      files.forEach(file => {
        console.log(i++, `${file}`);
      });

      rl.question('Enter the serial number of the file to be copied : ', (answer2) => {

        fs.readdir(answer1, (err, files) => {
          if (err) {
            console.log(err.message)
          }
          else {
            const fileName = files[parseInt(answer2)]
            console.log(`${fileName}`)

            rl.question('Enter the name of the destination directory : ', (answer3) => {
              console.log(`The destination directory is: ${answer3}`)

              const readStream = fs.createReadStream(`./${answer1}/${fileName}`)

              const writeStream = fs.createWriteStream(`./${answer3}/${fileName}`)

              readStream.on('data', (chunk) => {
                writeStream.write(chunk)
              })

              readStream.on('end', () => {
                console.log('file read complete')
                writeStream.end();
                console.log('file write complete')
              })
            })
          }
        })
      })
    }
  })
})