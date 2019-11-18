import React from 'react'
import { tsConstructorType } from '@babel/types'

class Rock extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <img id='rock' style={{
        transition: this.props.transition,
        transform : 'translate(' + this.props.x + 'px, ' + this.props.y + 'px)',
      }} src="/images/rock.png" alt="rock"/>
    )
  }
}

export default Rock