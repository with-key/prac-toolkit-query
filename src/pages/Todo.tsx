import { useParams } from "react-router-dom"
import { useGetPostQuery } from "../features/counter/todosAPI"

const Todo = () => {
  const { id } = useParams()
  const { data, refetch, status } = useGetPostQuery(id, {})
  console.log(status)

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <div>{data?.title}</div>
      <button onClick={refetch}>refetch</button>
    </div>
  )
}

export default Todo
