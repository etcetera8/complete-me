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

    this.length++
    //console.log(JSON.stringify(this.root, null, '\t'))
  }

  traverseTrie(string) {
    let currentNode = this.root.children[string[0]]; //first letter of string
    let stringArray = [...string]

    for(let i = 1; i < stringArray.length; i++) {
      if (currentNode.value !== stringArray[i-1]) {
        return;
      }
      currentNode = currentNode.children[stringArray[i]];
    }
    return currentNode;
  }

  suggest(string) {
    const allWords = [];
    const currentNode = this.traverseTrie(string)
    const wordArray = this.getWord(currentNode, string, allWords);
    
    return this.sortSuggestions(wordArray)
  }

  getWord(node, string, allWords) {
    if (node.wordEnd) {
      allWords.push({word: string, count: node.selectCount})
    }
    const allOChildrenBranches = Object.keys(node.children)
    allOChildrenBranches.forEach((branch) => {
      this.getWord(node.children[branch], string + branch, allWords)
    })
    return allWords;
  }

  sortSuggestions(array) {
    array.sort((a,b) => b.count - a.count); 
    return array.map(item => item.word)
  }

  select(string) {
    let currentNode = this.traverseTrie(string)
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


}


