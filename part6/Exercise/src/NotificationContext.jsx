/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react'

const defaultNotification = {
  notification: '',
  isVisible: false
}

export const notificationReducer = (state = defaultNotification, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.payload
        case 'RESET_NOTIFICATION':
            return defaultNotification
        default:
            return defaultNotification
    }
}

const notificationContext = createContext()

export const setNotification = (notification) => ({
  type: 'SET_NOTIFICATION',
  payload: {
    notification: notification,
    isVisible: true
  }
})

export const resetNotification = () => ({
  type: 'RESET_NOTIFICATION',
  payload: defaultNotification
})

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(notificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(notificationContext)
  return notificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [state, notificationDispatch] = useReducer(notificationReducer, defaultNotification)

  return (
    <notificationContext.Provider value={[state, notificationDispatch] }>
      {props.children}
    </notificationContext.Provider>
  )
}

