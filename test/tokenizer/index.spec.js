import { expect } from 'chai';
import { scanToken } from '../../src/tokenizer';


/* eslint prefer-arrow-callback: 0 */
describe('scan', function () {
  const initState = (input) => ({
    input,
    start: 0,
    end: input.length - 1,
    position: -1,
  });

  it('scans inline comments', function () {
    const actual = scanToken(initState('-- my comment'));
    const expected = {
      type: 'comment-inline',
      value: '-- my comment',
      start: 0,
      end: 12,
    };
    expect(actual).to.eql(expected);
  });

  it('scans block comments', function () {
    const commentBlock = '/*\n * This is my comment block\n */';
    const actual = scanToken(initState(commentBlock));
    const expected = {
      type: 'comment-block',
      value: commentBlock,
      start: 0,
      end: 33,
    };
    expect(actual).to.eql(expected);
  });

  it('scans white spaces', function () {
    const actual = scanToken(initState('   \n\t  '));
    const expected = {
      type: 'whitespace',
      value: '   \n\t  ',
      start: 0,
      end: 6,
    };
    expect(actual).to.eql(expected);
  });

  it('scans SELECT keyword', function () {
    const actual = scanToken(initState('SELECT'));
    const expected = {
      type: 'keyword',
      value: 'SELECT',
      start: 0,
      end: 5,
    };
    expect(actual).to.eql(expected);
  });

  it('scans * individual identifier', function () {
    const actual = scanToken(initState('*'));
    const expected = {
      type: 'asterisk',
      value: '*',
      start: 0,
      end: 0,
    };
    expect(actual).to.eql(expected);
  });

  it('scans FROM keyword', function () {
    const actual = scanToken(initState('FROM'));
    const expected = {
      type: 'keyword',
      value: 'FROM',
      start: 0,
      end: 3,
    };
    expect(actual).to.eql(expected);
  });

  it('scans table name identifier', function () {
    const actual = scanToken(initState('mytable'));
    const expected = {
      type: 'identifier',
      value: 'mytable',
      start: 0,
      end: 6,
    };
    expect(actual).to.eql(expected);
  });

  it('scans ; individual identifier', function () {
    const actual = scanToken(initState(';'));
    const expected = {
      type: 'semicolon',
      value: ';',
      start: 0,
      end: 0,
    };
    expect(actual).to.eql(expected);
  });

  it('scans , individual identifier', function () {
    const actual = scanToken(initState(','));
    const expected = {
      type: 'comma',
      value: ',',
      start: 0,
      end: 0,
    };
    expect(actual).to.eql(expected);
  });

  it('scans WHERE keyword', function () {
    const actual = scanToken(initState('WHERE'));
    const expected = {
      type: 'keyword',
      value: 'WHERE',
      start: 0,
      end: 4,
    };
    expect(actual).to.eql(expected);
  });

  it('scans = individual identifier', function () {
    const actual = scanToken(initState('='));
    const expected = {
      type: 'operator',
      value: '=',
      start: 0,
      end: 0,
    };
    expect(actual).to.eql(expected);
  });

  it('scans 10 as number identifier', function () {
    const actual = scanToken(initState('10'));
    const expected = {
      type: 'number',
      value: '10',
      start: 0,
      end: 1,
    };
    expect(actual).to.eql(expected);
  });

  it('scans \'Hello World\' as string value', function () {
    const actual = scanToken(initState('\'Hello World\''));
    const expected = {
      type: 'string',
      value: '\'Hello World\'',
      start: 0,
      end: 12,
    };
    expect(actual).to.eql(expected);
  });
});
