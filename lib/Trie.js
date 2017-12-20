import Node from './Node'

export default class Trie extends Node {
  constructor() {
    super(null);
    this.length = 0;
    this.root = new Node(null);
    //this.children = {}
  }

  get count() {
    return this.length;
  }

  insert(string) {
    let currNode = this.root.children;
    let arr = [...string];

    while (arr.length) {

      if (!currNode.hasOwnProperty(arr[0])) {
        currNode[arr[0]] = new Node(arr[0]);
      }
      if (arr.length === 1) {
        currNode[arr[0]].wordEnd = true;
      }
      currNode = currNode[arr[0]].children;
      arr.shift();
    }
    this.length++
    //console.log(JSON.stringify(this.root, null, '\t'))
  }

  suggest(string) {
    let currentNode = this.root.children[string[0]]; //first letter of string
    let count = 0;
    const allWords = [];

    while (count + 1 < string.length) {
      if (currentNode.value !== string[count]) {
      }
      currentNode = currentNode.children[string[count+1]]
      count++
    }

    const getWord = (node, string) => {
      //base case
      if(node.wordEnd) {
        allWords.push({word: string, count: node.selectCount})
      }
      const allOtherBranches = Object.keys(node.children)
      allOtherBranches.forEach((branch) => {
        getWord(node.children[branch], string + branch)
      })
    }

    getWord(currentNode, string);
    return this.sortSuggestions(allWords)
    // return sortedWords;
  }

  populate(dictionaryWordArray) {
    dictionaryWordArray.forEach((word) => {
      this.insert(word)
    })
  }

  select(string) {
    let currentNode = this.root.children[string[0]]; //first letter of string
    let count = 0;
    const allWords = [];

    while (count + 1 < string.length) {
      if (currentNode.value !== string[count]) {
      }
      currentNode = currentNode.children[string[count+1]]
      count++
    }
    currentNode.selectCount++;
  }

  sortSuggestions(array) {
    array.sort((a,b) => b.count - a.count); 
    return array.map(item => item.word)
  }

  delete(string) {
    let currentNode = this.root.children[string[0]]; //first letter of string
    let count = 0;

    while (count + 1 < string.length) {
      if (currentNode.value !== string[count]) {
      }
      currentNode = currentNode.children[string[count+1]]
      count++
    }
    currentNode.wordEnd = null;
  }

}


