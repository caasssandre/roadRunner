const randomX = () => {return Math.random()*(window.screen.width-300)+200}
const randomY = () => {return Math.random()*(window.screen.height-300)+200}

let adjustments = {
  KeyW : {
    target : 'coyote',
    x : 0, y: - 5
  },
  KeyA : {
    target : 'coyote',
    x : -5, y: 0
  },
  KeyD : {
    target : 'coyote',
    x : +5, y: 0
  },
  KeyS : {
    target : 'coyote',
    x : 0, y: +5
  },
  KeyO : {
    target : 'roadRunner',
    x : 0, y: - 5
  },
  KeyK : {
    target : 'roadRunner',
    x : -5, y: 0
  },
  Semicolon : {
    target : 'roadRunner',
    x : +5, y: 0
  },
  KeyL : {
    target : 'roadRunner',
    x : 0, y: +5
  },
}

function handleCollision(object){
  if(Math.abs(object.state.coyote.x - object.state.roadRunner.x) < 100  && Math.abs(object.state.coyote.y - object.state.roadRunner.y) < 90){
    object.setState({
      coyote:{
        x: randomX(),
        y: randomY(),
      },
      roadRunner:{
        x: randomX(),
        y: randomY(),
      },
      coyoteScore: object.state.coyoteScore +1,
      coyoteScores: true,
      transition: null
    })
  }
  else{
    object.setState({
      coyoteScores : false
    })
  }
}

function handleSeeds(object){
  if(Math.abs(object.state.seeds1.x - object.state.roadRunner.x) < 100  && Math.abs(object.state.seeds1.y - object.state.roadRunner.y) < 90){
    object.setState({
      seeds1:{
        x: randomX(),
        y: randomY(),
      },
      roadRunner:{
        x: object.state.roadRunner.x,
        y: object.state.roadRunner.y,
      },
      roadRunnerScore: object.state.roadRunnerScore + 1,
      roadRunnerScores: true,
      transition: null
    })
  }
  else if(Math.abs(object.state.seeds2.x - object.state.roadRunner.x) < 100  && Math.abs(object.state.seeds2.y - object.state.roadRunner.y) < 90){
    object.setState({
      seeds2:{
        x: randomX(),
        y: randomY(),
      },
      roadRunner:{
        x: object.state.roadRunner.x,
        y: object.state.roadRunner.y,
      },
      roadRunnerScore: object.state.roadRunnerScore + 1,
      roadRunnerScores: true,        
      transition: null
    })
  }
  // else{
    //   setTimeout(()=>this.setState({
    //     roadRunnerScores : false
    //   }), 5000
    //   )
    // }
}

function accelerate(object, animal, keyCode){
  if(object.state.speedCoefficient < 30){
    object.setState({
      [animal] : {
        x: object.state[animal].x + (adjustments[keyCode].x * object.state.speedCoefficient),
        y: object.state[animal].y + (adjustments[keyCode].y * object.state.speedCoefficient),
      },
      speedCoefficient : object.state.speedCoefficient +1,
      transition:'0.1s'
    })
  }
  else if(object.state.speedCoefficient == 30){
    object.setState({
      [animal] : {
        x: object.state[animal].x + (adjustments[keyCode].x * object.state.speedCoefficient),
        y: object.state[animal].y + (adjustments[keyCode].y * object.state.speedCoefficient),
      },
      speedCoefficient : object.state.speedCoefficient,
      transition:'0.1s'
    })
  }
  object.handleCollision()
  object.handleSeeds()
}

function handleKeyPress(object, evt){
  let animal = adjustments[evt.code].target
    if(object.state[animal].x > window.screen.width){
        object.setState({
          transition : null,
          [animal] : {
            x: -80,
            y: object.state[animal].y,
          }
        })
    }
    else if(object.state[animal].y > window.screen.height){
      object.setState({
          transition : null,
          [animal] : {
          x: object.state[animal].x,
          y: -80,
        }
      })
    }
    else if(object.state[animal].y < -80){
      object.setState({
          transition : null,
          [animal] : {
          x: object.state[animal].x + adjustments[evt.code].x,
          y: window.screen.height,
        }
      })
    }
    else if(object.state[animal].x < -80){
      object.setState({
          transition : null,
          [animal] : {
          x: window.screen.width,
          y:object.state[animal].y + adjustments[evt.code].y,
        }
      })
    }
    else{
    object.accelerate(animal, evt.code)
    }
}

module.exports = {
  handleCollision,
  handleSeeds,
  accelerate,
  handleKeyPress
}