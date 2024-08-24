"use client"
import React, {useState} from 'react'
import DashboardHeader from '../../components/dashboardHeader'
import SideMenu from "../../components/sideMenu"
import { Plus } from '../..//utils/icons'
import AddNoteModal from '../../components/addNoteModal'
import AddFolderModal from '../../components/addFolderModal'

const Dashboard = () => {
    // Open add note modal
    const [openNoteModal, setOpenNoteModal] = useState(false);
    const [openFolderModal, setOpenFolderModal] = useState(false);

    const showNoteModal = () => {
        setOpenNoteModal(true);
    }

    const showFolderModal = () => {
        setOpenFolderModal(true);
    }

    return (
        <div className="">
            <DashboardHeader />
            <div className="bg-magnolia flex flex-row">
                <SideMenu />
                {/* Dashboard content */}
                <div className="flex flex-col p-9 gap-9">
                    {/* Folders */}
                    <div className="flex flex-col">
                    <div className="flex flex-row gap-2 items-center cursor-pointer">
                            <div className="text-darkGrey font-700 text-h7"> My Folders </div>
                            <button onClick = {showFolderModal}>
                                {Plus}
                            </button>
                        </div>
                        
                        {/* Add Folder */}
                        <div className="flex flex-row gap-3 max-w-[70%] mt-5">
                            {/* {Folders.map((folder, key) => <div>
                                </div>
                                )
                            } */}

                            <div className="bg-pastelYellow rounded-[10px] h-30 w-80 p-3 hover:shadow-custom">
                                hi
                            </div>

                        </div>
                    </div>

                    {/* Notes */}
                    <div className="flex flex-col">
                        <div className="flex flex-row gap-2 items-center cursor-pointer">
                            <div className="text-darkGrey font-700 text-h7"> My Notes </div>
                            <button onClick = {showNoteModal}>
                                {Plus}
                            </button>
                        </div>
                        
                        {/* Add Folder */}
                        <div className="flex flex-row gap-3 max-w-[70%] mt-5">
                            {/* {Folders.map((folder, key) => <div>
                                </div>
                                )
                            } */}

                            <div className="bg-pastelYellow rounded-[10px] h-30 w-80 p-3 hover:shadow-custom">
                                hi
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
            <AddFolderModal open={openFolderModal} setOpen={setOpenFolderModal} />
            <AddNoteModal open={openNoteModal} setOpen={setOpenNoteModal} />

        </div>
    )
}

export default Dashboard