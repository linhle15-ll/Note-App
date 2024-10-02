import { create } from "zustand"
import { devtools, subscribeWithSelector, persist } from 'zustand/middleware'
import axios from 'axios'
import { useNoteStore } from "./noteStore"

const {notesArray} = useNoteStore.getState()

const initialFolderValues = {
    foldersArr: [],
    files: [], // An array containing files added to the folder
    name: ""
}

export const useFolderStore = create()(
    devtools(
        subscribeWithSelector(
            persist(() => initialFolderValues, { name: "Folder store"})
        ),
        { name: "Folder store" }
    )
)

export const handleChangeName = (value) => {
    useFolderStore.setState({name: value})
    console.log("Folder Name", useFolderStore.getState().name)
}

export const handleReset = () => {
    useFolderStore.setState({folderName: ""})
}

export const addFolder = async() => {
    const { name, files } = useFolderStore.getState()

    try {
        const res = await axios.post('http://localhost:5000/api/add-folder', {
            name,
            files
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if (res.status === 200) {
            console.log('Folder added successfully')
            getFolders()
            handleReset()
        }
        console.error('Error creating folder')
        handleReset()
    } catch (error) {
        console.error('Error creating folder', error)
        handleReset()
    }
}

export const getFolders = async() => {
    try {
        const res = await axios.get('http://localhost:5000/api/get-folders')

        if (res.status === 200) {
            useFolderStore.setState({ foldersArr: res.data })
            console.log('Folders fetched successfully', foldersArr) 
        }
        console.error("Error getting folders.", res.status)
    } catch (error) {
        console.error("Error getting folders.", error)
    }
}

export const deleteFolder = async(id) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/delete-folder/${id}`)
        if (res.status === 200) {
            console.log('Folder deleted successfully')
            await getFolders()
        }
        console.error("Error deleting folder.", res.status)
    } catch (error) {
        console.error("Error deleting folder.", error)
    }
}

export const updateFolder = async(id) => {
    const { name, files } = useFolderStore.getState()
    try {
        const res = await axios.put(`http://localhost:5000/api/update-folder/${id}`, {
            name, 
            files
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if (res.status === 200) {
            console.log('Folder updated successfully')
            getFolders()
        }
        console.error('Error updating folder', res.status)
    } catch (error) {
        console.error('Error updating folder', error)
    }
}