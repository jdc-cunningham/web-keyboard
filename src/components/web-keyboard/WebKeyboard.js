import { useState, useEffect } from 'react';
import './WebKeyboard.scss';
import { keyboardRows } from './key-map';

let cleanUpTimeout;

function WebKeyboard() {
  const [activeKeys, setActiveKeys] = useState([]);
  const [shiftOn, setShiftOn] = useState(false);
  const [numOn, setNumOn] = useState(false);

  // const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const keyOn = (key) => {
    if (!(activeKeys.includes(key))) {
      setActiveKeys([...activeKeys, key]);
    }

    if (shiftOn) {
      // console.log(keyboardRows[key].vals[1]);
    } else {
      // console.log(keyboardRows[key].vals[0]);
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
      {keyboardRows.map((rowKeys, rowIndex) => {
        return <div key={rowIndex} className="WebKeyboard__row">
          {Object.keys(rowKeys).map((rowKey, keyIndex) => {
            const keyInfo = rowKeys[rowKey];

            return <div
              key={keyIndex}
              className={`WebKeyboard__row-key ${keyInfo?.class || ''} ${activeKeys.includes(rowKey) ? 'active' : ''}`}
              onTouchStart={() => keyOn(rowKey)}
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
