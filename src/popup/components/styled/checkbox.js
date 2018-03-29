import styled from 'styled-components';


export const CheckboxGroup = styled.div`
  display: flex;
  margin-left: 5px;
  overflow-x: auto;
`;

export const CheckboxGroupName = styled.span`
  margin: 0 0 0 20px;
  align-self: center;
  color: #5d801a;
  width: 100px;
`;

export const CheckboxItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
  text-shadow: 0 1px 0 white;
  color: #4a4c45;
  padding-left: 10px;
  span {
    display: inline-block;
    line-height: -moz-block-height;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  text-transform: uppercase;
  text-shadow: 0 1px 0 white;
  color: #4a4c45;
  background-color: #E2E2E2;
  border: 1px solid black;
  border-radius: 3px;
  padding: 3px 10px;
  margin-top: 2px;
  &:hover {
    cursor: pointer;
  }
`;

export const Checkbox = styled.input.attrs({
    type: "checkbox"
})`
  transition: box-shadow .3s ease-out;
  vertical-align: middle;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 5px black;
    transition: box-shadow .3s ease-in;
  }
`;
