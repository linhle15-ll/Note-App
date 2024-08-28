'use client'
import React, { useEffect } from "react";
import { Modal } from "antd";
import { useNoteStore, getNote } from "../stores/noteStore";
import { dateFormat } from "../utils/dateFormat";

const ExpandedNoteModal = ({ id, open, setOpen }) => {
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const { title, content, tags, folder, deadline, lastUpdated } = useNoteStore.getState();
  
  return (
    <>
      <Modal
        title={`Note ${title}`}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex flex-col gap-[1.4px] rounded-[10px] py-3 px-4">
            {/* tags */}
            <div className="flex flex-row justify-between items-center"> 
                <div className="flex flex-wrap max-w-[70%]">
                    {tags?.length > 0 && (
                        <div className="flex flex-center gap-2 flex-wrap mt-2">
                            {tags.map((tag, index) => (
                                <span key={index} className="flex items-center gap-1 text-sm text-slate-900 bg-white border border-darkGrey px-2 py-1 rounded">
                                    # {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* title */}
            <div className="font-700 text-h8 mt-5"> {title} </div>
            <div className="mt-5 max-h-80 overflow-y-scroll"> {content} </div>

            {deadline === null  && (
                <div className="text-darkGrey flex flex-row gap-1 mt-5"> <span className='text-darkGrey font-600'>No deadline set</span> </div>
            )}
            {deadline !== null  && (
                <div className="text-darkGrey flex flex-row gap-1 mt-5"> <span className='text-darkGrey font-600'>Deadline: </span>{dateFormat(deadline)} </div>
            )}
            
            {folder.length > 0 &&(
                <div className="text-darkGrey font-600 mt-5"> Folder: <span className="font-normal"> {folder} </span></div>
            )}

            {folder.length === 0 && (
                <div className='text-darkGrey font-600'> No folder set </div>
            )}

            <div className="flex flex-row justify-between"> 
                <div className="text-darkGrey font-normal"> 
                        {lastUpdated !== null  && (
                        <div className="text-darkGrey flex flex-row gap-1"> <span className="text-darkGrey font-600"> Last updated: </span> {dateFormat(lastUpdated)} </div>
                    )} 
                </div> 
            </div>
        </div>
      </Modal>
    </>
  );
};
export default ExpandedNoteModal;
