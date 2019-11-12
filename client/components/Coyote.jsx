import React from 'react'

class Coyote extends React.Component {
  constructor(props){
    super(props)
  }


  render(){
    return(
      <img style={{
        transition: this.props.transition,
        transform : 'translate(' + this.props.x + 'px, ' + this.props.y + 'px)',
      }}src="/images/coyote.png" alt="Coyote"/>
    )
  }
}

export default Coyote
