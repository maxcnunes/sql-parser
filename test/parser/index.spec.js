import { expect } from 'chai';
import { parse } from '../../src/parser';

/* eslint prefer-arrow-callback: 0 */
describe('parser', function () {
  describe('given a single select statement', function () {
    it('parse select statement with single * column', function () {
      const actual = parse('SELECT * FROM mytable');
      const expected = {
        type: 'QueryStatement',
        start: 0,
        end: 20,
        body: [ // nodes
          {
            type: 'Select',
            columns: [
              { type: 'Column', name: '*' },
            ],
            from: 'mytable',
          },
        ],
        tokens: [
          { type: 'keyword', value: 'SELECT', start: 0, end: 5 },
          { type: 'whitespace', value: ' ', start: 6, end: 6 },
          { type: 'asterisk', value: '*', start: 7, end: 7 },
          { type: 'whitespace', value: ' ', start: 8, end: 8 },
          { type: 'keyword', value: 'FROM', start: 9, end: 12 },
          { type: 'whitespace', value: ' ', start: 13, end: 13 },
          { type: 'identifier', value: 'mytable', start: 14, end: 20 },
        ],
      };

      expect(actual).to.eql(expected);
    });

    it('parse select statement with single column', function () {
      const actual = parse('SELECT id FROM people');
      const expected = {
        type: 'QueryStatement',
        start: 0,
        end: 20,
        body: [ // nodes
          {
            type: 'Select',
            columns: [
              { type: 'Column', name: 'id' },
            ],
            from: 'people',
          },
        ],
        tokens: [
          { type: 'keyword', value: 'SELECT', start: 0, end: 5 },
          { type: 'whitespace', value: ' ', start: 6, end: 6 },
          { type: 'identifier', value: 'id', start: 7, end: 8 },
          { type: 'whitespace', value: ' ', start: 9, end: 9 },
          { type: 'keyword', value: 'FROM', start: 10, end: 13 },
          { type: 'whitespace', value: ' ', start: 14, end: 14 },
          { type: 'identifier', value: 'people', start: 15, end: 20 },
        ],
      };

      expect(actual).to.eql(expected);
    });

    it('parse select statement with multiple columns', function () {
      const actual = parse('SELECT id, name FROM people');
      const expected = {
        type: 'QueryStatement',
        start: 0,
        end: 26,
        body: [ // nodes
          {
            type: 'Select',
            columns: [
              { type: 'Column', name: 'id' },
              { type: 'Column', name: 'name' },
            ],
            from: 'people',
          },
        ],
        tokens: [
          { type: 'keyword', value: 'SELECT', start: 0, end: 5 },
          { type: 'whitespace', value: ' ', start: 6, end: 6 },
          { type: 'identifier', value: 'id', start: 7, end: 8 },
          { type: 'comma', value: ',', start: 9, end: 9 },
          { type: 'whitespace', value: ' ', start: 10, end: 10 },
          { type: 'identifier', value: 'name', start: 11, end: 14 },
          { type: 'whitespace', value: ' ', start: 15, end: 15 },
          { type: 'keyword', value: 'FROM', start: 16, end: 19 },
          { type: 'whitespace', value: ' ', start: 20, end: 20 },
          { type: 'identifier', value: 'people', start: 21, end: 26 },
        ],
      };

      expect(actual).to.eql(expected);
    });

    it('parse select statement with ending semicolon', function () {
      const actual = parse('SELECT id FROM people;');
      const expected = {
        type: 'QueryStatement',
        start: 0,
        end: 21,
        body: [ // nodes
          {
            type: 'Select',
            columns: [
              { type: 'Column', name: 'id' },
            ],
            from: 'people',
            endStatement: ';',
          },
        ],
        tokens: [
          { type: 'keyword', value: 'SELECT', start: 0, end: 5 },
          { type: 'whitespace', value: ' ', start: 6, end: 6 },
          { type: 'identifier', value: 'id', start: 7, end: 8 },
          { type: 'whitespace', value: ' ', start: 9, end: 9 },
          { type: 'keyword', value: 'FROM', start: 10, end: 13 },
          { type: 'whitespace', value: ' ', start: 14, end: 14 },
          { type: 'identifier', value: 'people', start: 15, end: 20 },
          { type: 'semicolon', value: ';', start: 21, end: 21 },
        ],
      };

      expect(actual).to.eql(expected);
    });
  });
});
