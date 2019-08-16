import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './ui.scss'
import { html as io } from './io.js';

const { useState, useEffect, useRef } = React;

const App = () => {
  const [anchor, setAnchor] = useState<string>("TopLeft");
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [potentialWidth, setPotentialWidth] = useState<number>(0);
  const [potentialHeight, setPotentialHeight] = useState<number>(0);
  const [esc, setESC] = useState({width: false, height: false});
  const [selection, setSelection] = useState([]);

  const widthInput = useRef(null);
  const heightInput = useRef(null);

  function onBlur() {
    parent.postMessage({ pluginMessage: { type: 'window-blur' } }, '*');    
  }

  function onFocus() {
    parent.postMessage({ pluginMessage: { type: 'window-focus' } }, '*');
  }

  function onSelection(newSelection) {
    setSelection(newSelection);
    if(typeof newSelection[0] === "undefined") {
      return;
    }
    else if(typeof selection[0] === "undefined" || (newSelection[0].id !== selection[0].id)) {
      setWidth(newSelection[0].width);
      setPotentialWidth(newSelection[0].width);
      setHeight(newSelection[0].height);
      setPotentialHeight(newSelection[0].height);
    }
  }

  useEffect(() => {
    if (!document.hasFocus()) { // When opening the plugin, the window is blurred by default
      onBlur();
    }
    
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);

    io.on("selection", onSelection);

    return () => {
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
      io.off("selection", onSelection);
    }
  })

  const commitWidth = (finalWidth) => {
    finalWidth = finalWidth < 1 ? 1 : finalWidth;
    setWidth(finalWidth);
    setPotentialWidth(finalWidth);
    io.send("set-width", {
      layer: selection[0],
      anchor: anchor.replace(/Top|Middle|Bottom/g, "").toLowerCase(),
      width: parseFloat(finalWidth)
    });
  }

  const commitHeight = (finalHeight) => {
    finalHeight = finalHeight < 1 ? 1 : finalHeight;
    setHeight(finalHeight);
    setPotentialHeight(finalHeight);
    io.send("set-height", {
      layer: selection[0],
      anchor: anchor.replace(/Left|Center|Right/g, "").toLowerCase(),
      height: parseFloat(finalHeight)
    });
  }

  const onAnchorChange = event => setAnchor(event.target.value);

  const onWidthChange = (event) => {
    setPotentialWidth(event.target.value);
  };

  const onHeightChange = (event) => {
    setPotentialHeight(event.target.value);
  };

  const onWidthBlur = (event) => {
    if(!esc.width) {
      commitWidth(potentialWidth);
    }
    else {
      setPotentialWidth(width);
    }

    setESC({width: false, height: false});
  }

  const onHeightBlur = (event) => {
    if(!esc.height) {
      commitHeight(potentialHeight);
    }
    else {
      setPotentialHeight(height);
    }

    setESC({width: false, height: false});
  }

  const onWidthKeyDown = (event) => {
     
    if (event.keyCode === 27) {
      setESC({width: true, height: false});
    }
    else if(event.keyCode === 13) {
      event.target.blur();
      commitWidth(potentialWidth);
    }
    else if (event.keyCode === 38 || event.keyCode === 40) {
      event.preventDefault();
      const multiplier = event.shiftKey ? 10 : 1;
      const direction = event.keyCode === 38 ? 1 : -1;

      const targetWidth = parseFloat(event.target.value) + ( 1 * multiplier * direction );
      commitWidth(targetWidth);
    }
  }

  const onHeightKeyDown = (event) => {
    if (event.keyCode === 27) {
      setESC({width: false, height: true});
    }
    else if(event.keyCode === 13) {
      event.target.blur();
      commitHeight(potentialHeight);
    }
    else if (event.keyCode === 38 || event.keyCode === 40) {
      event.preventDefault();
      const multiplier = event.shiftKey ? 10 : 1;
      const direction = event.keyCode === 38 ? 1 : -1;

      const targetHeight = parseFloat(event.target.value) + ( 1 * multiplier * direction );
      commitHeight(targetHeight);
    }
  }

  useEffect(()=> {
    if(esc.width) {
      widthInput.current.blur();
    }
    else if(esc.height) {
      heightInput.current.blur();
    }
  });

  const { length } = selection;

  if(length === 0) {
    return <div className="error type--pos-medium-normal">No layer selected.</div>
  }
  else if (length > 1) {
    return <div className="error type--pos-medium-normal">Select only one layer.</div>
  }
  else {
    return (
      <div className="plugin">
        <div className="inputs">
          <p className='type type--neg-small-bold type--figma-black-8'>Dimensions</p>
          <div className="input-icon">
            <div className="input-icon__icon">
              <div className="icon icon--text icon--black-3">W</div>
              </div>
            <input ref={widthInput} type="number" min={1} className="input-icon__input" value={potentialWidth} onChange={onWidthChange} onBlur={onWidthBlur} onKeyDown={onWidthKeyDown} onFocus={e => e.target.select()} placeholder="0" />
          </div>
          <div className="input-icon">
            <div className="input-icon__icon">
              <div className="icon icon--text icon--black-3">H</div>
              </div>
            <input ref={heightInput} type="number" min={1} className="input-icon__input" value={potentialHeight} onChange={onHeightChange} onBlur={onHeightBlur} onKeyDown={onHeightKeyDown} onFocus={e => e.target.select()} placeholder="0" />
          </div>
        </div>
        <div className="grid-wrapper">
          <p className='type type--neg-small-bold type--figma-black-8'>Anchor</p>
          <div className="grid">
            <div>
              <input onChange={onAnchorChange} name="anchor" type="radio" value="TopLeft" checked={anchor === "TopLeft"} />
            </div>
            <div>
              <input onChange={onAnchorChange} name="anchor" type="radio" value="TopCenter" checked={anchor === "TopCenter"} />
            </div>
            <div>
              <input onChange={onAnchorChange} name="anchor" type="radio" value="TopRight" checked={anchor === "TopRight"} />
            </div>
            <div>
              <input onChange={onAnchorChange} name="anchor" type="radio" value="MiddleLeft" checked={anchor === "MiddleLeft"} />
            </div>
            <div>
              <input onChange={onAnchorChange} name="anchor" type="radio" value="MiddleCenter" checked={anchor === "MiddleCenter"} />
            </div>
            <div>
              <input onChange={onAnchorChange} name="anchor" type="radio" value="MiddleRight" checked={anchor === "MiddleRight"} />
            </div>
            <div>
              <input onChange={onAnchorChange} name="anchor" type="radio" value="BottomLeft" checked={anchor === "BottomLeft"} />
            </div>
            <div>
              <input onChange={onAnchorChange} name="anchor" type="radio" value="BottomCenter" checked={anchor === "BottomCenter"} />
            </div>
            <div>
              <input onChange={onAnchorChange} name="anchor" type="radio" value="BottomRight" checked={anchor === "BottomRight"} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'))