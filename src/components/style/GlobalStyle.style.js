import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
  padding: 0;
  margin: 0;
  border: none;
  box-sizing: border-box;

}

body {
  margin: 0;
  padding: 0;
  border: none;
  height: 100vh;
  font-family: 'DynaPuff', cursive;
  font-weight: bold;
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--Dark);
  color: black;
}

:root {
  --White:  rgba(242, 242, 242, 1);
  --Dark: rgba(38, 38, 38, 1);
  --Green1: rgba(135, 140, 2, 1);
  --Green2:  rgba(242, 234, 118, 1);
  --Green3: rgba(89, 86, 43, 1);

}
`



