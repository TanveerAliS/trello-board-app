import React, { useRef, useState, memo } from 'react'
import style from './CustomInput.module.scss'

const CustomInput = ({ border, value, placeholder, onSave = () => null, onCancel = () => null, className = '' }) => {
  const refInput = useRef(null)
  const [localVal, setLocalVal] = useState(value)

  const handleChange = (e) => {
    setLocalVal(e.target.value)
  }

  const onFocus = (e) => e.target.select()

  const onMouseDown = (e) => {
    if (document.activeElement !== e.target) {
      e.preventDefault()
      refInput.current.focus()
    }
  }

  const onBlur = () => {
    updateValue()
    onCancel()
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      refInput.current.blur()
      e.preventDefault()
    }
    if (e.keyCode === 27) {
      setLocalVal(value)
      refInput.current.blur()
      e.preventDefault()
    }
  }

  const updateValue = () => {
    if (localVal !== value) {
      onSave(localVal)
    }
  }

  return (
    <div className={style.inputWrapper}>
      <input
        ref={refInput}
        border={border}
        onMouseDown={onMouseDown}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onChange={handleChange}
        placeholder={value.length === 0 ? undefined : placeholder}
        value={localVal}
        autoComplete="off"
        autoFocus
        required
        className={className}
        id="title"
      />
    </div>
  )
}

export default memo(CustomInput)