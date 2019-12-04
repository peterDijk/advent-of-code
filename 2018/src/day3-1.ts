import * as fs from 'fs'


class Claim {
  id: number;
  fromLeft: number;
  fromTop: number;
  width: number;
  height: number;

  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;

  constructor(dataStr: string) {
    this.init(dataStr);
    this.getArea();
  }

  init(dataStr) {
    const dataSplit: string[] = dataStr.split(" ");
    this.id = parseInt(dataSplit[0].slice(1));
    this.fromLeft = parseInt(dataSplit[2].split(",")[0]);
    this.fromTop = parseInt(dataSplit[2].split(",")[1].slice(0, -1));
    this.width = parseInt(dataSplit[3].split("x")[0]);
    this.height = parseInt(dataSplit[3].split("x")[1]);
  }

  getArea() {
    this.columnStart = this.fromLeft + 1;
    this.columnEnd = this.columnStart + (this.width - 1);
    this.rowStart = this.fromTop + 1;
    this.rowEnd = this.rowStart + (this.height - 1);
  }

}

function null2D(rows, cols) {
  var array = [], row = [];
  while (cols--) row.push(null);
  while (rows--) array.push(row.slice());
  return array;
}

function processInput(err: any, contents: string) {
  const dataArr: string[] = contents.split("\n");

  const claimArr: Claim[] = dataArr.map(str => new Claim(str));

  const arrDim = 1500;
  let overlaps = 0;
  let counter = 0;
  const canvas: number[][] = null2D(arrDim, arrDim);
  const overlapsRegister = [
    {
      r: null,
      c: null
    }
  ];

  // const test = [];
  // test.push({r: 1, c: 0});
  // console.log(test);
  // console.log(test.filter(row => row.r === 1 && row.c === 1).length === 0);

  let claimCount = 0;
  claimArr.forEach(claim => {
    claimCount++;
    console.log(`claimCount: ${claimCount}`);
    for (let r = claim.rowStart - 1; r < claim.rowEnd; r++) {
      for (let c = claim.columnStart - 1; c < claim.columnEnd; c++) {
        if (canvas[r][c] !== null) {
          if (overlapsRegister.filter(row => row.r === r && row.c === c).length === 0) {
            overlaps++;
            overlapsRegister.push({r, c});
          } else {
          
          }
        }
        counter++;
        // console.log('counter: ', counter);
        canvas[r][c] = claim.id;
      }
    }
  });


  // console.log(canvas);
  // console.log(claimArr[0]);
  console.log(overlaps);
  // console.log(overlapsRegister);
}

fs.readFile('../day3.input', 'utf8', processInput);