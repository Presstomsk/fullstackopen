import { createSlice } from "@reduxjs/toolkit"

const defaultNotification = {
    notification: '',
    isVisible: false
}

const notificationSlice = createSlice({
    name: 'notification',  
    initialState: defaultNotification,
    reducers: {
      votedNotification(state, action) {              
          return({
            notification: `you voted ${action.payload}`,
            isVisible: true  
          })            
        },
      addedNotification(state, action) {
          return({
            notification: `you added ${action.payload}` ,
            isVisible: true  
          })                        
        },
      resetNotification() {
          return defaultNotification                         
        },   
    }
  })

export const { votedNotification, addedNotification, resetNotification } = notificationSlice.actions
  
export default notificationSlice.reducer