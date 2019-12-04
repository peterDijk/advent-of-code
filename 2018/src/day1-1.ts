import * as fs from 'fs';


const processInput = (err, contents) => {
  let freqsArr = contents.split("\n");
  // console.log(freqsArr);
  
  const freqArrInts = freqsArr.map(f => parseInt(f));

  
  let solution = freqArrInts.reduce((acc, val) => { 
    return acc + val;
  });

  console.log(solution);
}

fs.readFile('../day1.input', 'utf8', processInput);