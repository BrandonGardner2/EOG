// Takes in an array and returns a slice from the end of an array based on the limit provided.
const sliceDataFromEnd = (arr: any[], limit: number | undefined) => {
  const endIndex = arr.length;
  const startIndex = limit ? endIndex - limit : 0;

  return arr.slice(startIndex, endIndex);
};

export default sliceDataFromEnd;
