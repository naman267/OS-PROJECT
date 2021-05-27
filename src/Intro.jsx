import React from 'react'
import styles from './Intro.module.css'

const intro=()=>{
    return(
        <div className={styles.intro}>
            <h1 className={styles.h2}>Schedulling Algorithms</h1>
            <a href="/cpu"><button>
                Cpu Schedulling
            </button></a>
            <a href="/disk"><button>
                Disk Schedulling
            </button></a>
        </div>
    )
}
export default intro