import UserVideoComponent from './UserVideoComponent';
import { useSelector } from 'react-redux';

export default function MainVideo (props) {
  const mainStreamManager = useSelector(state => state.rtc.streamManager)
  return (
    <div className=" w-96 h-80" id="main-video">
      {
        mainStreamManager ? 
        <UserVideoComponent streamManager={mainStreamManager} 
        height={props.height}
        width={props.width}
        />
        :
        null

      }
    </div>
  )
}