import React from 'react'

class Seeds extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <img style={{
        transform : 'translate(' + this.props.x + 'px, ' + this.props.y + 'px)'
      }}src="/images/seeds.png" alt="Seeds"/>
    )
  }
}

export default Seeds
