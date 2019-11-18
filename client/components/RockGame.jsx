import React from 'react'
import Coyote from './Coyote'
import RoadRunner from './RoadRunner'
import Rock from './Rock'

let width = window.screen.width
let height = window.screen.height

class RockGame extends React.Component{
  constructor(props){
    super(props)
    this.state={
      coyote:{
        x: (width/4)-100,
        y: height-100
      },
      roadRunner:{
        x: (width - width/4)-100,
        y: height-100
      },
      rocks: Array.from({length:5}, (v, x)=> this.makeRocks(x))
    }
    this.drop()
  }

  makeRocks = (x) => {
    let randomX = (width/10)*x
    let randomY = (Math.random()*height)-height
    return (
      {
        x:randomX,
        y:randomY,
        transition: '0.2s',
      }
    )
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
        rocks : this.state.rocks.map(rock=> this.moveRock(rock))
      })
    }, 20);
  }

  moveRock = (rock) => {
    if(rock.y> height+100){
      return {x:rock.x, y:-100, transition: null}
    }
    return {x:rock.x, y:rock.y+5, transition: '0.02s'}
  }

  render(){
    return(
      <>
        <div className='halfScreenContainer' style={{height:height, width: width/2 -20}}>
           <Coyote transition = {this.state.transition} x={this.state.coyote.x} y={this.state.coyote.y}/>
            <RoadRunner transition = {this.state.transition} x={this.state.roadRunner.x} y={this.state.roadRunner.y}/>
            {this.state.rocks.map((rock, i) =>{
              return <Rock key={i} transition = {this.state.rocks[i].transition} x={rock.x} y={rock.y}/>
            })}
        </div>
      </>
    )
  }
}

export default RockGame