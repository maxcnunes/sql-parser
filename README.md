sql-parser
=========

**WIP**
[![Build Status](https://travis-ci.org/maxcnunes/sql-parser.svg?branch=master)](https://travis-ci.org/maxcnunes/sql-parser)


SQL-92 definition: http://savage.net.au/SQL/sql-92.bnf.html


```js
require('sql-parser').parse('SELECT * FROM mytable');

{ 
  type: 'QueryStatement',
  start: 0,
  end: 20,
  body:[
    {
      type: 'Select',
      columns: [ { type: 'Column', name: '*' } ],
      from: 'mytable'
    }
  ],
  tokens:[
    { type: 'keyword', value: 'SELECT', start: 0, end: 5 },
    { type: 'whitespace', value: ' ', start: 6, end: 6 },
    { type: 'asterisk', value: '*', start: 7, end: 7 },
    { type: 'whitespace', value: ' ', start: 8, end: 8 },
    { type: 'keyword', value: 'FROM', start: 9, end: 12 },
    { type: 'whitespace', value: ' ', start: 13, end: 13 },
    { type: 'identifier', value: 'mytable', start: 14, end: 20 }
  ] 
}
```
