import { OpenVidu } from 'openvidu-browser';

import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { setStreamManager } from '../../features/arena/rtcSlice';
import UserVideoComponent from './UserVideoComponent';
import registerServiceWorker from './../../registerServiceWorker';

// const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';
const APPLICATION_SERVER_URL = 'https://i10d211.p.ssafy.io/';

class Webrtc extends Component {
  constructor(props) {
    super(props);
    
    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      customSessionId: props.customSessionId,
      myUserName: props.userNickname,
      session: undefined,
      publisher: undefined,
      mainStreamManager: undefined,
      subscribers: [],
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeCustomSessionId = this.handleChangeCustomSessionId.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream
      });
    }
    this.props.action(stream)
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
    // this.joinSession()
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
    registerServiceWorker();
  }

  onbeforeunload(event) {
    this.leaveSession();
    this.props.action(undefined)
  }

  handleChangeCustomSessionId(e) {
    this.setState({
      customSessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on('streamCreated', (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on('streamDestroyed', (event) => {

          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on('exception', (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        this.getToken().then((token) => {
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession.connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              if (this.props.isPlayer) {
                // --- 5) Get your own camera stream ---
  
                // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                // element: we will manage it on our own) and with the desired properties
                let publisher = await this.OV.initPublisherAsync(undefined, { 
                  videoSource: "screen",  // The source of video. If undefined default webcam
                  publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
                  publishVideo: true, // Whether you want to start publishing with your video enabled or not
                  resolution: '1920x1080', // The resolution of your video
                  frameRate: 30, // The frame rate of your video
                  insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                  mirror: false, // Whether to mirror your local video or not
                });
  
                // --- 6) Publish your stream ---
  
                mySession.publish(publisher);
  
                // Obtain the current video device in use
                var devices = await this.OV.getDevices();
                var videoDevices = devices.filter(device => device.kind === 'videoinput');
                var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);
  
                // Set the main video in the page to display our webcam and store our Publisher
                this.setState({
                  currentVideoDevice: currentVideoDevice,
                  publisher: publisher,
                });

              }
            })
            .catch((error) => {
              console.log('There was an error connecting to the session:', error.code, error.message);
            });
        });
      },
    );
  }

  leaveSession() {

    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      customSessionId: 'SessionA',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      publisher: undefined
    });
  }

  render() {
    const customSessionId = this.state.customSessionId;
    const myUserName = this.props.userNickname;
    

    return (
      <div className='h-full'>
        {this.state.session === undefined ? (
          <form className="form-group" onSubmit={this.joinSession}>
            {/* <p>
              <label>Participant: </label>
              <input
                className="form-control"
                type="text"
                id="userName"
                value={myUserName}
                onChange={this.handleChangeUserName}
                required
              />
            </p>
            <p>
              <label> CustomSession: </label>
              <input
                className="form-control"
                type="text"
                id="customsessionId"
                value={customSessionId}
                onChange={this.handleChangeCustomSessionId}
                required
              />
            </p> */}
            <p className="text-center">
              <input className="btn btn-lg bg-rose-200" name="commit" type="submit" value="플레이어 화면보기" />
            </p>
          </form>
        ) : null}

        {this.state.session !== undefined ? (
          <div id="session h-full">
            {/* <div id="session-header">
              <h1 id="session-title">{customSessionId}</h1>
              <input
                className="btn btn-large btn-danger"
                type="button"
                id="buttonLeaveSession"
                onClick={this.leaveSession}
                value="Leave session"
              />
            </div> */}

            
            <div id="video-container" className='flex'>
              {/* {this.state.mainStreamManager !== undefined ? (
                <div id="main-video" className="col-md-6">
                  <UserVideoComponent streamManager={this.state.mainStreamManager} />

                </div>
              ) : null} */}
              {this.state.subscribers.map((sub, i) => {
                return(
                <div key={sub.id} className="stream-container me-4" onClick={() => this.handleMainVideoStream(sub)}>
                  <span>{sub.id}</span>
                  <UserVideoComponent 
                  streamManager={sub}
                  width={this.props.width}
                  height={this.props.height}
                  />
                </div>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  async getToken() {
    const res = await axios.post(APPLICATION_SERVER_URL + 'game/vidu/sessions', {customSessionId:this.state.customSessionId}, {
      headers: { 'Content-Type': 'application/json', },
    });
    console.log(res);
    const response = await axios.post(APPLICATION_SERVER_URL + 'game/vidu/sessions/' + this.state.customSessionId + '/connections', {}, {
      headers: { 'Content-Type': 'application/json', },
    });
    console.log(response);
    return response.data; // The token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: (action) => dispatch(setStreamManager(action))
  }
}

export default connect(null, mapDispatchToProps)(Webrtc);
