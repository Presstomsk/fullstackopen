import { useNotificationValue } from "../NotificationContext"

const Notification = () => {
  const notificationValue = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: notificationValue.isVisible ? '' : 'none'
  }
  
  return (
    <div style={style}>
      {notificationValue.notification}
    </div>
  )
}

export default Notification
