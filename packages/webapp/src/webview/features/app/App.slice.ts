import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { initialize } from '@sap/knowledge-hub-extension-types';
import type { App } from '@sap/knowledge-hub-extension-types';

export const initialState: App = {
    appId: ''
};

const app = createSlice({
    name: 'app',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(initialize.fulfilled.type, (state, action: PayloadAction<App>) => {
            state.appId = action.payload.appId;
        });
    }
});

export default app.reducer;
