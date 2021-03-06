import { GetStaticProps, GetStaticPaths } from 'next'

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { api } from '../../services/api'
import { usePlayer } from '../../contexts/PlayerContext'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

import styles from './episode.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

type Episode = {
    id: string
    title: string
    members: string
    publishedAt: string
    thumbnail: string
    description: string
    duration: number
    durationString: string
    url: string
}

type EpisodeProps = {
    episode: Episode
}

export default function Episode({ episode }: EpisodeProps) {
    const { play } = usePlayer()

    return (
        <div className={styles.episode}>
            <Head>
                <title>{episode.title} | Podcast</title>
            </Head>
            <div className={styles.thumbnailContainer}>
                <Link href="/">
                    <button type="button">
                        <img src="/arrow-left.svg" alt="Voltar" />
                    </button>
                </Link>
                <Image
                    width={700}
                    height={160}
                    src={episode.thumbnail}
                    objectFit="cover"
                />
                <button type="button" onClick={() => play(episode)}>
                    <img src="/play.svg" alt="Voltar" />
                </button>
            </div>
            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationString}</span>
            </header>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get(`/episodes`, {
        params: {
            _limit: 2,
            _sort: 'published_at',
            _order: 'desc',
        }
    })
    //To generate static pages on build for last 2 episodes
    const paths = data.map((episode: Episode) => ({
        params: { slug: episode.id }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx: any) => {
    const { slug } = ctx.params

    const { data } = await api.get(`/episodes/${slug}`)
    const episode = {
        id: data.id,
        title: data.title,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
        thumbnail: data.thumbnail,
        description: data.description,
        duration: Number(data.file.duration),
        durationString: convertDurationToTimeString(Number(data.file.duration)),
        url: data.file.url,
    }

    return {
        props: { episode },
        revalidate: 84600 //24h
    }
}