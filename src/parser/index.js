import { scanToken } from '../tokenizer';


/**
 * Parser
 */
export function parse (input) {
  const topLevelState = initState({ input });
  const topLevelStatement = {
    type: 'QueryStatement',
    start: 0,
    end: input.length - 1,
    body: [],
    tokens: [],
  };

  let prevState = topLevelState;
  const statementParser = createSelectStatementParser();

  while (prevState.position < topLevelState.end) {
    const tokenState = initState({ prevState });
    const token = scanToken(tokenState);
    console.log('>>>\nscanToken', token);
    statementParser.addToken(token);
    topLevelStatement.tokens.push(token);
    prevState = tokenState;
  }

  topLevelStatement.body.push(statementParser.getStatement());

  return topLevelStatement;
}


function initState ({ input, prevState }) {
  if (prevState) {
    return {
      input: prevState.input,
      position: prevState.position,
      start: prevState.position + 1,
      end: prevState.input.length - 1,
      body: [],
    };
  }

  return {
    input,
    position: -1,
    start: 0,
    end: input.length - 1,
    body: [],
  };
}


function createSelectStatementParser () {
  let currentStepIndex = 0;
  let prevToken;
  const statement = {
    type: 'Select',
    columns: [],
  };

  const steps = [
    // Select
    {
      preCanGoToNext: () => false,
      validation: {
        acceptTokens: [
          { type: 'keyword', value: 'SELECT' },
        ],
      },
      add: () => {
        statement.type = 'Select';
      },
      postCanGoToNext: () => true,
    },
    // Columns
    {
      preCanGoToNext: (token) => {
        return statement.columns.length
            && token.type === 'keyword'
            && token.value.toUpperCase() === 'FROM';
      },
      validation: {
        requireBefore: ['whitespace', 'comma'],
        acceptTokens: [
          { type: 'asterisk' },
          { type: 'identifier' },
        ],
      },
      add: (token) => {
        statement.columns.push({ type: 'Column', name: token.value });
      },
      postCanGoToNext: () => false,
    },
    // From keyword
    {
      preCanGoToNext: () => false,
      validation: {
        requireBefore: ['whitespace'],
        acceptTokens: [
          { type: 'keyword', value: 'FROM' },
        ],
      },
      add: () => {},
      postCanGoToNext: () => true,
    },
    // From table name
    {
      preCanGoToNext: () => false,
      validation: {
        requireBefore: ['whitespace'],
        acceptTokens: [
          { type: 'identifier' },
        ],
      },
      add: (token) => {
        statement.from = token.value;
      },
      postCanGoToNext: () => true,
    },
  ];


  /* eslint arrow-body-style: 0, no-extra-parens: 0 */
  const isValidToken = (step, token) => {
    return step
      .validation
      .acceptTokens.filter(accept => {
        const isValidType = token.type === accept.type;
        const isValidValue = (
          !accept.value
          || token.value.toUpperCase() === accept.value
        );

        return isValidType && isValidValue;
      }).length > 0;
  };

  const hasRequiredBefore = (step) => {
    return (
      !step.requireBefore
      || ~step.requireBefore.indexOf(prevToken.type)
    );
  };

  return {
    getStatement () {
      return statement;
    },

    addToken (token) {
      if (token.type === 'whitespace') {
        prevToken = token;
        return;
      }

      let currentStep = steps[currentStepIndex];
      if (currentStep.preCanGoToNext(token)) {
        currentStepIndex++;
        currentStep = steps[currentStepIndex];
      }

      if (!hasRequiredBefore(currentStep)) {
        const requireds = currentStep.requireBefore.join(' or ');
        throw new Error(`Expected any of these tokens ${requireds} before "${token.value}" (currentStep=${currentStepIndex}).`);
      }

      if (!isValidToken(currentStep, token)) {
        const expecteds = currentStep
          .validation
          .acceptTokens
          .map(accept => `(type="${accept.type}" value="${accept.value}")`)
          .join(' or ');
        throw new Error(`Expected any of these tokens ${expecteds} instead of type="${token.type}" value="${token.value}" (currentStep=${currentStepIndex}).`);
      }

      currentStep.add(token);

      if (currentStep.postCanGoToNext(token)) {
        currentStepIndex++;
      }

      prevToken = token;
    },
  };
}
