import React from 'react'
//import { Route, Redirect } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Main from './main'
import styles from './App.module.css'

const App=()=> {
   return(
        <BrowserRouter>
          <div className={styles.App}>
            <Main />
          </div>
        </BrowserRouter>
     
   )
  }
export default App
