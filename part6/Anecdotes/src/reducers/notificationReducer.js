import { createSlice } from "@reduxjs/toolkit"

const defaultNotification = {
    notification: '',
    isVisible: false
}

const notificationSlice = createSlice({
    name: 'notification',  
    initialState: defaultNotification,
    reducers: {     
      addedNotification(state, action) {
          return({
            notification: action.payload,
            isVisible: true  
          })                        
        },
      resetNotification() {
          return defaultNotification                         
        },   
    }
  })

export const setNotification = (content, timeout) => {
    return dispatch => {
        dispatch(addedNotification(content))        
        setTimeout(() => {
            dispatch(resetNotification())            
          }, timeout*1000)
    }
}

export const { addedNotification, resetNotification } = notificationSlice.actions
  
export default notificationSlice.reducer