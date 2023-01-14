export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_ERROR':
      console.log('ADD_ERROR', action);

      return [action.error];
    case 'CLEAR_ERROR':
      console.log('CLEAR_ERROR');

      return [];
    default:
      return state;
  }
};