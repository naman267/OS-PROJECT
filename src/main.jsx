import React from 'react'
import { Route} from 'react-router-dom'
import Intro from './Intro'
import Disk from './DISK/Disk'
import Cpu from './Cpu'
const main= (props) => {
  return (
    <>
      <Route path="/disk" exact component={Disk} />
      <Route path="/cpu" exact component={Cpu} />
      <Route path="/" exact component={Intro} />


      {/* <Route path="/" exact component={Questions} /> */}
      {/* ---------------CHANGE THIS ROUTE FOR POSTS---------------- */}

    </>
  )
}
export default main
