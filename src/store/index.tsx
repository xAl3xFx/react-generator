import { configureStore } from '@reduxjs/toolkit';

import formRowReducer from './formRow';

const store = configureStore({
    reducer: { formRow: formRowReducer }
});

export default store;