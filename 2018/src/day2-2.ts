import * as fs from 'fs'


function processInput(err: any, contents: string) {
  const dataArr: string[] = contents.split("\n");

  let sol: string = '';

  dataArr.forEach(strPrim => {
    const withoutCurr = dataArr.filter(d => d !== strPrim);
    withoutCurr.forEach(strSec => {
      const strLen = strSec.length;
      const strArr: string[] = new Array();

      for (let i: number = 0; i < strLen; i++) {
        if (strSec[i] === strPrim[i]) {
          // same letter same position, potential candidate
          strArr.push(strSec[i]);
          if (strArr.length === strLen - 1) {
            console.log(`***** solution: ${strArr.join('')}`);
          }

        }
      }
    })
  })
}

fs.readFile('../day2.input', 'utf8', processInput);