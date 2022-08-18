import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useVideoContext } from "../context/VideoContext"
import config from './config';

function BootstrapModal(props) {

const { handleClose ,show, handleCloseAprroved,handleCloseAprrovedSingle,id} = useVideoContext();

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>alert1 </Modal.Title> */}
        </Modal.Header>
        
        <Modal.Body >{props.alert} </Modal.Body>
       
         <Modal.Footer>
         <Button variant="secondary" onClick={handleClose}>
           No
         </Button>
         {props.alert === config.alertAllDelete?
         <Button variant="primary" onClick={handleCloseAprroved}>
          YES
         </Button>:
         <Button variant="primary" onClick={() => {
          handleCloseAprrovedSingle(id)
          
          }}>
         YES!
        </Button>
      }
       </Modal.Footer>
       
      </Modal>
    </>
  );
}

export default BootstrapModal;