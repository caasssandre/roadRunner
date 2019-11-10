import React from 'react'

class Coyote extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <img style={{
        left:this.props.x,
        top:this.props.y
      }}src="/images/coyote.png" alt="Coyote"/>
    )
  }
}

export default Coyote
