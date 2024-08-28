"use client"
import React, { useRef, useState } from 'react';
import { Modal } from 'antd';
import Draggable from 'react-draggable';
import { useFolderStore, addFolder, handleChangeName, updateFolder } from  '../stores/folderStore'

const FolderModal = ( {open, setOpen, isUpdated, isCreated} ) => {
  
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const draggleRef = useRef(null);

  const handleOk = async(e) => {
    const { name } = useFolderStore.getState();

    if (isCreated) {
      if (!name){
        alert("Folder's name is required.")
        return;
      }
      await addFolder();
    }
    else if (isUpdated) {
      await updateFolder(id);
    }

    setOpen(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
  
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <>
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
          >
            <div className="text-strongViolet text-h9"> Add New Folder </div>
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div className="text-darkGrey"> Folder name </div>
        <input type="text" 
            onChange= {(e) => handleChangeName(e.target.value)}
            className="p-2 border border-lightGrey rounded-[5px] w-[100%] focus:ring-1 focus:ring-pastelViolet focus:border-strongViolet focus:outline-none">
        </input>
        
      </Modal>
    </>
  );
};

export default FolderModal;