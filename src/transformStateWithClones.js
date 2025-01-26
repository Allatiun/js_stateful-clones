'use strict';
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const tState = [];
  let currentState = structuredClone(state);

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    const transformedState = structuredClone(currentState);

    if (type === 'addProperties') {
      for (const key in extraData) {
        transformedState[key] = extraData[key];
      }
    } else if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete transformedState[key];
      }
    } else if (type === 'clear') {
      for (const key in transformedState) {
        delete transformedState[key];
      }
    }

    tState.push(transformedState);
    currentState = transformedState;
  }

  return tState;
}

module.exports = transformStateWithClones;
