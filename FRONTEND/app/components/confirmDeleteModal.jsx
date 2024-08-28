import React from 'react';
import { Modal } from 'antd';

import { deleteNote, getNotes } from '../stores/noteStore'
import { deleteFolder, getFolders } from '../stores/folderStore';

const ConfirmDeleteModal = ({ id, open, setOpen, isFolder, isNote}) => {
    const handleOk = async () => {
        try {
            if (isFolder) {
                await deleteFolder(id);
                await getFolders(); 
            } else if (isNote) {
                await deleteNote(id);
                await getNotes();
            }
            setOpen(false);
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <>
            <Modal
                title={isNote? "Delete Note?" : "Delete Folder?"}
                open={open}
                onOk={handleOk}
                onCancel={() => setOpen(false)}
                okText="Delete"
                cancelText="Cancel"
            >
                <p> Confirm Delete? </p>
            </Modal>
        </>
    );
};


export default ConfirmDeleteModal;