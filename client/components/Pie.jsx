import React from 'react'

class Pie extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <img className='pie' style={{
        transition: this.props.transition,
        transform : 'translate(' + this.props.x + 'px, ' + this.props.y + 'px)',
      }} src="/images/pie.png" alt="pie"/>
    )
  }
}

export default Pie