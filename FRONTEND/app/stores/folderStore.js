import { create } from "zustand"
import { devtools, subscribeWithSelector, persist } from 'zustand/middleware'
import axios from 'axios'

const initialValues = {
    foldersArr: [],
    folderName: ""
}

export const useFolderStore = () => {
    devtools(
        subscribeWithSelector(
            persist(() => initialValues, { name: "Folder store"})
        ),
        { name: "Folder store" }
    )
}

