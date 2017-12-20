import Node from './Node'

export default class Trie extends Node {
  constructor() {
    super(null);
    this.length = 0;
    this.root = new Node(null);
  }

  insert(string) {
    let currentNode = this.root.children;
    let arr = [...string];

    while (arr.length) {

      if (!currentNode.hasOwnProperty(arr[0])) {
        currentNode[arr[0]] = new Node(arr[0]);
      }
      if (arr.length === 1) {
        currentNode[arr[0]].wordEnd = true;
      }
      currentNode = currentNode[arr[0]].children;
      arr.shift();
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
    let currentNode = this.traverseTrie(string)

    const getWord = (node, string) => {
      //base case
      if (node.wordEnd) {
        allWords.push({word: string, count: node.selectCount})
      }

      const allOChildrenBranches = Object.keys(node.children)
      allOChildrenBranches.forEach((branch) => {
        getWord(node.children[branch], string + branch)
      })
    }

    getWord(currentNode, string);
    return this.sortSuggestions(allWords)
    // return sortedWords;
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


