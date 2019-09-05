export function getSupportedOptions(store, currentActionId, OPTION_TYPE) {
  const options = Object.keys(store).filter(id => id !== currentActionId).map(id => store[id].option).filter(option => option.type === OPTION_TYPE);
  return options;
}