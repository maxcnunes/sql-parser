import { expect } from 'chai';
import { parse } from '../../src';

/* eslint prefer-arrow-callback: 0 */
describe.skip('parser', function () {
  it('parse select statement', function () {
    const actual = parse('SELECT * FROM mytable');
    const expected = {
      type: 'SelectStatement',
      start: 0,
      end: 21,
      body: [ // nodes
        {
          type: 'Select',
          columns: [
            { type: 'Column', name: '*' },
          ],
          from: 'mytable',
          endStatement: ';',
        },
      ],
      tokens: [
        { type: 'keyword', value: 'SELECT', start: 0, end: 6 },
        { type: 'whitespace', value: ' ', start: 7, end: 8 },
        { type: 'asterisk', value: '*', start: 0, end: 6 },
        { type: 'whitespace', value: ' ', start: 0, end: 6 },
        { type: 'keyword', value: 'FROM', start: 0, end: 6 },
        { type: 'whitespace', value: ' ', start: 0, end: 6 },
        { type: 'table', value: 'mytable', start: 0, end: 6 },
        { type: 'semicolon', value: ';', start: 0, end: 6 },
      ],
    };

    expect(actual).to.eql(expected);
  });
});
