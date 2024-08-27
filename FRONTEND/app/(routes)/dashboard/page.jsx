"use client"
import React, { useState, useEffect } from 'react'
import DashboardHeader from '../../components/dashboardHeader'
import SideMenu from "../../components/sideMenu"
import { Plus } from '../..//utils/icons'
import NoteModal from '../../components/noteModal'
import FolderModal from '../../components/folderModal'
import { useNoteStore } from '../../stores/noteStore'
import NoteCard from '../../components/noteCard'

const Dashboard = () => {
    const { notesArr } = useNoteStore.getState()

    // Open add note modal
    const [openNoteModal, setOpenNoteModal] = useState(false);
    const [openFolderModal, setOpenFolderModal] = useState(false);

    const showNoteModal = () => setOpenNoteModal(true);

    const showFolderModal = () => setOpenFolderModal(true);

    return (
        
        <div>
            <DashboardHeader />
            <div className="flex flex-row bg-magnolia">
                <SideMenu />
                {/* Dashboard content */}
                <div className="flex flex-col p-9 gap-9">
                    {/* Folders */}
                    <div className="flex flex-col">
                    {/* <button className="bg-red p-3 text-white w-20"onClick = {getNotes}> GET NOTES</button> */}
                        <div className="flex flex-row gap-2 items-center cursor-pointer">
                            <div className="text-darkGrey font-700 text-h7"> My Folders </div>
                            <button onClick = {showFolderModal}> {Plus} </button>
                        </div>
                        {/* Add Folder */}
                        <div className="flex flex-row gap-3 max-w-[70%] mt-5">

                            <div className="bg-pastelYellow rounded-[10px] h-30 w-80 p-3 hover:shadow-custom">
                                hi
                            </div>

                        </div>
                    </div>

                    {/* Notes */}
                    <div className="flex flex-col">
                        <div className="flex flex-row gap-2 items-center cursor-pointer">
                            <div className="text-darkGrey font-700 text-h7"> My Notes </div>
                            <button onClick = {showNoteModal}>{Plus}</button>
                        </div>
                        
                        {/* Add Notes */}
                        <div className="flex flex-wrap gap-5 max-w-[100%] mt-5">
                            {notesArr.length > 0 && notesArr.map((note, index) => (
                                <div key={index}>
                                    <NoteCard 
                                        _id={note._id}
                                        title={note.title}
                                        content={note.content}
                                        tags={note.tags}
                                        deadline={note.deadline}
                                        folder={note.folder}
                                        lastUpdated={note.updatedAt}
                                        backgroundColor={note.backgroundColor}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <FolderModal open={openFolderModal} setOpen={setOpenFolderModal} />
            <NoteModal id={null} open={openNoteModal} setOpen={setOpenNoteModal} isUpdated={false} isCreated={true} />
        </div>
    )
}

export default Dashboard