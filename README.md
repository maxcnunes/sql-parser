sql-parser
==========

[![Build Status](https://travis-ci.org/maxcnunes/sql-parser.svg?branch=master)](https://travis-ci.org/maxcnunes/sql-parser)


**IMPORTANT!**

This is a modest attempt of writing a SQL parser in node. Even it being quite fun to implement. I guess I will not get it to the end.
Because it would require some good free time that is out of my scope right now.

## Reference for implementation

SQL-92 definition: http://savage.net.au/SQL/sql-92.bnf.html

## Usage

```js
var result = parse('SELECT * FROM mytable');

console.log(result);

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

## Contributing

It is required to use [editorconfig](http://editorconfig.org/) and please write and run specs before pushing any changes:

```js
npm test
```

## License

Copyright (c) 2016 Max Claus Nunes. This software is licensed under the [MIT License](http://raw.github.com/maxcnunes/sql-parser/master/LICENSE).
