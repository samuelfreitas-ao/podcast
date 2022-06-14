import format from 'date-fns/format'
import pt from 'date-fns/locale/pt-BR'
import Link from 'next/link'

import styles from './styles.module.scss'
export function Header() {
    const currentData = format(new Date(), 'EEEEEE, d MMMM', {
        locale: pt
    })
    return (
        <header className={styles.headerContainer}>
            <Link href={'/'}>
                <a><img src="/logo.svg" alt="Podcast" /></a>
            </Link>
            <p>O melhor para você ouvir, sempre</p>
            <span>{currentData}</span>
        </header>
    )
}