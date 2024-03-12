import { createAnecdote } from "../../requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotificationDispatch, setNotification, resetNotification } from "../NotificationContext" 

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const notificate = (notification) => {
    dispatch(setNotification(notification))        
    setTimeout(() => {
        dispatch(resetNotification())            
      }, 5000)
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notificate(`you added ${newAnecdote.content}`)
    },
    onError: (result) => {      
      notificate(result.response.data.error)
    }, 
})

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
