import React from 'react'

class Seeds extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <img style={{
        left:this.props.x,
        top:this.props.y
      }}src="/images/seeds.png" alt="Seeds"/>
    )
  }
}

export default Seeds
