import React from 'react'

class RoadRunner extends React.Component {
  render(){
    return(
      <img style={{
        left:this.props.x,
        top:this.props.y
      }}src="/images/road-runner.png" alt="Road Runner"/>
    )
  }
}

export default RoadRunner