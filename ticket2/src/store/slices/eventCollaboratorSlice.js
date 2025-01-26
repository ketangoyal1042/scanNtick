import { createSlice } from "@reduxjs/toolkit";


export const eventCollaboratorSlice = createSlice({
    name: "collaborator",
    initialState: {
        collaboratorList: []
    },
    reducers: {
        setCollaborator: (state, action) => {
            state.collaboratorList = action?.payload;
        },
        addNewCollaborator: (state, action) => {
            state.collaboratorList.push(action?.payload?.user);
        },
        removeCollaborator: (state, action) => {
            state.collaboratorList = state.collaboratorList.filter((user) => user._id !== action.payload);
        }
    }
});

export const {setCollaborator, addNewCollaborator, removeCollaborator} = eventCollaboratorSlice.actions;
export default eventCollaboratorSlice.reducer;