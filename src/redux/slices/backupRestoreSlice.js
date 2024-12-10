import { createSlice } from '@reduxjs/toolkit';

const backupRestoreSlice = createSlice({
    name: 'backupRestore',
    initialState: {
        backupFiles: [],
        loading: false,
        error: null,
        successMessage: '',
    },
    reducers: {
        setBackupFiles: (state, action) => {
            state.backupFiles = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSuccessMessage: (state, action) => {
            state.successMessage = action.payload;
        },
    },
});

export const { setBackupFiles, setLoading, setError, setSuccessMessage } = backupRestoreSlice.actions;
export default backupRestoreSlice.reducer;
