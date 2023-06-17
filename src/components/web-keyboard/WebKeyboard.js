import { useState, useEffect } from 'react';
import './WebKeyboard.scss';
import { keyboardRows } from './key-map';

let cleanUpTimeout;

function WebKeyboard() {
  const [activeKeys, setActiveKeys] = useState([]);
  const [shiftOn, setShiftOn] = useState(false);

  const keyOn = (key, key2) => {
    if (!(activeKeys.includes(key))) {
      setActiveKeys([...activeKeys, key]);
    }

    if (key.includes('shift')) {
      setShiftOn(true);
    }

    if (shiftOn) {
      console.log(key2);
    } else {
      console.log(key);
    }
  }

  const keyOff = (key) => {
    clearTimeout(cleanUpTimeout);

    setTimeout(() => {
      setActiveKeys(activeKeys.filter(keyActive => keyActive !== key));

      if (key.includes('shift')) {
        setShiftOn(false);
      }
    }, 100);

    cleanUpTimeout = setTimeout(() => {
      setActiveKeys([]);
    }, 1000);
  }

  useEffect(() => {
    // prevent right click due to taps registering it
    document.querySelector('.WebKeyboard').addEventListener('contextmenu', event => event.preventDefault());
  }, [])

  return (
    <div className="WebKeyboard">
      {keyboardRows.map((rowKeys, rowIndex) => {
        return <div key={rowIndex} className="WebKeyboard__row">
          {rowKeys.map((keyInfo, keyIndex) => {
            const rowKey = keyInfo.vals[0];

            return <div
              key={keyIndex}
              className={`WebKeyboard__row-key ${keyInfo?.class || ''} ${activeKeys.includes(rowKey) ? 'active' : ''}`}
              onTouchStart={() => keyOn(rowKey, keyInfo.vals.length > 1 ? keyInfo.vals[1] : '')}
              onTouchEnd={() => keyOff(rowKey)}
              style={{
                
              }}
            >
              <div className="WebKeyboard__display-key">{keyInfo?.alt || rowKey}</div>
              {keyInfo.vals.length > 1 && <div className="WebKeyboard__display-key-alts">{keyInfo.vals[1]}</div>}
            </div>
          })}
        </div>
      })}
    </div>
  );
}

export default WebKeyboard;
