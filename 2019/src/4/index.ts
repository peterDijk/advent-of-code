import reader from "../utils/reader";

const run = async () => {
  try {
    const inputData = await reader("../../input/4/input.txt");
    const parsedData = inputData.split("-").map(Number);
    const [low, high] = parsedData;

    console.log({ low, high });

    const strDigits = low.toString().split("");
    const digits = strDigits.map(Number);

    console.log({ digits });

    // let count = 0;
    // let pass = rangeLowest;

    // while (true) {}
  } catch (err) {
    console.log({ err });
  }
};
run();
