import React from 'react'
import Coyote from './Coyote'
import RoadRunner from './RoadRunner'


let adjustments = {
  90 : {
    target : 'coyote',
    x : 0,
    y: - 10
  },
  81 : {
    target : 'coyote',
    x : -10,
    y: 0
  },
  83 : {
    target : 'coyote',
    x : +10,
    y: 0
  },
  87 : {
    target : 'coyote',
    x : 0,
    y: +10
  },
  79 : {
    target : 'roadRunner',
    x : 0,
    y: - 10
  },
  75 : {
    target : 'roadRunner',
    x : -10,
    y: 0
  },
  76 : {
    target : 'roadRunner',
    x : +10,
    y: 0
  },
  186 : {
    target : 'roadRunner',
    x : 0,
    y: +10
  },
}


class Home extends React.Component {
  constructor(props){
    super(props)
    this.state={
      coyote:{
        x: (window.screen.width/2) - 150,
        y: 300
      },
      roadRunner:{
        x: (window.screen.width/2) + 30,
        y: 300
      },
      isFullScreen:false
    }
  }

  toggleFullScreen = () => {
    document.documentElement.requestFullscreen()
    this.setState({
      isFullScreen: !this.state.isFullScreen
    })
  }


  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress, false)
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  handleKeyPress = (evt) => {
    console.log(evt.keyCode)
    this.setState({
      [adjustments[evt.keyCode].target] : {
        x: this.state[adjustments[evt.keyCode].target].x + adjustments[evt.keyCode].x,
        y: this.state[adjustments[evt.keyCode].target].y + adjustments[evt.keyCode].y
      }
    })
  }

  render(){
    return(
      <>
      {!this.state.isFullScreen && <div id='startGame' onClick={() => this.toggleFullScreen()}>Start Game</div>}
      <div style={{
         width:window.screen.width,
         height:window.screen.height
         }}>
        <Coyote x={this.state.coyote.x} y={this.state.coyote.y}/>
        <RoadRunner x={this.state.roadRunner.x} y={this.state.roadRunner.y}/>
      </div>
      </>
    )
  }
}

export default Home