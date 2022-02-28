export function _removeEntry(stringArray: Array<string>, stringToRemove: string) {
  if (stringArray.includes(stringToRemove)) {
    stringArray.splice(stringArray.indexOf(stringToRemove), 1);
  }
}
