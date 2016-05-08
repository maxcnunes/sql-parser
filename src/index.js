/* eslint no-param-reassign: 0 */
const KEYWORDS = [
  'SELECT',
  'FROM',
];


const INDIVIDUALS = {
  '*': 'asterisk',
  ';': 'semicolon',
};

//
// const statementKewords = [
//   'SELECT',
// ];

/**
 * Parser
 */
export function parse (input) {
  const state = {
    input,
    position: 0,
    start: 0,
    end: input.length - 1,
  };

  while (state.position < state.end) {
    console.log('>>>scanToken', scanToken(state));
  }
}


/**
 * Tokenizer
 */
export function scanToken (state) {
  const ch = read(state);
  debugToken(state, ch);

  if (isWhitespace(ch)) {
    return scanWhitespace(state);
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


function debugToken (state, ch) {
  // temp helper function
  console.log('>>scanToken input', state.input);
  console.log('>>scanToken position', state.position);
  console.log('>>scanToken ch value', ch);
  console.log('>>scanToken ch code', ch.charCodeAt(0));
  console.log('>>scanToken isWhitespace', isWhitespace(ch));
}
