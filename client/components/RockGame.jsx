import React from 'react'
import Coyote from './Coyote'
import RoadRunner from './RoadRunner'
import Rock from './Rock'
import Pie from './Pie'

let width = window.screen.width
let height = window.screen.height

let adjustments = {
  KeyA : {
    target : 'coyote',
    x : -10, min: -100, max: (width/2)-100
  },
  KeyD : {
    target : 'coyote',
    x : +10, max: (width/2)-100, min: -100
  },
  KeyK : {
    target : 'roadRunner',
    x : -10, min: -100, max: (width)-100
  },
  Semicolon : {
    target : 'roadRunner',
    x : +10, max: (width)-100, min: (width/2)-100
  },
}

function makeRocksArray(){
  let leftRocks = Array.from({length:5}, (v, x)=> this.makeItems(x))
  let rightRocks = leftRocks.map(rock => {
    return {
      y:rock.y,
      x:rock.x + (width/2),
      transition: '0.2s'
    }
  })
  let rocks = [...leftRocks, ... rightRocks]
  return rocks
}

let rocks= makeRocksArray(),


class RockGame extends React.Component{
  constructor(props){
    super(props)
    this.state={
      coyote:{
        x: (width/4)-100,
        transition: '0.1s'
      },
      roadRunner:{
        x: (width - width/4)-100,
        transition: '0.1s'
      },
      pies: this.makeRocksArray(),
      coyoteScore: this.props.player1.score,
      roadRunnerScore:this.props.player2.score,
    }
    this.drop()
  }

  makeItems = (x) => {
    const randomY = (Math.random()*height)-height
    return (
      {
        x:(width/10)*x,
        y:randomY,
        transition: '0.2s',
      }
    )
  }

  makePiesArray = () => {
    let rocks = this.state.rocks
    let pies = rocks.map(rock => {
      return {
        y:rock.y - 100,
        x:rock.x,
        transition: '0.2s'
      }
    })
    return pies
  }


  handlePieCollision = () => {
    this.state.pies.map(pie =>{
      if(Math.abs(this.state.coyote.x - pie.x) < 100 
        && pie.y == height){
          console.log('coyote eats a pie')
          // this.setState({
          //   coyoteScore : this.state.coyoteScore + 1
          // })
        }
        if(Math.abs(this.state.roadRunner.x - pie.x) < 100 
        && pie.y == height){
          console.log('road runner eats a pie')
          // this.setState({
          //   roadRunnerScore : this.state.roadRunnerScore + 1
          // })
        }
    })

  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress, false)
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  drop = () =>{
    setInterval(() => {
      this.setState({
        rocks : this.state.rocks.map(rock=> this.moveRock(rock)),
        pies: this.state.pies.map(pie=> this.moveRock(pie))
      })
    }, 20);
  }

  moveRock = (rock) => {
    if(rock.y> height+100){
      return {x:rock.x, y:-100, transition: null}
    }
    return {x:rock.x, y:rock.y+5, transition: '0.02s'}
  }

  handleKeyPress = (evt) =>{
    let animal = adjustments[evt.code].target
      if(this.state[animal].x >= adjustments[evt.code].max){
      this.setState({
        [animal] : {
          x: adjustments[evt.code].min+1,
          transition: null
        }
      })
    }
    else if (this.state[animal].x <= adjustments[evt.code].min){
        this.setState({
        [animal] : {
          x: adjustments[evt.code].max-1,
          transition: null
        }
      })
    }
    else {
      this.setState({
        [animal] : {
          x: this.state[animal].x + (adjustments[evt.code].x),
          transition: '0.1s'
        }
      })
    }
  }

  render(){
    this.handlePieCollision()
    return(
      <>
      
      <h2 className = 'scores'>{this.props.player1.name} {this.state.coyoteScore}, {this.props.player2.name} {this.state.roadRunnerScore}</h2>

        <div className='halfScreenContainer' style={{height:height, width: width/2 -20}}>
           <Coyote transition = {this.state.coyote.transition} x={this.state.coyote.x} y={height-100}/>
            <RoadRunner transition = {this.state.roadRunner.transition} x={this.state.roadRunner.x} y={height-100}/>
            {rocks.map((rock, i) =>{
              return <Rock key={i} transition = {rocks[i].transition} x={rock.x} y={rock.y}/>
            })}
            {pies.map((pie, i) =>{
              return <Pie key={i} transition = {pies[i].transition} x={pie.x} y={pie.y}/>
            })}
        </div>
      </>
    )
  }
}

export default RockGame