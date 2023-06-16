import { useState, useEffect } from 'react';
import './WebKeyboard.scss';
import { keys } from './key-map';
import { cleanup } from '@testing-library/react';

let cleanUpTimeout;

function WebKeyboard() {
  const [activeKeys, setActiveKeys] = useState([]);
  const [shiftOn, setShiftOn] = useState(false);

  const keyOn = (key) => {
    if (!(activeKeys.includes(key))) {
      setActiveKeys([...activeKeys, key]);
    }

    if (shiftOn) {
      console.log(keys[key].vals[1]);
    } else {
      console.log(keys[key].vals[0]);
    }
  }

  const keyOff = (key) => {
    clearTimeout(cleanUpTimeout);

    setTimeout(() => {
      setActiveKeys(activeKeys.filter(keyActive => keyActive !== key));
    }, 100);

    cleanUpTimeout = setTimeout(() => {
      console.log('clean up');
      setActiveKeys([]);
    }, 250);
  }

  useEffect(() => {
    // prevent right click due to taps registering it
    document.querySelector('.WebKeyboard').addEventListener('contextmenu', event => event.preventDefault());
  }, [])

  return (
    <div className="WebKeyboard">
      {Object.keys(keys).map((key, index) => {
        const keyInfo = keys[key];

        return <div
          key={index}
          className={`WebKeyboard__key ${keyInfo?.class} ${activeKeys.includes(key) ? 'active' : ''}`}
          onTouchStart={() => keyOn(key)}
          onTouchEnd={() => keyOff(key)}
          style={{
            top: `${keyInfo.loc.y}`,
            left: `${keyInfo.loc.x}`,
            right: `${keyInfo.loc?.x_f}`,
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
