import { nanoid } from 'nanoid'

export const TrelloBoardReducer = (state, action) => {
  const { colId, cardId, title } = action
  const colIndex = state.findIndex(item => item.id === colId)
  const cardIndex = state[colIndex]?.items?.findIndex(item => item.id === cardId)
  // const filterDuplicates = state[colIndex]?.items.reduce(function (p, c) {
  //   p[c.name] = (p[c.name] || 0) + 1
  //   return p
  // }, {})

  // var updatedState = state[colIndex]?.items.filter(function (obj) {
  //   return countList[obj.name] > 1
  // })

  switch (action.type) {
    case 'ADD_COL':
      return [
        ...state,
        {
          title,
          items: [],
          createdAt: Date.now(),
          id: nanoid(),
        }
      ]
    case 'DELETE_COL':
      return state.filter(column => column.id !== colId)

    case 'ADD_CARD':
      if (colIndex !== -1) {
        state[colIndex] = {
          ...state[colIndex],
          items: [
            ...state[colIndex].items,
            {
              title,
              createdAt: Date.now(),
              id: nanoid(),
            }
          ]
        }
        return [
          ...state
        ]
      }
      return state
    case 'DELETE_CARD':
      if (colIndex !== -1) {
        state[colIndex].items = state[colIndex].items?.filter(card => card.id !== cardId)

        return [
          ...state
        ]
      }
      return state

    case 'EDIT_CARD_TITLE':
      if (cardIndex !== -1) {
        state[colIndex].items[cardIndex].title = title

        return [
          ...state
        ]
      }
      return state

    case 'REMOVE_CARD':
      return state.filter(board => board.id !== action.id)

    case 'MOVE_CARD':
      const draggedItem = state[colIndex].items[cardIndex]
      if (!draggedItem.id) return
      const newState = [...state]
      newState[colIndex] = { ...state[colIndex], items: state[colIndex].items.filter(card => card.id !== cardId) }
      const targetIndex = state.findIndex(item => item.id === action.targetColId)
      newState[targetIndex] = { ...state[targetIndex], items: [...state[targetIndex].items, draggedItem] }

      return [...newState]

    default:
      return state
  }
}