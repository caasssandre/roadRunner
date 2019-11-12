import React from 'react'
import Coyote from './Coyote'
import RoadRunner from './RoadRunner'
import Seeds from './Seeds'
import Sounds from './Sounds'
import catchingGame from './catchingGame'


const randomX = () => {return Math.random()*(window.screen.width-300)+200}
const randomY = () => {return Math.random()*(window.screen.height-300)+200}

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state={
      coyote:{
        x: (window.screen.width/2) - 150,
        y: 300,
      },
      roadRunner:{
        x: (window.screen.width/2) + 30,
        y: 300,
      },
      seeds1:{
        x: randomX(),
        y: randomY()
      },
      seeds2:{
        x: randomX(),
        y: randomY()
      },
      isFullScreen:false,
      coyoteScores:false,
      roadRunnerScores:false,
      coyoteScore: 0,
      roadRunnerScore:0,
      speedCoefficient: 1,
      transition: '0.1s'
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
    catchingGame.handleCollision(this)
  }

  handleSeeds = () => {
    catchingGame.handleSeeds(this)
  }

  handleKeyPress = (evt) => {
    catchingGame.handleKeyPress(this, evt)
  }

  accelerate = (animal, keyCode) => {
    catchingGame.accelerate(this, animal, keyCode)
  }

  render(){
    return(
      <>
      {!this.state.isFullScreen && <div id='startGame' onClick={() => this.toggleFullScreen()}>Start Game</div>}
      <h2>coyote {this.state.coyoteScore}, road runner {this.state.roadRunnerScore}</h2>
      <div id='app' style={{
         width:window.screen.width,
         height:window.screen.height
         }}>
        <Coyote transition = {this.state.transition} x={this.state.coyote.x} y={this.state.coyote.y}/>
        <RoadRunner transition = {this.state.transition} x={this.state.roadRunner.x} y={this.state.roadRunner.y}/>
        <Seeds x={this.state.seeds1.x} y={this.state.seeds1.y}/>
        <Seeds x={this.state.seeds2.x} y={this.state.seeds2.y}/>
      </div>
      {/* {this.state.coyoteScores && <Sounds url={'/sounds/beepbeep.mp3'} />}
      {this.state.roadRunnerScores && <Sounds url={'/sounds/seeds.mp3'} handleSongFinishedPlaying ={()=>{this.setState({
        roadRunnerScores : false})}}/>} */}
      </>
    )
  }
}

export default Home