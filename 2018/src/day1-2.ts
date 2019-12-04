let fs = require('fs');


const processInput = (err, contents) => {
  let freqsArr = contents.split("\n");
  
  const freqArrInts = freqsArr.map(f => parseInt(f));

  var freqCalc = new Array();
  
  let solution = freqArrInts.reduce((acc, val) => {
    var newFreq = acc + val;
    freqCalc.push(newFreq);
    return newFreq;
  });
  console.log(`solution: ${solution}`);

  let res = solution;
  let read = freqArrInts.length - 1;
  let loop = 1;

  while (true) {
    let next = read + 1;
    if (read === freqArrInts.length -1) next = 0;
    if (read === freqArrInts.length) {
      read = 0;
      next = read + 1;
      loop++;
    }
    console.log(`read: ${read} | next: ${next}`);
    res += freqArrInts[next];

    console.log(res);

    if (freqCalc.includes(res)) {
        console.log(`******** got him ${res}`);
        console.log(`looped: ${loop} times`);
        break;
      }
    read++;
    // break;
  }
}

fs.readFile('../day1.input', 'utf8', processInput);