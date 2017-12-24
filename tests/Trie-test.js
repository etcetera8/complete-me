import { expect } from 'chai';
import Trie from '../lib/Trie'
import Node from '../lib/Node'
import fs from 'fs';

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('A NEW TRIE', () => {
  let trie = new Trie();
  
  it('should instantiate with the correct default values' , function () {
    console.log(trie.root)
    expect(trie.children).to.deep.equal({});
    expect(trie.wordEnd).to.equal(null);
    expect(trie.value).to.equal(null);
    expect(trie.selectCount).to.equal(0);
    expect(trie.length).to.equal(0);
    expect(trie.root).to.deep.equal({children:{}, wordEnd: null, value: null, selectCount: 0})
  });
})

describe('INSERT', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  })

  it('should start with zero elements', () => {
    expect(trie.length).to.eq(0);
  });
    
  it('should count 1 one word if only 1 is passed in', () => {
    trie.insert("hi")
    expect(trie.length).to.eq(1)
  })  

  it('should count 2 words if two are passed in', () => {
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

})

  describe('SUGGEST', () => {
    let trie;

    beforeEach(() => {
      trie = new Trie();
    })

    it('should return null if word is not there', () => {
      expect(trie.suggest("burger")).to.eq(null)
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

    it('should return words with the same root', () => {
      trie.insert("pig");
      trie.insert("pigs");

      let suggestion = trie.suggest('p')
      expect(suggestion).to.deep.eq(["pig", "pigs"]);
    })
  })

  describe('DICTIONARY POPULATE', () => {
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

    it('Should increment select count of the last character', function () {
      trie.insert("big")
      expect(trie.root.children.b.children.i.children.g.selectCount).to.equal(0);
      trie.select('big');
      expect(trie.root.children.b.children.i.children.g.selectCount).to.equal(1);
    });

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




