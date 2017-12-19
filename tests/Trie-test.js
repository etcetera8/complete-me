import { expect } from 'chai';
import Trie from '../lib/Trie'
import Node from '../lib/Node'
describe('Search Trie', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  })

  it('should start with zero elements', () => {
    expect(trie.length).to.eq(0);
  });

  // it('should set its default root to null', () => {
  //   expect(trie.root).to.eq(null);
  // });
    //write alg that finds given letter, i.e. first that returns path to that node
    // phase 2 instead of searching for letter search for given string that equals
    
  it('should take in a word keep count of words', () => {
    trie.insert("hi")
    expect(trie.length).to.eq(1)
  })

  it('should have its first child be equal to h', () => {
    trie.insert("hi")
    expect(Object.keys(trie.root.children)[0]).to.eq('h')
  })

  it('should have its second child be equal to i', () => {
    trie.insert("hi")
    expect(Object.keys(trie.root.children.h.children)[0]).to.eq('i')
  })

  it('should change the wordEnd flag to true', () => {
    trie.insert('hi')
    expect(trie.root.children.h.children.i.wordEnd).to.eq(true)
  });
  

  it('should share parent nodes for words that start with the same letter', () => {
    trie.insert('hey');
    trie.insert('hi')
    trie.insert('zilch')

    expect(Object.keys(trie.root.children.h.children)).to.deep.eq(['e', 'i']);
  })

  it.skip('should not create duplicate nodes when inserting duplicate words', () => {
    trie.insert('hello');
    trie.insert('hello');
    console.log("trie: ", trie)
    expect(trie['length']).to.eq(1)
  })

    //write alg that finds given letter, i.e. first that returns path to that node
    // phase 2 instead of searching for letter search for given string that equals
    // expect(trie.length).to.eq(2)
  })

  describe.only('Suggest', () => {
    let trie;

    beforeEach(() => {
      trie = new Trie();
    })

    it('provide a suggestion in an array', () => {
      trie.insert("amp")
      let suggestion = trie.suggest('am');

      expect(suggestion).to.deep.eq(["amp"]);

      // trie.insert("pizzeria")
      // let suggestion2 = trie.suggest('piz')
      // expect(suggestion2).to.deep.eq(["pizza", "pizzeria"]);

    })

    // it('should start with zero elements', () => {
    //   expect(trie.length).to.eq(0);
    // });
  })


