
import style from './ActionItems.module.scss'

const ActionItems = ({ items }) => {

  const handleItemClick = (doAction) => () => {
    if (doAction) doAction()
  }

  return (
    <div className={style.actionItems}>
      <div className={`${style.actionsContainer}`}>
        {items?.map(item => (
          <button className={style.actionItem} key={item.id} onClick={handleItemClick(item.doAction)}> {item.icon}</button>
        ))}
      </div>
    </div>
  )
}

export default ActionItems