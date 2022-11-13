import React, { memo, useState, useContext } from 'react'
import { BoardContext } from '../../contexts/BoardContext'
import {
  addCard,
  deleteColumn,
  moveCard,
} from '../../actions/BoardActions'
import { AiFillDelete } from 'react-icons/ai'

import CustomInput from '../customInput/CustomInput.js'
import AddCardOrColumn from '../addCardOrColumn/AddCardOrColumn.js'
import BoardCard from '../boardCard/BoardCard'
import ActionItems from '../actionItems/ActionItems'
import style from './BoardColumn.module.scss'

const BoardColumn = ({ column, children }) => {
  const { dispatch } = useContext(BoardContext)
  const [isEditingTitle, setIsEditingTitle] = useState(false)

  const handleAddNewCard = (title) => {
    if(title) addCard(dispatch, { title, colId: column.id })
  }

  const toggleTitleEdit = () => {
    setIsEditingTitle(isEditing => !isEditing)
  }

  const handleTitleSave = () => {
    setIsEditingTitle(false)
  }

  const handleColumnDelete = () => {
    deleteColumn(dispatch, { colId: column.id })
  }

  const menuItems = [
    {
      id: 'deleteCol',
      icon: <AiFillDelete />,
      doAction: handleColumnDelete,
    },
  ]

  const onDragStart = (e, cardId, colId) => {
    e.dataTransfer.setData("cardId", cardId)
    e.dataTransfer.setData("colId", colId)
  }

  const onDragOver = (e) => {
    e.preventDefault()
  }

  const onDrop = (e, targetColId) => {
    let cardId = e.dataTransfer.getData("cardId")
    let colId = e.dataTransfer.getData("colId")

    if (colId !== targetColId) moveCard(dispatch, { cardId, colId, targetColId })
  }

  if (children) {
    return (
      <div className={style.boardColumnContainer}>
        {children}
      </div>
    )
  }

  return (
    <div
      className={style.boardColumnContainer}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, column.id)}>
      <div className={style.columnHeader}>
        {isEditingTitle
          ?
          <CustomInput
            className={style.columnName}
            value={column.title}
            onSave={handleTitleSave}
            onCancel={toggleTitleEdit} />
          :
          <h1 className={style.columnName} >{column.title}</h1>
        }
        <ActionItems items={menuItems} />
      </div>

      <div className={style.cardsContainer}>
        <React.StrictMode>
          {column?.items?.map((item, index) => (
            <BoardCard
              onDragStart={onDragStart}
              card={item}
              key={item.id}
              colId={column.id}
              index={index}
              total={column.items.length} />
          ))}
        </React.StrictMode>
      </div>

      <AddCardOrColumn label='Add a card' onSave={handleAddNewCard} placeholder='Enter card title' />
    </div>
  )
}

export default memo(BoardColumn)