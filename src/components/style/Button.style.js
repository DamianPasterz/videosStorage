import styled from "styled-components";

export const ButtonModal = styled.button`
    width: 120px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid black;
    box-shadow:  9px 9px 18px var(--Green3),
             -3px -3px 9px var(--Green3);
             background-color: ${({color})=>color};
             &:hover{
                box-shadow:  3px 3px 9px var(--Green2),
                            -3px -3px 9px var(--Green2);
             }
`






