import { configureStore } from '@reduxjs/toolkit';
import { bindActionCreators } from 'redux';

import { reducer, getInitialState } from './reducer';
import { postMessageMiddleware, loggerMiddleware } from './middleware';
import * as AllActions from './actions';

export const store = configureStore({
    reducer,
    preloadedState: getInitialState(),
    devTools: false,
    middleware: [postMessageMiddleware, loggerMiddleware]
});

// bind actions to store
export const actions = bindActionCreators(AllActions, store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
