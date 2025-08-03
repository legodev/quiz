import styles from './ListaNombres.module.css'
import Link from 'next/link'

export default function ListaNombres({ nombres, estrellas }) {
  const nuevos = nombres.sort((a,b) => b.estrellas - a.estrellas)
  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Ranking:</h3>
      <ul className={styles.listContainer}>
        {nuevos.map((item, index) => (
          <li className={styles.listItem} key={index}>
            <p className={styles.listName}>{item.nombre}</p>
            <p className={styles.listStar}> ⭐ {item.estrellas}</p>
          </li>
        ))}
      </ul>
      <Link className={styles.btn} href={'./'}>Home</Link>
    </section>
  )
}
