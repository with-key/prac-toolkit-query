import React from "react"
import {
  useAddPostMutation,
  useGetPostsQuery,
} from "./features/counter/todosAPI"

import { Link } from "react-router-dom"

function App() {
  const { data } = useGetPostsQuery()
  const valueRef = React.useRef<HTMLInputElement>(null)

  const [addPost, result] = useAddPostMutation()

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {data?.map((todo) => {
        return <Link to={`/todos/${todo.id}`}>{todo.title}</Link>
      })}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          addPost({
            title: valueRef.current?.value,
            done: false,
            author: valueRef.current?.value,
          })
        }}
      >
        <input type="text" ref={valueRef} />
        <button>저장</button>
      </form>
    </div>
  )
}

export default App
