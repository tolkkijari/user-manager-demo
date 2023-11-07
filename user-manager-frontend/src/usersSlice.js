import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mapIncomingUsers = user => {
  return {
    id: user.id,
    editFields: {},
    isUnderEdit: false,
    fields: {
      name: user.name || '',
      username: user.username || '',
      email: user.email || '',
      address: user.address || '',
      postalAddress: user.postalAddress || '',
      phone: user.phone || '',
      website: user.website || '',
      company: user.company || ''
    }
  };
};

const REMOTE_URL = 'http://localhost:8080/api/users';

export const resetAndFetchUsers = createAsyncThunk('/reset', async () => {
  const response = await fetch(REMOTE_URL + '/reset-all', {
    method: 'POST',
    cache: 'no-cache'
  });
  return await response.json();
});

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    userList: [],
    error: null,
    status: ''
  },
  reducers: {
    startToEdit: (state, action) => {
      const id = action.payload;
      const user = state.userList.find(u => u.id === id);
      if(!!user) {
        user.isUnderEdit = true;
      }
    },
    cancelChanges: (state, action) => {
      const id = action.payload;
      const user = state.userList.find(u => u.id === id);
      if(!!user) {
        user.isUnderEdit = false;
      }
    },
    editFieldContent: (state, action) => {
      const id = action.payload.id;
      const user = state.userList.find(u => u.id === id);
      if(!!user && !!action.payload.field && typeof action.payload.field === 'string') {
        const field = action.payload.field;
        let value = action.payload.value;
        if(!value || typeof value !== 'string') {
          value = "";
        }
        user.editFields[field] = value;
      }
    },
    saveChanges: (state, action) => {
      const id = action.payload;
      const user = state.userList.find(u => u.id === id);
      if(!!user) {
        user.fields = {...user.fields, ...user.editFields};
        user.isUnderEdit = false;
        user.editFields = {};
      }
    }
  },
  extraReducers: {
      [resetAndFetchUsers.pending]: (state, action) => {
        return {...state, status: 'loading'};
      },
      [resetAndFetchUsers.fulfilled]: (state, action) => {
        let users = [];
        if(Array.isArray(action.payload)) {
          users = action.payload.map(u => mapIncomingUsers(u));
        }
        return {...state, status: 'succeeded', userList: users};
      },
      [resetAndFetchUsers.rejected]: (state, action) => {
        return {...state, status: 'failed', error: action.error.message};
      }
    }
});

export const { startToEdit, saveChanges, cancelChanges, editFieldContent } = userSlice.actions;
export const getUserIds = state => state.users.userList.map(u => u.id);
export const selectUserById = (state, id) => state.users.userList.find(u => u.id === id);
export const allUsers = state => state.users.userList;
export default userSlice.reducer;