import { createSlice } from "@reduxjs/toolkit"

const defaultFilter = ''

const filterSlice = createSlice({
    name: 'filter',  
    initialState: defaultFilter,
    reducers: {
      updateFilter(state, action) {        
          return `${action.payload}`             
        } 
    }
  })

export const { updateFilter } = filterSlice.actions
  
export default filterSlice.reducer