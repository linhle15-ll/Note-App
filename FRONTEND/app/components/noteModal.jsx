"use client"
import React, { useRef, useState } from 'react';
import { Modal } from 'antd';
import Draggable from 'react-draggable';
import { SketchPicker } from 'react-color'
import { useNoteStore, addNote, updateNote, handleChangeTitle, handleChangeContent, handleChangeDeadline, handleChangeFolder, handleChangeTag, addNewTag, handleRemoveTag, handleChangeBackgroundColor } from '../stores/noteStore';
import { useFolderStore } from '../stores/folderStore';

import { Add, Delete } from '../utils/icons';

const NoteModal = ( { id, open, setOpen, isUpdated, isCreated } ) => {
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const draggleRef = useRef(null);

  const handleOk = async() => {
    const { title, content } = useNoteStore.getState().formData;

    if (isCreated) {
      if (!title ||!content){
        alert("Title and Content are required fiels.")
        return;
      }
      await addNote();
    }
    else if (isUpdated) {
      await updateNote(id);
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

  // SketchPicker
  const [pickerVisible, setPickerVisible] = useState(false); 

  const handleSketchPickerOpen = (e) => {
    e.preventDefault();
    setPickerVisible(open);
  }

  const handleSketchPickerClose = (e) => {
    e.preventDefault();
    setPickerVisible(false);
  }

  const { tags, backgroundColor } = useNoteStore.getState();

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
            <div className="text-strongViolet text-h9"> { isCreated? "Add New Note" : "Update Note" } </div>
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
        <form className="flex flex-col gap-2">
          <div>
            <label htmlFor="title" className="text-darkGrey"> TITLE </label>
            <input type="text" required={isCreated? true : false}  name="title" id="title"
              onChange= {(e) => handleChangeTitle(e.target.value)}
              className="p-2 border border-lightGrey rounded-[5px] w-[100%] focus:ring-1 focus:ring-pastelViolet focus:border-strongViolet focus:outline-none"
              placeholder="Enter note title"
            >
            </input>
          </div>

          <div>
            <label htmlFor="content" className="text-darkGrey"> CONTENT </label>
            <textarea type="text" required={isCreated? true : false} name="content" id="content"
              onChange= {(e) => handleChangeContent(e.target.value)}
              className="p-2 border border-lightGrey rounded-[5px] w-[100%] max-h-50 overflow-y-scroll focus:ring-1 focus:ring-pastelViolet focus:border-strongViolet focus:outline-none"
              placeholder="Enter note content"
              
            >
            </textarea>
          </div>

          <div>
            <label htmlFor="date" className="text-darkGrey"> DEADLINE </label>
            <input type="date" name="date" id="date"
              onChange= {(e) => handleChangeDeadline(e.target.value)}
              className="p-2 border border-lightGrey rounded-[5px] w-[100%] focus:ring-1 focus:ring-pastelViolet focus:border-strongViolet focus:outline-none">
            </input>
          </div>

          <div className="flex flex-col">
            <label htmlFor="folder" className="text-darkGrey"> FOLDER </label>
            <select name="folder" id="folder" 
              onChange={(e) => handleChangeFolder(e.target.value)}
              className="p2 border border-lightGrey rounded-[5px] w-[50%] h-9 focus:ring-1 focus:ring-pastelViolet focus:border-strongViolet focus:outline-none"
            >
              <option value=""> 
                Select Folder 
              </option>

              {useFolderStore.getState().foldersArr.map((folder) => (
                <option key={folder._id} value={folder.name}>
                  {folder.name}

                </option>
              ))}
            </select>
          </div>

          <div>
            {tags?.length > 0 && (
              <div className="flex flex-center gap-2 flex-wrap mt-2">
                  {tags.map((tag, index) => (
                      <span key={index} className="flex items-center gap-1 text-sm text-slate-900 bg-lightGrey px-3 py-1 rounded">
                          # {tag}
                          <button onClick = {(e) => handleRemoveTag(tag, e)}> {Delete} </button>
                      </span>
                  ))}
              </div>
            )}

            <label htmlFor="tag" className="text-darkGrey"> TAG </label>
            <div className="flex flex-row gap-3">
              <input type="text" name="tag" id="tag"
                onChange={(e) => handleChangeTag(e.target.value)}
                className="p-2 border border-lightGrey rounded-[5px] w-[50%] focus:ring-1 focus:ring-pastelViolet focus:border-strongViolet focus:outline-none">
              </input>
              <button className="text-darkGrey" onClick={() => addNewTag}> {Add} </button>
            </div>
          </div>
          <div className="flex flex-col"> 
            <label className="text-darkGrey"> NOTE COLOR  </label>
            <button className=" w-11 h-5  rounded-[5px] border border-lightGrey hover:ring-pastelViolet hover:border-strongViolet hover:outline-none" style={{backgroundColor: backgroundColor}} onClick={pickerVisible? handleSketchPickerClose : handleSketchPickerOpen}></button> 
            {pickerVisible && (
              <SketchPicker className="mt-3" color={backgroundColor} onChange={(color) => handleChangeBackgroundColor(color)} /> 
            )}
            
          </div>
        </form>

      </Modal>
    </>
  );
};
export default NoteModal;