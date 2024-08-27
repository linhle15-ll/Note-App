import { create } from "zustand"
import { devtools, subscribeWithSelector, persist } from 'zustand/middleware'
import axios from 'axios'

const initialNoteValues = {
    notesArr: [],

    title: "",
    content: "",
    tag: "",
    tags: [],
    deadline: "",
    folder: "",
    backgroundColor: "#ffffff",
}

export const useNoteStore = create()(
    devtools(
        subscribeWithSelector(
            persist(() => initialNoteValues, { name: "Note store"})
        ),
        { name: "Note store" }
    )
)

export const handleChangeTitle = (value) => {
    useNoteStore.setState({title: value})
}

export const handleChangeContent = (value) => {
    useNoteStore.setState({content: value})
}

export const handleChangeTags = (value) => {
    useNoteStore.setState({tags: value})
}

export const handleChangeDeadline = (value) => {
    useNoteStore.setState({deadline: value})
}

export const handleChangeFolder = (value) => {
    useNoteStore.setState({folder: value})
}

export const handleChangeTag = (value) => {
    useNoteStore.setState({tag: value})
}
export const addNewTag = () => {
    const { tags, tag } = useNoteStore.getState();

    if (tag.trim() !== ""){
      tags.push(tag.trim());
      useNoteStore.setState({tag: ""})
    }
}

export const handleChangeBackgroundColor = (color) => {
    useNoteStore.setState({ backgroundColor: color.hex})
}

export const handleReset = () => {
    useNoteStore.setState({ 
        name: "",
        title: "",
        content: "",
        tag: "",
        tags: [],
        deadline: "",
        folder: "",
        backgroundColor: "#ffffff",
    })
}

export const handleRemoveTag = (tagToRemove, e) => {
    e.preventDefault();
    const { tags } = useNoteStore.getState();
    return useNoteStore.setState({tag: tags.filter((tag) => tag != tagToRemove)});
}

export const addNote = async(e) => {
    const { title, content, tags, deadline, folder, backgroundColor } = useNoteStore.getState();
    const formData = {
        title,
        content,
        tags,
        deadline,
        folder,
        backgroundColor
    }
    
    try {
        const res = await axios.post('http://localhost:5000/api/add-note', formData , {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if (res.status === 200) {
            console.log('Note added successfully', res)
            await getNotes();
            handleReset();
        }
        console.error('Error creating note', res.status)
        handleReset();
    } catch (error) {
        console.error('Error creating note', error)
        handleReset()
    }

}

export const getNotes = async() => {
    try {
        const res = await axios.get('http://localhost:5000/api/get-notes')

        if (res.status === 200) {
            await useNoteStore.setState({ notesArr: res.data })
            console.log('Notes fetched successfully', useNoteStore.getState().notesArr) 
        }
        console.error("Error getting notes.", useNoteStore.getState().notesArr)
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
        console.error("Error deleting note.", res)
    } catch (error) {
        console.error("Error deleting note.", error)
    }
}

export const updateNote = async(id) => {
    const { title, content, tags, deadline, folder, backgroundColor} = useNoteStore.getState();

    const formData = {
        title,
        content,
        tags,
        deadline,
        folder,
        backgroundColor
    }

    try {
        const res = axios.put(`http://localhost:5000/api/update-note/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (res.status === 200) {
            console.log('Note updated successfully')
            await getNotes();
            handleReset();
        }
        console.error('Error updating note', res.status)
        handleReset();
    } catch (error) {
        console.error('Error updating note', error)
        handleReset();
    }
}