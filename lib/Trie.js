import Node from './Node'

export default class Trie extends Node {
  constructor() {
    super(null);
    this.length = 0;
    this.root = new Node(null);
  }

  insert(string) {
    let currentNode = this.root.children;
    let stringArray = [...string];

    while (stringArray.length) {

      if (!currentNode.hasOwnProperty(stringArray[0])) {
        currentNode[stringArray[0]] = new Node(stringArray[0]);
      }
      if (stringArray.length === 1) {
        currentNode[stringArray[0]].wordEnd = true;
      }
      currentNode = currentNode[stringArray[0]].children;
      stringArray.shift();
    }
    this.length++;
  }

  traverseTrie(string) {
    let currentNode = this.root.children[string[0]]; 
    let stringArray = [...string];

    if(!currentNode) { //needs refactor
      return null;
    }

    for (let i = 1; i < stringArray.length; i++) {
      if (currentNode.value !== stringArray[i-1]) {
        return;
      }
      currentNode = currentNode.children[stringArray[i]];
    }
    return currentNode;
  }

  suggest(string) {
    const currentNode = this.traverseTrie(string);
    
    if (!currentNode) { //refactor
      return null;
    }
    const wordArray = this.getWord(currentNode, string, []); 
    return this.sortSuggestions(wordArray);
  }

  getWord(currentNode, string, array) {
    if (currentNode.wordEnd) {
      array.push({word: string, count: currentNode.selectCount});
    }
    const allChildBranches = Object.keys(currentNode.children);
    allChildBranches.forEach((branch) => {
      this.getWord(currentNode.children[branch], string + branch, array);
    })
    return array;
  }

  sortSuggestions(array) {
    array.sort((a,b) => b.count - a.count); 
    return array.map(item => item.word);
  }

  select(string) {
    let currentNode = this.traverseTrie(string);
    currentNode.selectCount++;
  }

  delete(string) {
    let currentNode = this.traverseTrie(string)
    currentNode.wordEnd = null;
  }

  populate(dictionaryWordArray) {
    dictionaryWordArray.forEach((word) => {
      this.insert(word)
    })
  }

  get count() {
    this.length;
  }


}


