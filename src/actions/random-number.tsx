import * as React from 'react';

import { Field, Label, Input, Footer, Output } from '../components'

const { useState, useEffect } = React;

function RandomNumber({ id, dispatch, index, color }) {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);

  useEffect(() => {
    dispatch({
      type: "random-number",
        id,
        state: {
          index,
          min,      
          max,      
        }
    })
  }, [min, max])

  return (
    <>
      <Field>
        <Label>Minimum</Label>
        <Input type="number" value={min} onChange={(e) => setMin(parseInt(e.target.value))} placeholder="e.g. 0" />
      </Field>
      <Field>
        <Label>Maximum</Label>
        <Input type="number" value={max} onChange={(e) => setMax(parseInt(e.target.value))} placeholder="e.g. 10" />
      </Field>
      <Footer>
        Output
        <Output color={color}>
          Random Number
        </Output>
      </Footer>
    </>
  );
}

export default RandomNumber;