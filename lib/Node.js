export default class Node {
  constructor(value) {
    this.children = {};
    this.wordEnd = null;
    this.value = value;
    this.selectCount = 0;
  }
}