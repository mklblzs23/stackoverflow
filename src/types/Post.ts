export enum PostType {
  all,
  answer,
  question
}

export type Post = {
  post_id: number
  post_type: string
  title: string
  creation_date: number
  score: number
}
