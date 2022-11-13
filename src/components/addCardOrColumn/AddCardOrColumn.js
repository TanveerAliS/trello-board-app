import { memo, useState } from 'react'
import style from './AddCardOrColumn.module.scss'

const AddCardOrColumn = ({ label, placeholder, onSave }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('')

  const toggleEdit = () => {
    setTitle('')
    setIsEditing(isEditing => !isEditing)
  }

  const handleSave = () => {
    onSave(title)
    setIsEditing(false)
  }

  const handleChange = (e) => {
    setTitle(e.target.value)
  }

  return (
    <div className={style.newItem}>
      {isEditing
        ?
        <>
          <input value={title} onChange={handleChange} autoFocus placeholder={placeholder} />
          <div className={style.actions}>
            <input type="button" onClick={handleSave} value='Add' />
            <input type="button" onClick={toggleEdit} value='Cancel' />
          </div>
        </>
        :
        <>
          <input type="button" onClick={toggleEdit} required value={label} />
        </>
      }
    </div>
  )
}

export default memo(AddCardOrColumn)