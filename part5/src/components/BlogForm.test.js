import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {

  test('click button', async () => {
    const handleAddBlog = jest.fn()
    const notificate = jest.fn()

    render(<BlogForm createBlog={handleAddBlog} createNotification={notificate}/>)

    const title = screen.getByPlaceholderText('write title here')
    const author = screen.getByPlaceholderText('write author here')
    const url = screen.getByPlaceholderText('write url here')
    const create = screen.getByText('create')

    const user = userEvent.setup()

    await userEvent.type(title, 'testing a title...')
    await userEvent.type(author, 'testing a author...')
    await userEvent.type(url, 'testing a url...')

    await user.click(create)

    expect(handleAddBlog.mock.calls).toHaveLength(1)
    expect(notificate.mock.calls).toHaveLength(1)
    expect(handleAddBlog.mock.calls[0][0].title).toBe('testing a title...')
    expect(handleAddBlog.mock.calls[0][0].author).toBe('testing a author...')
    expect(handleAddBlog.mock.calls[0][0].url).toBe('testing a url...')
    expect(notificate.mock.calls[0][0].message).toBe('A new blog testing a title... by testing a author... added')
    expect(notificate.mock.calls[0][0].isError).toBe(false)
  })
})