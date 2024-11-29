import { hc } from 'hono/client'
import { useState } from 'hono/jsx'
import { render } from 'hono/jsx/dom'
import type { ApiRoutes } from '.'

const client = hc<ApiRoutes>('/')

function App() {
  const [name, setName] = useState('no name')

  const handleClick = async (e: Event) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const input = form.elements.namedItem('name') as HTMLInputElement
    const res = await client.api.$post({
      form: {
        name: input.value ?? name
      }
    })
    const data = await res.json()
    setName(data.name)
  }

  return (
    <>
      <h1>Hello {name}!!</h1>
      <form onSubmit={handleClick}>
        <input name="name" autocomplete="off" />
        <button type="submit">Send</button>
      </form>
    </>
  )
}

const domNode = document.getElementById('root')!
render(<App />, domNode)
