import { expect } from 'chai';
import Node from '../lib/Node'

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('a')
  })

  it('should be a thing', () => {
    expect(node).to.exist
  })
  it('should default end of word', () => {
    expect(node.wordEnd).to.equal(null);
  })

  it('should take data and assign it to data prop', () => {
    expect(node.value).to.equal('a')
  })

})