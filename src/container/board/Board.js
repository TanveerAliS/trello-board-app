import { memo, useContext } from 'react'
import { addColumn } from '../../actions/BoardActions'
import { BoardContext } from '../../contexts/BoardContext'
import BoardColumn from '../../components/boardColumn/BoardColumn'
import AddCardOrColumn from '../../components/addCardOrColumn/AddCardOrColumn'
import style from './Board.module.scss'

const Board = () => {
  const { board, dispatch } = useContext(BoardContext)

  const handleAddNewCol = (title) => {
    if(title) addColumn(dispatch, { title })
  }

  return (
    <div className={style.boardContainer}>
      {board?.map(col => (
        <BoardColumn column={col} key={col.id} />
      ))}
      <BoardColumn>
        <AddCardOrColumn label='Add column' onSave={handleAddNewCol} placeholder='Enter column title' />
      </BoardColumn>
    </div>
  )
}

export default memo(Board)