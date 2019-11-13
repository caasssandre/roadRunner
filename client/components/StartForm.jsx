import React from 'react'

class StartForm extends React.Component {
  constructor(props){
    super(props)
    this.state={
      player1 : '',
      player2 : ''
    }
  }

  handleChange=(e)=>{
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit=(e)=>{
    e.preventDefault()
    this.props.keepName(this.state)
    this.props.incrementGameCount()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor='name1'>Player 1 Name</label>
          <input
            type='text'
            name='player1'
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor='name2'>Player 2 Name</label>
          <input
            type='text'
            name='player2'
            onChange={this.handleChange}
          />
        </div>
        <input type='submit' />
      </form>
    )
  }
}

export default StartForm