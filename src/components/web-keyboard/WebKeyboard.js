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
      {Object.keys(keys).map((key, index) =>
        <div key={index} className="WebKeyboard__key" onClick={() => fireKey(key)}>
          <div
            className={`WebKeyboard__display-key ${keys[key]?.class}`}
            style={{
              top: `${keys[key].loc.top}px`,
              left: `${keys[key].loc.left}px`,
              transform: `rotate(${keys[key].loc.rotation}deg)`,
              translate: keys[key].loc?.translate
            }}
          >
            {keys[key]?.alt || key}
          </div>
        </div>
      )}
    </div>
  );
}

export default WebKeyboard;
