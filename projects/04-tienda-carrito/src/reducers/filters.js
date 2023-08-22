export default function filterReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_CATEGORY': {
      return {
        ...state,
        category: action.category,
      };
    }
    case 'CHANGE_PRICE': {
      return {
        ...state,
        minPrice: action.minPrice,
      };
    }
    default: {
      throw Error('Accion desconocida: ' + action.type);
    }
  }
}
