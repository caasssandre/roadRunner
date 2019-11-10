import React from 'react'
import Sound from 'react-sound'


class Sounds extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Sound
        url={this.props.url}
        playStatus={Sound.status.PLAYING}
        playFromPosition={0}
        onLoading={this.handleSongLoading}
        onPlaying={this.handleSongPlaying}
        onFinishedPlaying={this.handleSongFinishedPlaying}
      />
    )
  }
}

export default Sounds
