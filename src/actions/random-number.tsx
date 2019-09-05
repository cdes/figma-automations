import * as React from 'react';

import { Field, Label, Input, Footer, Output } from '../components'
import { Context } from '../store';
const { useState, useEffect, useContext } = React;
import isUUID from 'validator/lib/isUUID';
import { NUMBER } from "./output-types";
import { getSupportedOptions } from "./helper-functions";

function RandomNumber({ id, index, color }) {
  const { store, dispatch } = useContext(Context);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);

  useEffect(() => {
    dispatch({
      type: "random-number",
        id,
        state: {
          option: {
            label: `Random Number ${index+1}`,
            value: id,
            type: NUMBER
          },
          index,
          min,      
          max,      
        }
    })
  }, [min, max])

  const setMinValue = (newValue) => {
    if(newValue.length === 0) {
      setMin(0);
    }
    else if(typeof newValue === "object") {
      if(isUUID(newValue.value)) {
        setMin(newValue.value);
      }
      else {
        setMin(parseInt(newValue.value));
      }
    }
    else if(parseInt(newValue) === NaN) {
      setMin(0);
    }
    else {
      setMin(parseInt(newValue));
    }
  }

  const setMaxValue = (newValue) => {
    if(newValue.length === 0) {
      setMax(10);
    }
    else if(typeof newValue === "object") {
      if(isUUID(newValue.value)) {
        setMax(newValue.value);
      }
      else {
        setMax(parseInt(newValue.value));
      }
    }
    else if(parseInt(newValue) === NaN) {
      setMax(10);
    }
    else {
      setMax(parseInt(newValue));
    }
  }
  
  return (
    <>
      <Field>
        <Label>Minimum</Label>
        <Input onChange={(newValue) => setMinValue(newValue)} onInputChange={(newValue) => setMinValue(newValue)} options={getSupportedOptions(store, id, NUMBER)} />
      </Field>
      <Field>
        <Label>Maximum</Label>
        <Input onChange={(newValue) => setMaxValue(newValue)} onInputChange={(newValue) => setMaxValue(newValue)} options={getSupportedOptions(store, id, NUMBER)} />
      </Field>
      <Footer>
        Output
        <Output color={color}>
          Random Number {index+1}
        </Output>
      </Footer>
    </>
  );
}

export default RandomNumber;