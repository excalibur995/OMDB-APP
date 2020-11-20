###no 1 anagram

function groupAnagrams(arr: string[]):string[][] {
  const result: Record<string, string[]> = {};
  for (const word of arr) {
    const cleansed = word.split("").sort().join("");
    if (result[cleansed]) {
      result[cleansed].push(word);
    } else {
      result[cleansed] = [word];
    }
  }
  return Object.values(result);
}
