import * as React from 'react';
import styled from "styled-components";
import CreatableSelect from 'react-select/creatable';

const Container = styled.div`
  width: 144px;
  height: 32px;
`;

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontFamily: "Inter",
    fontSize: 12,
  }),
  control: (provided) => ({
    ...provided,
    height: 32,
    minHeight: 32,
    fontSize: 12,
    fontFamily: "Inter",
    borderColor: "#E5E5E5"
  }),
  indicatorSeparator: () => ({}),
  indicatorsContainer: (provided) => ({
    ...provided,
    transform: "scale(0.75)",
  }),
  clearIndicator: (provided) => ({
    ...provided,
    padding: 4
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: 4
  }),
  input: (provided) => ({
    ...provided,
    fontSize: 12,
    fontFamily: "Inter",
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    fontSize: 12,
    fontFamily: "Inter",
  }),
}

const Input = ({ onChange, onInputChange, options }) => (
  <Container>
    <CreatableSelect
      styles={customStyles}
      isClearable
      onChange={onChange}
      onInputChange={onInputChange}
      options={options}
      formatCreateLabel={(inputValue)=> `Use ${inputValue}`}
    />
  </Container>
);

export default Input;