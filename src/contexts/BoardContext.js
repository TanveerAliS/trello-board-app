import React, { createContext, useReducer, useEffect, useMemo } from 'react'
import { TrelloBoardReducer } from '../reducers/TrelloBoardReducer'

export const BoardContext = createContext()

const BoardContextProvider = (props) => {
  const [board, dispatch] = useReducer(TrelloBoardReducer, [], () => {
    const localData = localStorage.getItem('trelloBoard')
    return localData ? JSON.parse(localData) : []
  })

  useEffect(() => {
    localStorage.setItem('trelloBoard', JSON.stringify(board))
  }, [board])

  const value = useMemo(() => ({
    board, dispatch
  }), [board])

  return (
    <BoardContext.Provider value={value}>
      {props.children}
    </BoardContext.Provider>
  )
}

export default BoardContextProvider