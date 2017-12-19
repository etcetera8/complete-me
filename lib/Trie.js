import Node from './Node'

export default class Trie extends Node {
  constructor() {
    super(null);
    this.length = 0;
    this.root = new Node(null)
  }

  insert(string) {
    let currentNode = this.root;
    this.length++;
    let stringArray = [...string]
    console.log("curr node: ",currentNode)
    
    for (let i = 0; i < stringArray.length; i++) {
      let data = stringArray[i];
      console.log("Object keys: ", Object.keys(currentNode.children)[0])
      while (Object.keys(currentNode.children)[0] != undefined) {
        currentNode = currentNode.children[data];
      }
      let child = new Node(data);
      currentNode.children[data] = child;
      currentNode = currentNode.children[data]
    }

    currentNode.wordEnd = true;

    //console.log(JSON.stringify(this.root, null, '\t'))
    console.log('--------------------------------');
    //console.log(JSON.stringify(this.root.children.children, null, '\t'))

  }


}


