export type User = {
  display_name: string
  profile_image: string
  creation_date: number
  last_access_date: number
  reputation: number
  view_count: number
  answer_count: number
  question_count: number
  reputation_change_year: number
  about_me: string
  badge_counts: {
    bronze: number
    silver: number
    gold: number
  },
  error_message: string
}
