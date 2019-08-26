import * as React from 'react';
import { html as io } from '../lib/io.js';

const { useState, useEffect } = React;

export default function useSelection(){
  const [selection, setSelection] = useState([]);

  function onSelection(newSelection) {
    setSelection(newSelection);
  }

  useEffect(() => {
    io.on("selection", onSelection);

    return () => {
      io.off("selection", onSelection);
    }
  }, [selection]);

  return selection;
};