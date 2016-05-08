import { expect } from 'chai';
import { scanToken } from '../../src';


/* eslint prefer-arrow-callback: 0 */
describe('scan', function () {
  const initState = (input) => ({
    input,
    start: 0,
    end: input.length - 1,
    position: -1,
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
});
