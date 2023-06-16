import { useState, useEffect } from 'react';
import './WebKeyboard.scss';
import { keys } from './key-map';

function WebKeyboard() {
  const [shiftOn, setShiftOn] = useState(false);

  const fireKey = (key) => {
    if (shiftOn) {
      console.log(keys[key].vals[1]);
    } else {
      console.log(keys[key].vals[0]);
    }
  }

  return (
    <div className="WebKeyboard">
      {Object.keys(keys).map((key, index) => {
        const keyInfo = keys[key];

        return <div
          key={index}
          className={`WebKeyboard__key ${keyInfo?.class}`} onClick={() => fireKey(key)}
          style={{
            top: `${keyInfo.loc.y}`,
            left: `${keyInfo.loc.x}`,
            transform: keyInfo.loc?.rotation ? `rotate(${keyInfo.loc.rotation}deg)` : '',
          }}
        >
          <div className="WebKeyboard__display-key">{keyInfo?.alt || key}</div>
        </div>
      })}
    </div>
  );
}

export default WebKeyboard;
