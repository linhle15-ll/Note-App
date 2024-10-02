import { create } from "zustand";
import { devtools, subscribeWithSelector, persist } from 'zustand/middleware';
import axios from 'axios';

const initialNoteValues = {
    notesArr: [],
    title: "",
    content: "",
    tags: [],
    deadline: "",
    folder: "",
    backgroundColor: "#ffffff",
};

export const useNoteStore = create()(
    devtools(
        subscribeWithSelector(
            persist(() => initialNoteValues, { name: "Note store" })
        ),
        { name: "Note store" }
    )
);

export const handleChangeTitle = (value) => {
    useNoteStore.setState({ title: value });
};

export const handleChangeContent = (value) => {
    useNoteStore.setState({ content: value });
};

export const handleChangeDeadline = (value) => {
    useNoteStore.setState({ deadline: value });
};

export const handleChangeFolder = (folderId) => {
    useNoteStore.setState({ folder: value });
    // useNoteStore.setFolder
};

export const handleChangeTag = (value) => {
    useNoteStore.setState({ tag: value });
};

export const addNewTag = () => {
    const { tags, tag } = useNoteStore.getState();

    if (tag.trim() !== "") {
        useNoteStore.setState({ 
            tags: [...tags, tag.trim()], 
            tag: "" 
        });
    }
};

export const handleChangeBackgroundColor = (color) => {
    useNoteStore.setState({ backgroundColor: color.hex });
};

export const handleReset = () => {
    useNoteStore.setState(initialNoteValues);
};

export const handleRemoveTag = (tagToRemove) => {
    const { tags } = useNoteStore.getState();
    const unRemovedTags = tags.filter((tag) => tag !== tagToRemove);

    useNoteStore.setState({ tags: unRemovedTags });
    console.log('Tag removed successfully', unRemovedTags);
};

const fetchNotes = async () => {
    const res = await axios.get('http://localhost:5000/api/get-notes');
    return res.data;
};

export const addNote = async (e) => {
    e.preventDefault();
    
    const { title, content, tags, deadline, folder, backgroundColor } = useNoteStore.getState();
    const formData = { title, content, tags, deadline, folder, backgroundColor };

    try {
        const res = await axios.post('http://localhost:5000/api/add-note', formData, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.status === 201) {
            console.log('Note added successfully', res.data);
            await getNotes();
            handleReset();
        }
    } catch (error) {
        console.error('Error creating note', error.message);
    }
};

export const getNotes = async () => {
    try {
        const notes = await fetchNotes();
        useNoteStore.setState({ notesArr: notes });
        console.log('Notes fetched successfully', notes);
    } catch (error) {
        console.error("Error getting notes.", error.message);
    }
};

export const getNote = async (id) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/get-note/${id}`);
        if (res.status === 200) {
            const note = res.data;
            console.log("Note found: ", note);
            useNoteStore.setState({
                title: note.title,
                content: note.content,
                tags: note.tags,
                folder: note.folder,
                deadline: note.deadline,
                backgroundColor: note.backgroundColor
            });
        }
    } catch (error) {
        console.error("Error finding note.", error.message);
    }
};

export const deleteNote = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/delete-note/${id}`);
        if (res.status === 200) {
            console.log('Note deleted successfully');
            await getNotes();
        }
    } catch (error) {
        console.error("Error deleting note.", error.message);
    }
};

export const updateNote = async (id) => {
    const { title, content, tags, deadline, folder, backgroundColor } = useNoteStore.getState();
    const formData = { title, content, tags, deadline, folder, backgroundColor };

    try {
        const res = await axios.put(`http://localhost:5000/api/update-note/${id}`, formData, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.status === 200) {
            console.log('Note updated successfully');
            await getNotes();
            handleReset();
        }
    } catch (error) {
        console.error('Error updating note', error.message);
    }
};
