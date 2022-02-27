export function _removeEntry(stringArray: Array<string>, el: string) {
  if (stringArray.indexOf(el) > -1) {
    stringArray.splice(stringArray.indexOf(el), 1);
  }
}
