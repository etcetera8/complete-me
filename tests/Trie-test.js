import { expect } from 'chai';
import Trie from '../lib/Trie'
import Node from '../lib/Node'
import fs from 'fs';

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('INSERT', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  })

  it('should start with zero elements', () => {
    expect(trie.length).to.eq(0);
  });
    
  it('should take in a word keep count of words', () => {
    trie.insert("hi")
    expect(trie.length).to.eq(1)
  })  

  it('should take in two words and keep count', () => {
    trie.insert("hi")
    trie.insert("hello")
    expect(trie.length).to.eq(2)
  })

  it('should have its first child be equal to h if "hi" is passed in', () => {
    trie.insert("hi")
    expect(Object.keys(trie.root.children)[0]).to.eq('h')
  })

  it('should have its second child be equal to i if "hi" is passed in', () => {
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
    expect(trie['length']).to.eq(1)
  })

})

  describe('SUGGEST', () => {
    let trie;

    beforeEach(() => {
      trie = new Trie();
    })

    it('provide a suggestion in an array', () => {
      trie.insert("amp")
      trie.insert("amped")
      trie.insert("things")
      trie.insert("amplifier")
      let suggestion = trie.suggest('am');

      expect(suggestion).to.deep.eq(["amp", "amped", "amplifier"]);
    })

    it('should not suggest words that don\'t start with the search', () => {
      trie.insert("pig");
      trie.insert("piglette");
      trie.insert("piggyback");
      trie.insert("wiggle")

      let suggestion = trie.suggest('w')
      expect(suggestion).to.deep.eq(["wiggle"]);
    })

    it('should not suggest words that don\'t start with the search', () => {
      trie.insert("pizza");
      trie.insert("pizzas");
      trie.insert("pizzaria");
      trie.insert("pizzaparlor")

      let suggestion = trie.suggest('piz')
      expect(suggestion).to.deep.eq(["pizza", "pizzas", "pizzaria", "pizzaparlor"]);
    })

    it('should return words with the same root', () => {
      trie.insert("pig");
      trie.insert("pigs");

      let suggestion = trie.suggest('p')
      expect(suggestion).to.deep.eq(["pig", "pigs"]);
    })

  })

  describe('DICTIONARY', () => {
    let trie;

    beforeEach(() => {
      trie = new Trie();
    })

    it('should have length eq to dictionary', () => {
      trie.populate(dictionary)

      expect(trie.length).to.eq(235886);
    })
  })  

  describe('SELECT', () => {

    let trie;
    beforeEach(() => {
      trie = new Trie();
    })

    it('should sort them by the highest rank', () => {
      
      trie.populate(dictionary)
      expect(trie.length).to.eq(235886);
      let suggestions = trie.suggest("piz")
      expect(suggestions).to.deep.eq(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);
      trie.select("pizzeria");
      let suggestions2 = trie.suggest("piz")

      expect(suggestions2).to.deep.eq(["pizzeria", "pize", "pizza", "pizzicato", "pizzle"]);
    })  
  })

  describe('DELETE', () => {
    let trie;

    beforeEach(() => {
      trie = new Trie();
    })

    it('should delete a word', () => {
      trie.populate(dictionary)

      let suggestion1 = trie.suggest("piz")
      
      expect(suggestion1).to.deep.eq(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);
      trie.delete("pizzle");
      
      let suggestion2 = trie.suggest("piz")
      expect(suggestion2).to.deep.eq(["pize", "pizza", "pizzeria", "pizzicato"]);

    })
  })




