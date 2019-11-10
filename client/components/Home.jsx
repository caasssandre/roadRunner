import React from 'react'
import Coyote from './Coyote'
import RoadRunner from './RoadRunner'
import Seeds from './Seeds'
import Sounds from './Sounds'


let adjustments = {
  90 : {
    target : 'coyote',
    x : 0,
    y: - 8
  },
  81 : {
    target : 'coyote',
    x : -8,
    y: 0
  },
  83 : {
    target : 'coyote',
    x : +8,
    y: 0
  },
  87 : {
    target : 'coyote',
    x : 0,
    y: +8
  },
  79 : {
    target : 'roadRunner',
    x : 0,
    y: - 15
  },
  75 : {
    target : 'roadRunner',
    x : -15,
    y: 0
  },
  76 : {
    target : 'roadRunner',
    x : +15,
    y: 0
  },
  186 : {
    target : 'roadRunner',
    x : 0,
    y: +15
  },
}


class Home extends React.Component {
  constructor(props){
    super(props)
    this.state={
      coyote:{
        x: (window.screen.width/2) - 150,
        y: 300,
        score: 0
      },
      roadRunner:{
        x: (window.screen.width/2) + 30,
        y: 300,
        score: 0
      },
      seeds1:{
        x: Math.random()*(window.screen.width-300)+200,
        y: Math.random()*(window.screen.height-200)+200
      },
      seeds2:{
        x: Math.random()*(window.screen.width-300)+200,
        y: Math.random()*(window.screen.height-200)+200
      },
      isFullScreen:false,
      coyoteScores:false,
      roadRunnerScores:false,
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

  handleCollision = () => {
    if(Math.abs(this.state.coyote.x - this.state.roadRunner.x) < 100  && Math.abs(this.state.coyote.y - this.state.roadRunner.y) < 90){
      this.setState({
        coyote:{
          x: Math.random()*(window.screen.width-300)+200,
          y: Math.random()*(window.screen.height-300)+200,
          score : this.state.coyote.score + 1,
        },
        roadRunner:{
          x: Math.random()*(window.screen.width-300)+200,
          y: Math.random()*(window.screen.height-300)+200,
          score : this.state.roadRunner.score
        },
        coyoteScores: true
      })
    }
    else{
      setTimeout(()=>this.setState({
        coyoteScores : false
      }), 5000
      )
    }
  }

  handleSeeds = () => {
    if(Math.abs(this.state.seeds1.x - this.state.roadRunner.x) < 100  && Math.abs(this.state.seeds1.y - this.state.roadRunner.y) < 90){
      this.setState({
        seeds1:{
          x: Math.random()*(window.screen.width-300)+200,
          y: Math.random()*(window.screen.height-300)+200,
        },
        roadRunner:{
          x: this.state.roadRunner.x,
          y: this.state.roadRunner.y,
          score: this.state.roadRunner.score +1
        },
        roadRunnerScores: true
      })
    }
    else if(Math.abs(this.state.seeds2.x - this.state.roadRunner.x) < 100  && Math.abs(this.state.seeds2.y - this.state.roadRunner.y) < 90){
      this.setState({
        seeds2:{
          x: Math.random()*(window.screen.width-300)+200,
          y: Math.random()*(window.screen.height-300)+200,
        },
        roadRunner:{
          x: this.state.roadRunner.x,
          y: this.state.roadRunner.y,
          score: this.state.roadRunner.score +1
        },
        roadRunnerScores: true        
      })
    }
    else{
      setTimeout(()=>this.setState({
        roadRunnerScores : false
      }), 5000
      )
    }
  }

  handleKeyPress = (evt) => {
    console.log(this.state.coyoteScores)
    if(this.state[adjustments[evt.keyCode].target].x > window.screen.width){
        this.setState({
          [adjustments[evt.keyCode].target] : {
            x: -80,
            y: this.state[adjustments[evt.keyCode].target].y,
            score: this.state[adjustments[evt.keyCode].target].score
          }
        })
    }
    else if(this.state[adjustments[evt.keyCode].target].y > window.screen.height){
      this.setState({
        [adjustments[evt.keyCode].target] : {
          x: this.state[adjustments[evt.keyCode].target].x,
          y: -80,
          score: this.state[adjustments[evt.keyCode].target].score
        }
      })
    }
    else if(this.state[adjustments[evt.keyCode].target].y < -80){
      this.setState({
        [adjustments[evt.keyCode].target] : {
          x: this.state[adjustments[evt.keyCode].target].x + adjustments[evt.keyCode].x,
          y: window.screen.height,
          score: this.state[adjustments[evt.keyCode].target].score
        }
      })
    }
    else if(this.state[adjustments[evt.keyCode].target].x < -80){
      this.setState({
        [adjustments[evt.keyCode].target] : {
          x: window.screen.width,
          y:this.state[adjustments[evt.keyCode].target].y + adjustments[evt.keyCode].y,
          score: this.state[adjustments[evt.keyCode].target].score
        }
      })
    }
    else{
      this.setState({
        [adjustments[evt.keyCode].target] : {
          x: this.state[adjustments[evt.keyCode].target].x + adjustments[evt.keyCode].x,
          y: this.state[adjustments[evt.keyCode].target].y + adjustments[evt.keyCode].y,
          score: this.state[adjustments[evt.keyCode].target].score
        }
      })
      this.handleCollision()
      this.handleSeeds()
    }
  }

  render(){
    return(
      <>
      {!this.state.isFullScreen && <div id='startGame' onClick={() => this.toggleFullScreen()}>Start Game</div>}
      <h2>coyote {this.state.coyote.score}, road runner {this.state.roadRunner.score}</h2>
      <div style={{
         width:window.screen.width,
         height:window.screen.height
         }}>
        <Coyote x={this.state.coyote.x} y={this.state.coyote.y}/>
        <RoadRunner x={this.state.roadRunner.x} y={this.state.roadRunner.y}/>
        <Seeds x={this.state.seeds1.x} y={this.state.seeds1.y}/>
        <Seeds x={this.state.seeds2.x} y={this.state.seeds2.y}/>
      </div>
      {this.state.coyoteScores && <Sounds url={'/sounds/beepbeep.mp3'}/>}
      {this.state.roadRunnerScores && <Sounds url={'/sounds/seeds.mp3'}/>}
      </>
    )
  }
}

export default Home