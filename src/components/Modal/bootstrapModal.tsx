import React from 'react';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import ReactPlayer from 'react-player';
import './bootstrapModal.css'
import{ AiOutlineCloseCircle } from 'react-icons/ai'
import styled from 'styled-components';

import { ButtonModal } from'../style/Button.style';
import { useVideoContext } from "../../context/VideoContext"
import config from '../../tools/config';
import { Omit, BsPrefixProps } from 'react-bootstrap/esm/helpers';


function BootstrapModal(this: any, props: JSX.IntrinsicAttributes & Omit<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & { ref?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined; }, BsPrefixProps<"div"> & ModalProps> & BsPrefixProps<"div"> & ModalProps & { children?: React.ReactNode; }) {

  const { handleClose ,show, setAlert, handleCloseAprroved, handleCloseAprrovedSingle, id, currentMovie} = useVideoContext();

  
  return (
    <>
      <Modal  show={show} onHide={handleClose} 
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader  >
        <FullScreenContanier>
          </FullScreenContanier>
          <CloseButtonContanier>
          <AiOutlineCloseCircle onClick={handleClose} color={'black'} size={'2rem'}/>
          </CloseButtonContanier>
        </ModalHeader>
        <ModalBody >
          {props.alert
          ? props.alert 
          : <div className='react-player'>
          <ReactPlayer
            url={currentMovie}
            controls
            className='media-player'
          />
        </div>}
               </ModalBody>
          {props.alert
            ? <Footer>
              <ButtonModal color='#888C03' onClick={()=>{
                handleClose()
                setAlert('')
                }}>NO</ButtonModal>
              {props.alert===config.message.alertAllDelete
                ? <ButtonModal color='#ff00008f' onClick={()=>{
                  handleCloseAprroved()
                  setAlert('')
                }}>YES</ButtonModal>
                : <ButtonModal color='#ff00008f' onClick={() => {
                  handleCloseAprrovedSingle(id)
                  setAlert('')
                }}>YES</ButtonModal>
              }
              </Footer>
            : null }
      </Modal>
    </>
  );
}

export default BootstrapModal;


const ModalBody = styled.div`
    margin-top: 5;
    margin-bottom: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    background-color: var(--Green1);
    border-radius: 15px;
`

const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 15px;
    background-color: var(--Green1);
    padding-bottom: 15px;
    margin-bottom: 15px;
    background-color: var(--Green1);
`

const ModalHeader = styled.div`
    display: flex;
    border: none;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    padding-top: 15px;
    margin-top: 5px;
    background-color: var(--Green1);
    border-radius: 15px;

`
    
const CloseButtonContanier = styled.div`
  margin-left: 680px;
  z-index: 1000;
  &:hover :nth-child(1){
    border-radius: 50%;
    box-shadow: 3px 3px 9px var(--Green2),
                -3px -3px 9px var(--Green2);
  }
`

const FullScreenContanier = styled.div`
cursor: pointer;
z-index: 1000;
  &:hover :nth-child(1){
    border-radius: 50%;
    box-shadow: 3px 3px 9px var(--Green2),
                -3px -3px 9px var(--Green2);
  }
`



