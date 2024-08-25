import { create } from "zustand"
import { devtools, subscribeWithSelector, persist } from 'zustand/middleware'
import axios from 'axios'

const initialNoteValues = {
    notesArr: [],
    formData: {
        name: "",
        title: "",
        content: "",
        tags: [],
        deadline: [],
        folder: [],
    }
}

export const useNoteStore = create()(
    devtools(
        subscribeWithSelector(
            persist(() => initialNoteValues, { name: "Note store"})
        ),
        { name: "Note store" }
    )
)

export const handleChange = (name, value) => {
    useNoteStore.setState((state) => ({
        formData: {
            ...state.formData,
            [name]:value
        }
    }))
}

export const handleReset = () => {
    useFolderStore.setState({ formData: {
        name: "",
        title: "",
        content: "",
        tags: [],
        deadline: [],
        folder: [],
    }})
}

export const addNote = async() => {
    const { name, title, content, tags, deadline, folder } = useNoteStore.getState();
    const formData = {
        name,
        title,
        content,
        tags,
        deadline, // data Format
        folder
    }
    
    try {
        const res = await axios.post('http://localhost:5000/api/add-note', formData , {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if (res.status === 200) {
            console.log('Note added successfully')
            handleReset();
        }
        console.error('Error creating note', res.status)
    } catch (error) {
        console.error('Error creating note', error)
    }
}

export const getNotes = async() => {

    try {
        const res = axios.get('http://localhost:5000/api/get-notes')

        if (res.status === 200) {
            useFolderStore.setState({filesArr: res.data})
            console.log('Notes fetched successfully') 
        }
        console.error("Error getting notes.", res.status)
    } catch (error) {
        console.error("Error getting notes.", error)
    }
}

export const deleteNote = async(id) => {
    try {
        const res = axios.delete(`http://localhost:5000/api/delete-note/${id}`);
        if (res.status === 200) {
            console.log('Note deleted successfully')
            getNotes();
        }
        console.error("Error deleting note.", res.status)
    } catch (error) {
        console.error("Error deleting note.", error)
    }
}

export const updateNote = async(id, name) => {
    const formData = {
        name,
        title,
        content,
        tags,
        deadline, // data Format
        folder
    }

    try {
        const res = axios.put(`http://localhost:5000/api/update-note/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (res.status === 200) {
            console.log('Note updated successfully')
            getNotes();
        }
        console.error('Error updating note', res.status)
    } catch (error) {
        console.error('Error updating note', error)
    }
}