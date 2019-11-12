import React from 'react'

class RoadRunner extends React.Component {
  render(){
    return(
      <img style={{
        transition: this.props.transition,
        transform : 'translate(' + this.props.x + 'px, ' + this.props.y + 'px)',
      }}src="/images/road-runner.png" alt="Road Runner"/>
    )
  }
}

export default RoadRunner