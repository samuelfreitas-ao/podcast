import { GetStaticProps } from 'next'
import { api } from '../services/api'

type Episodes = {
  id: string
  title: string
  members: string
  published_at: string
  thumbnail: string
  description: string
  file: {
    url: string
    type: string
    duration: number
  }
}
type HomeProps = {
  episodes: Episodes[]
}

export default function Home(props: HomeProps) {
  return (
    <div>{JSON.stringify(props.episodes)}</div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    }
  })
  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8 //generate new html page after 8h
  }
}