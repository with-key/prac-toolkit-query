import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const url = `http://localhost:3001/posts`
const TODOS = "TODOS"

type Post = {
  id: number
  title: string
  author: string
  done: boolean
}

export const todoAPI = createApi({
  reducerPath: "todoAPI",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  tagTypes: [TODOS],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/",
      transformResponse: (res: Post[], meta, arg) => {
        console.log(meta)
        return res.map((post) => ({ ...post, done: false }))
      },
    }),

    getPost: builder.query<Post, string | undefined>({
      query: (id) => ({ url: `/${id}` }),

      // 쿼리에서 반환된 캐시된 데이터에 어떤 태그를 첨부할지 결정한다.
      providesTags: (result, error, arg) => {
        return [{ type: TODOS, id: arg }]
      },
    }),

    addPost: builder.mutation<Post, Partial<Post>>({
      query: (paylaod) => {
        return {
          url: "/",
          method: "POST",
          body: paylaod,
        }
      },
    }),
  }),
})

export const { useGetPostQuery, useGetPostsQuery, useAddPostMutation } = todoAPI
