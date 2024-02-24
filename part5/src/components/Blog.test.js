import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {

  let container
  let blog
  let currentUser
  let handleUpdateBlog
  let handleRemoveBlog
  let notificate

  beforeEach(() => {
    handleUpdateBlog = jest.fn()
    handleRemoveBlog = jest.fn()
    notificate = jest.fn()

    blog = {
      id: 1,
      title: 'Test blog',
      author: 'Roman',
      url: 'test@test.url',
      likes: 5,
      user: '1'
    }

    currentUser = {
      id: '1',
      name: 'Roman',
      username: 'root'
    }

    container = render(
      <Blog
        key={blog.id}
        blog={blog}
        currentUser={currentUser}
        handleUpdateBlog={handleUpdateBlog}
        handleRemoveBlog={handleRemoveBlog}
        createNotification={notificate}
      />
    ).container
  })

  test('blog screen only author and title', async () => {
    const visibleBlogInfo = container.querySelector('.visibleBlogInfo')
    const hiddenBlogInfo = container.querySelector('.hiddenBlogInfo')

    expect(visibleBlogInfo).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(visibleBlogInfo).not.toHaveStyle('display: none')
    expect(hiddenBlogInfo).toHaveStyle('display: none')
  })

  test('blog screen url, likes, publisher name when button click', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const visibleBlogInfo = container.querySelector('.visibleBlogInfo')
    const hiddenBlogInfo = container.querySelector('.hiddenBlogInfo')
    const url = hiddenBlogInfo.querySelector('.url')
    const likes = hiddenBlogInfo.querySelector('.likes')
    const publisher = hiddenBlogInfo.querySelector('.publisher')

    expect(visibleBlogInfo).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(visibleBlogInfo).toHaveStyle('display: none')
    expect(hiddenBlogInfo).not.toHaveStyle('display: none')
    expect(url).toHaveTextContent(`${blog.url}`)
    expect(likes).toHaveTextContent(`${blog.likes}`)
    expect(publisher).toHaveTextContent(`${currentUser.name}`)
  })

  test('click to like button', async () => {
    const user = userEvent.setup()
    const view = screen.getByText('view')
    const like = screen.getByText('like')
    await user.click(view)
    await user.click(like)
    await user.click(like)

    const hiddenBlogInfo = container.querySelector('.hiddenBlogInfo')
    const likes = hiddenBlogInfo.querySelector('.likes')

    expect(hiddenBlogInfo).not.toHaveStyle('display: none')
    expect(handleUpdateBlog.mock.calls).toHaveLength(2)
    expect(notificate.mock.calls).toHaveLength(2)
    expect(likes).toHaveTextContent(`${blog.likes + 2}`)
  })

})