import { expect } from 'chai';
import { parse } from '../../src/parser';

/* eslint prefer-arrow-callback: 0 */
describe('parser', function () {
  it('parse select statement', function () {
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
          // endStatement: ';',
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
        // { type: 'semicolon', value: ';', start: 21, end: 21 },
      ],
    };

    expect(actual).to.eql(expected);
  });
});
