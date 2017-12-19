import Node from './Node'

export default class Trie extends Node {
  constructor() {
    super(null);
    this.length = 0;
    this.root = new Node(null);
    this.suggestions = [];
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
    console.log('--------------------------------------');
  }

  suggest(word) {
    let currNode = this.root.children;
    let string = [...word]
    console.log(currNode[string[0]].children)
    
    while(string.length) {
      if (currNode[string[0]].value === string[0]) {
        this.suggestions.push(string[0]);
        console.log(this.suggestions)
        currNode = currNode[string[0]].children
        string.shift()
      }
    while(currNode.wordEnd != true) {

    }

    } 
        console.log(this.suggestions)
        console.log("where at: ", string);


      //return suggestions
      //string at index 0 matches root
      //continue traversing trie
  }


}


