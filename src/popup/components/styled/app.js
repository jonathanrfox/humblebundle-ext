import styled from 'styled-components';

import { fadeIn } from './animations';


export const Popup = styled.div`
  width: 500px;
  max-height: 500px;
  background: #333333;
`;

export const Header = styled.header`
  position: relative;
  background: #494F5C;
  font-size: 25px;

  > div {
    font-family: 'Pacifico', cursive;
    color: #CB272C;
    text-align: center;

    span {
       font-family: 'Source Sans Pro';
    }
  }

  > a {
    position: absolute;
    color: white;
    top: 3px;
    right: 5px;
    font-size: 32px;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const Main = styled.div`
  background: #333333;
  padding: 20px;
  font-family: 'Source Sans Pro', Helvetica, sans-serif;
  font-weight: 700;
`;

export const Card = styled.div`
  background: #E0E0E0;
  padding: 10px 20px 0 20px;
  border: 1px solid #c7cbd4;
  border-radius: 5px;
  box-shadow: 0 1px 1px 0px #c7cbd4;
  font-size: 12px;
  font-weight: 700;
  color: #4a4c45;
  max-height: 250px;
  overflow-y: auto;
  animation: ${fadeIn} 1s;
`;

export const Title = styled.div`
  color: ${props => props.color || '#cc0000'};
  margin: 0 0 15px;
  text-align: center;
  font-weight: 900;
  font-size: 20px;
`;

export const Row = styled.div`
  display: flex;
  overflow-x: auto;
  background-color: #FFFFFF;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #c7cbd4;
  border-radius: 5px;
  box-shadow: 0 1px 1px 0px #c7cbd4;
  color: #4a4c45;
`;

export const Text = styled.p`
  color: ${props => props.color || "white"};
  text-align: center;
  font-size: ${props => props.fontSize || 12}px;
`;

export const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
