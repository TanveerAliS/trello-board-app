import { memo, useContext, useState } from 'react'
import { deleteCard, editCardTitle } from '../../actions/BoardActions'
import { BoardContext } from '../../contexts/BoardContext'
import ActionItems from '../actionItems/ActionItems'
import CustomInput from '../customInput/CustomInput'
import { AiFillEdit } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'
import style from './BoardCard.module.scss'

const BoardCard = ({ card, colId, index, total, onDragStart }) => {
  const { dispatch } = useContext(BoardContext)
  const [isEditingTitle, setIsEditingTitle] = useState(false)

  const toggleTitleEdit = () => {
    setIsEditingTitle(isEditing => !isEditing)
  }

  const handleTitleSave = (newTitle) => {
    editCardTitle(dispatch, { title: newTitle, colId, cardId: card.id })
    setIsEditingTitle(false)
  }

  const handleCardDelete = () => {
    deleteCard(dispatch, { colId, cardId: card.id })
    setIsEditingTitle(false)
  }

  const menuItems = [
    {
      id: 'editCard',
      icon: <AiFillEdit />,
      doAction: toggleTitleEdit,
    },
    {
      id: 'deleteCard',
      icon: <AiFillDelete />,
      doAction: handleCardDelete,
    },
  ]

  return (
    <div className={style.card} draggable onDragStart={(e) => onDragStart(e, card.id, colId)}>
      {isEditingTitle
        ?
        <CustomInput
          value={card.title}
          onSave={handleTitleSave}
          onCancel={toggleTitleEdit} />
        :
        <div onClick={toggleTitleEdit} className={style.columnName}>{card.title}</div>
      }
      <ActionItems items={menuItems} />
    </div>
  )
}

export default memo(BoardCard)