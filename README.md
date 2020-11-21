# Anagram
```
function groupAnagrams(arr: string[]) {
  const result: Record<string, string[]> = {};
  for (const word of arr) {
    const cleansed = sortArrayString(word.split("")).join("")
    if (result[cleansed]) {
      result[cleansed].push(word);
    } else {
      result[cleansed] = [word];
    }
  }
  return Object.values(result);
}


function sortArrayString(myArray: string[]) {
  for (let j = 0; j < myArray.length - 1; j++) {
    for (let i = 0, swapping; i < myArray.length - 1; i++) {
      if (myArray[i] > myArray[i + 1]) {
        swapping = myArray[i + 1];
        myArray[i + 1] = myArray[i];
        myArray[i] = swapping;
      };
    };
  };
  return myArray
}
```
