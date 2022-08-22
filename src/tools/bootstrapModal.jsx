import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactPlayer from 'react-player';
import ModalBody from 'react-bootstrap/ModalBody'

import { useVideoContext } from "../context/VideoContext"
import config from './config';

function BootstrapModal(props) {

  const { handleClose ,show, handleCloseAprroved,handleCloseAprrovedSingle,id, currentMovie} = useVideoContext();

  return (
    <>
      <Modal show = {show} onHide = {handleClose} 
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          {props.alert 
          ? <Modal.Title>ALERT</Modal.Title>
          : null}
        </Modal.Header>
        <Modal.Body >
          {props.alert
          ? props.alert 
          : null}
        </Modal.Body>
          {props.alert
          ? null
          : <ModalBody> 
              <div className='react-player'>
                <ReactPlayer
                  url={currentMovie}
                  controls
                  className='media-player'
                />
              </div>
               </ModalBody>}
          {props.alert
            ? <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>No</Button>
              {props.alert === config.message.alertAllDelete
                ? <Button variant="primary" onClick={handleCloseAprroved}>YES</Button>
                : <Button variant="primary" onClick={() => {handleCloseAprrovedSingle(id)}}>YES</Button>
              }
              </Modal.Footer>
            : null }
      </Modal>
    </>
  );
}

export default BootstrapModal;
