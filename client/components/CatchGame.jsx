import React from 'react'
import Coyote from './Coyote'
import RoadRunner from './RoadRunner'
import Seeds from './Seeds'
import Sounds from './Sounds'
import catchingGame from './catchingGame'


const randomX = () => {return Math.random()*(window.screen.width-300)+200}
const randomY = () => {return Math.random()*(window.screen.height-300)+200}

class CatchGame extends React.Component {
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
      // coyoteScores:false,
      // roadRunnerScores:false,
      coyoteScore: this.props.player1.score,
      roadRunnerScore:this.props.player2.score,
      speedCoefficient: 1,
      transition: '0.1s',
      gameOn: false,
      gameOver: false
    }
  }

  toggleFullScreen = () => {
    setTimeout(()=>this.nextGame(), 10000)
    this.state.isFullScreen ? document.exitFullscreen() :
    document.documentElement.requestFullscreen()
    this.setState({
      gameOn: true,
      isFullScreen: !this.state.isFullScreen
    })
  }

  nextGame = () => {
   this.setState({
     gameOn : false,
     gameOver: true
   })
  }

  startNextGame = () => {
    this.props.keepScores({
      player1Score :this.state.coyoteScore,
      player2Score :this.state.roadRunnerScore,
    })
    this.props.incrementGameCount()
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress, false)
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  handleKeyPress = (evt) => {
    this.state.gameOn ? catchingGame.handleKeyPress(this, evt):
      console.log('game is not on')
  }

  render(){
    return(
      <>
      {!this.state.gameOn && !this.state.gameOver ? <div className='startGame' onClick={() => this.toggleFullScreen()}>Start Game</div> : <button onClick={()=>this.toggleFullScreen()}>Exit Full screen</button>}
      <h2>{this.props.player1.name} {this.state.coyoteScore}, {this.props.player2.name} {this.state.roadRunnerScore}</h2>
      <div id='app' style={{
         width:window.screen.width,
         height:window.screen.height
         }}>
        <Coyote transition = {this.state.transition} x={this.state.coyote.x} y={this.state.coyote.y}/>
        <RoadRunner transition = {this.state.transition} x={this.state.roadRunner.x} y={this.state.roadRunner.y}/>
        <Seeds x={this.state.seeds1.x} y={this.state.seeds1.y}/>
        <Seeds x={this.state.seeds2.x} y={this.state.seeds2.y}/>
      </div>
      {this.state.gameOver && <div className='startGame' onClick={() => this.startNextGame()}>Next Game</div>}
      {/* {this.state.coyoteScores && <Sounds url={'/sounds/beepbeep.mp3'} />}
      {this.state.roadRunnerScores && <Sounds url={'/sounds/seeds.mp3'} handleSongFinishedPlaying ={()=>{this.setState({
        roadRunnerScores : false})}}/>} */}
      </>
    )
  }
}

export default CatchGame