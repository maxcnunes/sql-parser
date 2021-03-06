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


export function scanToken (state) {
  const ch = read(state);

  if (isWhitespace(ch)) {
    return scanWhitespace(state);
  }

  if (isCommentInline(ch, state)) {
    return scanCommentInline(state);
  }

  if (isCommentBlock(ch, state)) {
    return scanCommentBlock(state);
  }

  if (isString(ch, state)) {
    return scanString(state);
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
  if (state.position === state.input.length - 1) {
    return null;
  }

  state.position++;
  return state.input[state.position];
}


function unread (state) {
  if (state.position === state.start) {
    return;
  }

  state.position--;
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
  let nextChar;

  do {
    nextChar = read(state);
  } while (isWhitespace(nextChar));

  if (nextChar !== null && !isWhitespace(nextChar)) {
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


function scanCommentInline (state) {
  let nextChar;

  do {
    nextChar = read(state);
  } while (nextChar !== '\n' && nextChar !== null);

  if (nextChar !== null && nextChar !== '\n') {
    unread(state);
  }

  const value = state.input.slice(state.start, state.position + 1);
  return {
    type: 'comment-inline',
    value,
    start: state.start,
    end: state.start + value.length - 1,
  };
}


function scanString (state) {
  let nextChar;

  do {
    nextChar = read(state);
  } while (nextChar !== '\'' && nextChar !== null);

  if (nextChar !== null && nextChar !== '\'') {
    unread(state);
  }

  const value = state.input.slice(state.start, state.position + 1);
  return {
    type: 'string',
    value,
    start: state.start,
    end: state.start + value.length - 1,
  };
}


function scanCommentBlock (state) {
  let nextChar;
  let prevChar;

  do {
    prevChar = nextChar;
    nextChar = read(state);
  } while ((prevChar + nextChar !== '*/') && nextChar !== null);

  if (nextChar !== null && nextChar !== '/') {
    unread(state);
  }

  const value = state.input.slice(state.start, state.position + 1);
  return {
    type: 'comment-block',
    value,
    start: state.start,
    end: state.start + value.length - 1,
  };
}


function scanWord (state) {
  let nextChar;

  do {
    nextChar = read(state);
  } while (isLetter(nextChar));

  if (nextChar !== null && !isLetter(nextChar)) {
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
  let nextChar;

  do {
    nextChar = read(state);
  } while (isNumber(nextChar) && nextChar !== null);

  if (nextChar !== null && !isNumber(nextChar)) {
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


function isWhitespace (ch) {
  return ch === ' ' || ch === '\t' || ch === '\n';
}

function isString (ch) {
  return ch === '\'';
}


function isCommentInline (ch, state) {
  let isComment = ch === '-';
  if (!isComment) {
    return false;
  }

  // lookahead
  const nextChar = read(state);
  isComment = nextChar === '-';
  if (!isComment) {
    unread(state);
  }

  return isComment;
}


function isCommentBlock (ch, state) {
  let isComment = ch === '/';
  if (!isComment) {
    return false;
  }

  // lookahead
  const nextChar = read(state);
  isComment = nextChar === '*';
  if (!isComment) {
    unread(state);
  }

  return isComment;
}


function isLetter (ch) {
  return (ch >= 'a' && ch <= 'z')
      || (ch >= 'A' && ch <= 'Z');
}

function isNumber (ch) {
  return ch >= '0' && ch <= '9';
}
