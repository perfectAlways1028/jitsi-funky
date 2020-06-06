import * as React from 'react'
import { View, Text, ViewStyle, TextStyle } from 'react-native'
import { VideoScreen } from '../Video-screen'
import { AudioScreen } from '../Audio-screen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Slider from '@react-native-community/slider';

export interface ThumbnailScreenProps {
  videoTrack: any;
  audioTrack: any;
  name: string;
  id: string;
  isDominantParticipant: boolean;
}

const DOMINANT_ICON_VIEW: ViewStyle = {
  position: 'absolute',
  flex: 1,
  left: 5,
  top: 5
}

const CONTAINER_VIEW: ViewStyle = {
  padding: 5,
  zIndex: 2,
  width: '100%',
  height: '100%',
  flex: 1
}

const VIDEO_VIEW: ViewStyle = {
  borderWidth: 1.5,
  width: 100,
  height: 100
}

const TRACKS_VIEW: ViewStyle = {
  flex: 1
}

const TEXT_VIEW: TextStyle = {
  color: 'white'
}

const AUDIO_VIEW: ViewStyle = {
  position: 'absolute',
  left: 0,
  bottom: 5,
}


export class ThumbnailScreen extends React.Component<ThumbnailScreenProps, {}> {
  constructor (props) {
    super(props)
    this.state = {
      volume : 1
    }
  }

  renderVideoTrack = () => {
    if (this.props.videoTrack) {
      return <VideoScreen zOrder={0} stream={this.props.videoTrack.jitsiTrack.getOriginalStream()} />
    } else {
      return null
    }
  }
  volumeChange = (value) => {
    this.setState({volume: value});

    if(this.props.videoTrack) {
      if(value == 0 && this.props.videoTrack.jitsiTrack.muted == false) {
        this.props.videoTrack.jitsiTrack.setMute(true);
      }else if(value >0 && this.props.videoTrack.jitsiTrack.muted == true) {
        this.props.videoTrack.jitsiTrack.setMute(false);
      }
      this.props.videoTrack.jitsiTrack.setAudioLevel(value, this.props.tpc);
    }
    if(this.props.audioTrack) {
      if(value == 0 && this.props.videoTrack.jitsiTrack.muted == false) {
        this.props.audioTrack.jitsiTrack.setMute(true);
      }else if(value >0 && this.props.videoTrack.jitsiTrack.muted == true) {
        this.props.audioTrack.jitsiTrack.setMute(false);
      }
      this.props.audioTrack.jitsiTrack.setAudioLevel(value, this.props.tpc);
    }
 
  }

  render () {
    let borderColor = 'white'

    if (this.props.isDominantParticipant) {
      borderColor = 'blue'
    }

    console.log(this.props.name+ " audio:", this.props.audioTrack)
    console.log(this.props.name+ " video:", this.props.videoTrack)
    console.log("tpc: ", this.props.tpc)
    if( this.props.videoTrack)
    console.log("streamUrl",  this.props.videoTrack.jitsiTrack.getOriginalStream().toURL() )


    return (
      <View style={CONTAINER_VIEW}>
        <Text style={TEXT_VIEW}>
          {this.props.name}
        </Text>
        <View style={TRACKS_VIEW}>
          <View style={[VIDEO_VIEW, { borderColor: borderColor }]}>
            { this.renderVideoTrack() }
            <View style={DOMINANT_ICON_VIEW}>
              { this.props.isDominantParticipant && <Icon name={'phone-in-talk'} color='blue' size={20}/> }
            </View>
            {
              !(this.props.audioTrack && this.props.audioTrack.local) &&
              <View style={AUDIO_VIEW}>
                <Slider
                    style={{width: 100, height: 10}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    value={this.state.volume}
                    onValueChange={(value)=> { this.volumeChange(value); }}/>
              
            </View>
            }

          </View>
        </View>
      </View>
    )
  }
}
