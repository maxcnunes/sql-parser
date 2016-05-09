/**
 * Tokenizer
 */

/* eslint no-param-reassign: 0 */
const KEYWORDS = [
  'SELECT',
  'FROM',
  'WHERE',
];


const INDIVIDUALS = {
  '*': 'asterisk',
  ';': 'semicolon',
  ',': 'comma',
  '=': 'operator',
};


//
// const statementKewords = [
//   'SELECT',
// ];


export function scanToken (state) {
  const ch = read(state);
  debugToken(state, ch);

  if (isWhitespace(ch)) {
    return scanWhitespace(state);
  }

  if (isNumber(ch)) {
    return scanNumber(state);
  }

  if (isLetter(ch)) {
    return scanWord(state);
  }

  const individual = scanIndividualCharacter(state);
  if (individual) {
    return individual;
  }

  throw new Error(`Ilegal token "${ch}"`);
}

function read (state) {
  state.position++;
  const ch = state.input[state.position];
  // state.value += ch;
  return ch;
}

function unread (state) {
  state.position--;
  // state.value.split(0, -1);
}


function isKeyword (word) {
  return ~KEYWORDS.indexOf(word);
}


function resolveWordTokenType (word) {
  return isKeyword(word) ? 'keyword' : 'identifier';
}

function resolveIndividualTokenType (ch) {
  return INDIVIDUALS[ch];
}


function scanWhitespace (state) {
  let nextChar = read(state);

  while (isWhitespace(nextChar)) {
    nextChar = read(state);
  }

  if (!isWhitespace(nextChar)) {
    unread(state);
  }

  const value = state.input.slice(state.start, state.position + 1);
  return {
    type: 'whitespace',
    value,
    start: state.start,
    end: state.start + value.length - 1,
  };
}


function scanWord (state) {
  let nextChar = read(state);

  while (isLetter(nextChar)) {
    nextChar = read(state);
  }

  if (!isLetter(nextChar)) {
    unread(state);
  }

  const value = state.input.slice(state.start, state.position + 1);
  return {
    type: resolveWordTokenType(value),
    value,
    start: state.start,
    end: state.start + value.length - 1,
  };
}


function scanNumber (state) {
  let nextChar = read(state);

  while (isNumber(nextChar)) {
    nextChar = read(state);
  }

  if (!isNumber(nextChar)) {
    unread(state);
  }

  const value = state.input.slice(state.start, state.position + 1);
  return {
    type: 'number',
    value,
    start: state.start,
    end: state.start + value.length - 1,
  };
}


function scanIndividualCharacter (state) {
  const value = state.input.slice(state.start, state.position + 1);
  const type = resolveIndividualTokenType(value);

  return {
    type,
    value,
    start: state.start,
    end: state.start + value.length - 1,
  };
}

// function skipChar () {
//   state.position++;
// }

// function readWord () {
//
// }


// function finishToken () {
//
// }


function isWhitespace (ch) {
  return ch === ' ' || ch === '\t' || ch === '\n';
}


function isLetter (ch) {
  return (ch >= 'a' && ch <= 'z')
      || (ch >= 'A' && ch <= 'Z');
}

function isNumber (ch) {
  return ch >= '0' && ch <= '9';
}


function debugToken (state, ch) {
  // temp helper function
  console.log('>>scanToken input', state.input);
  console.log('>>scanToken position', state.position);
  console.log('>>scanToken ch value', ch);
  console.log('>>scanToken ch code', ch.charCodeAt(0));
  console.log('>>scanToken isWhitespace', isWhitespace(ch));
}
