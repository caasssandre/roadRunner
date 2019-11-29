import React from 'react'
import StartForm from './StartForm'
import CatchGame from './CatchGame'
import RockGame from './RockGame'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      player1: {score: 0, name:''},
      player2: {score: 0, name:''},
      gameCount: 0
    }
  }

  incrementGameCount = () => {
    this.setState({    
      gameCount: this.state.gameCount+1
    })
  }

  keepScores = (scoreObject) => {
    this.setState({
      player1: {...this.state.player1, score: scoreObject.player1Score},
      player2: {...this.state.player2, score: scoreObject.player2Score},
    })
  }

  keepName = (nameObject) => {
    this.setState({
      player1: {...this.state.player1, name: nameObject.player1},
      player2: {...this.state.player2, name: nameObject.player2},
    })
  }

  render(){
    return (
      <>
      {this.state.gameCount == 0 && <StartForm keepName={this.keepName} incrementGameCount = {this.incrementGameCount}/>}
      {this.state.gameCount == 1 && 
        <CatchGame
          player2 = {this.state.player2}
          player1 = {this.state.player1}
          incrementGameCount = {this.incrementGameCount}
          keepScores = {this.keepScores}/>}
      {this.state.gameCount == 2 && <RockGame
          player2 = {this.state.player2}
          player1 = {this.state.player1}
          incrementGameCount = {this.incrementGameCount}
          keepScores = {this.keepScores}/>}
      </>
    )
  }
}

export default App
