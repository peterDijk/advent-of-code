import * as fs from 'fs'


function processInput(err: any, contents: string) {
  const dataArr: string[] = contents.split("\n");

  let countTwice = 0;
  let countThrice = 0;

  dataArr.forEach(str => {
    const strArr = str.split("");

    let foundTwice = false;
    let foundThrice = false;

    strArr.forEach(char => {
      const numOcc = strArr.filter(ch => ch === char).length;

      if (numOcc === 2 && foundTwice === false) {
        countTwice++;
        foundTwice = true;
      }
      if (numOcc === 3 && foundThrice === false) {
        countThrice++;
        foundThrice = true;
      }
    });
  });

  console.log(`twice: ${countTwice}`);
  console.log(`thrice: ${countThrice}`);

  console.log(`checksum: ${countTwice * countThrice}`);
}

fs.readFile('../day2.input', 'utf8', processInput);