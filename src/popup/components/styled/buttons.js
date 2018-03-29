import styled from 'styled-components';


export const ButtonGroup = styled.div`
  display: flex;
  justify-content: ${props => props.alignment || 'right'};
  margin-top: 15px;
  > button {
    margin-right: ${props => props.marginRight ? '15px' : '0px'};
    margin-left: ${props => props.marginLeft ? '15px' : '0px'};
  }
`;

export const Button = styled.button`
  border-radius: 4px;
  background: ${props => props.background || '#4285F4'};
  border: none;
  outline: none;
  padding: 10px;
  color: white;
  text-transform: uppercase;
  font-weight: 500;
  transition: box-shadow 0.5s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: 1px 1px 10px ${props => props.background || '#4285F4'};
  }
`;
