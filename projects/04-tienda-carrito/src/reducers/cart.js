export const cartInitialState =
  JSON.parse(window.localStorage.getItem('cart')) || [];

export const updateLocalStorage = (state) => {
  window.localStorage.setItem('cart', JSON.stringify(state));
};

export function cartReducer(state, action) {
  const { type: actionType, payload: actionPayload } = action;
  switch (actionType) {
    case 'ADD_TO_CART': {
      //Check if the product is already in the cart
      const productInCartIndex = state.findIndex(
        (product) => product.id === actionPayload.id
      );

      if (productInCartIndex >= 0) {
        // structuredClone() hace copias profundas de arreglos y objetos
        const newCart = structuredClone(state);
        newCart[productInCartIndex].quantity += 1;
        updateLocalStorage(newCart);

        return newCart; //Regresa el carrito con la cantidad del producto encontrado aumentada
      }

      //Producto no esta en el carrito
      const newCart = [
        ...state,
        {
          ...actionPayload, //el producto que se le pasa como el objeto de accion (payload)
          quantity: 1,
        },
      ];
      updateLocalStorage(newCart);

      return newCart;
    }
    case 'REMOVE_FROM_CART': {
      const newCart = state.filter(
        (product) => product.id !== actionPayload.id
      );
      updateLocalStorage(newCart);

      return newCart;
    }
    case 'CLEAR_CART': {
      updateLocalStorage([]);

      return [];
    }
    default: {
      throw Error('Accion desconocida: ' + action.type);
    }
  }
}

//Otra forma seria con un objeto
//Este objeto guarda una funcion para cada tipo de accion
/*
const UPDATE_STATE_BY_ACTION = {
  'ADD_TO_CART': (){
      
    return ...
  },
  'REMOVE_FROM_CART': (){
      
    return ...
  },
  'CLEAR_CART': (){
      
    return ...
  },

}

//Entonces ya se puede refactorizar el cartReducer 
export const cartReducer(state, action){
  const {type: actionType} = action

  const updateState = UPDATE_STATE_BY_ACTION[actionType] //Esto busca en el objeto el elemento que sea igual >>> [actionType] : (){...} "updateState" guarda una funcion de las que contiene el objeto...

  return updateState ? updateState(state, action) : state
  el reducer regresa solo la funcion que se apta para el objeto de accion con el que fue llamado, en lugar de analizar el el objeto y aplicar el case correspondiente,
}

*/
