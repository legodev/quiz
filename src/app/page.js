// app/page.js
'use client'

import Form from './components/Form'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>English Quiz</h1>
        <Form />
      </main>
    </div>
  )
}