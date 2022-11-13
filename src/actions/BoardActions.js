export const addColumn = (dispatch, payload) => {
  dispatch({ type: 'ADD_COL', ...payload })
}

export const deleteColumn = (dispatch, payload) => {
  dispatch({ type: 'DELETE_COL', ...payload })
}

export const addCard = (dispatch, payload) => {
  dispatch({ type: 'ADD_CARD', ...payload })
}

export const editCardTitle = (dispatch, payload) => {
  dispatch({ type: 'EDIT_CARD_TITLE', ...payload })
}

export const deleteCard = (dispatch, payload) => {
  dispatch({ type: 'DELETE_CARD', ...payload })
}

export const moveCard = (dispatch, payload) => {
  dispatch({ type: 'MOVE_CARD', ...payload })
}