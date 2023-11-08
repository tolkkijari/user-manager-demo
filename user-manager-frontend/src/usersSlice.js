import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mapIncomingUser = user => {
  return {
    id: user.id,
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

export const fetchUsers = createAsyncThunk('/getAll', async () => {
  const response = await fetch(REMOTE_URL + '/', {
    method: 'GET',
    cache: 'no-cache'
  });
  return await response.json();
});

export const updateUser = createAsyncThunk('/update-user', async (idAndFields) => {
  const {userId, fields} = idAndFields

  if(userId === null || userId === undefined) {
    throw new Error("Can't update a user, id is null or undefined");
  }

  const fieldsJson = JSON.stringify(fields);
  if(fieldsJson === null || fieldsJson === undefined) {
    throw new Exception("Can't send an update request for the user id " + userId + " because the fields were parsed to null or undefined.");
  }

  const response = await fetch(REMOTE_URL + '/' + userId, {
    method: 'PUT',
    cache: 'no-cache',
    headers: {
      "Content-Type": "application/json",
    },
    body: fieldsJson
  });
  return await response.json();
});

export const deleteUser = createAsyncThunk('/deleteUser', async (userId) => {
  if(userId == null || userId == undefined) {
    throw new Error("Can't delete a user, id is null or undefined");
  }
  const response = await fetch(REMOTE_URL + '/' + userId, {
    method: 'DELETE',
    cache: 'no-cache'
  });
  return await response.json();
});

export const createUser = createAsyncThunk('/create-user', async (fields) => {
  const fieldsJson = JSON.stringify(fields);
  if(fieldsJson === null || fieldsJson === undefined) {
    throw new Exception("Can't send a crete request because the fields were parsed to null or undefined.");
  }

  const response = await fetch(REMOTE_URL + '/create', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      "Content-Type": "application/json",
    },
    body: fieldsJson
  });
  return await response.json();
});


export const userSlice = createSlice({
  name: 'users',
  initialState: {
    userList: [],
    selectedUserId: null,
    error: null,
    status: '',
    showEditModal: false,
    showInfoModal: false,
    showAddUserModal: false,
    editFields: {}
  },
  reducers: {
    openAddUserModal: (state, action) => {
      state.showInfoModal = false;
      state.showEditModal = false;
      state.showAddUserModal = true;
      state.selectedUserId = null;
    },
    startToEdit: (state, action) => {
      const id = action.payload;
      const user = state.userList.find(u => u.id === id);
      if(!!user) {
        state.showInfoModal = false;
        state.showEditModal = true;
        state.showAddUserModal = false;
        state.selectedUserId = id;
      }
      else {
        throw new Error("No user with the id " + id);
      }
    },
    cancelEditChanges: (state, action) => {
      state.selectedUserId = null;
      state.showEditModal = false;
    },
    cancelAddChanges: (state, action) => {
      state.selectedUserId = null;
      state.showAddUserModal = false;
    },
    closeInfoModal: (state, action) => {
      state.showInfoModal = false;
      state.selectedUserId = null;
    },
    openInfoModal: (state, action) => {
      const id = action.payload;
      const user = state.userList.find(u => u.id === id);
      if(!!user) {
        state.showInfoModal = true;
        state.showEditModal = false;
        state.showAddUserModal = false;
        state.selectedUserId = id;
      }
      else {
        throw new Error("No user with the id " + id);
      }
    },
    editFieldContent: (state, action) => {
      if(typeof action.payload.field === 'string') {
        const field = action.payload.field;
        let value = action.payload.value;
        if(!value || typeof value !== 'string') {
          value = "";
        }
        state.editFields[field] = value;
      }
    }
  },
  extraReducers: {
      [resetAndFetchUsers.pending]: (state, action) => {
        state.status = 'loading';
      },
      [resetAndFetchUsers.fulfilled]: (state, action) => {
        let users = [];
        if(Array.isArray(action.payload)) {
          users = action.payload.map(u => mapIncomingUser(u));
        }
        state.status = 'succeeded';
        state.userList = users;
      },
      [resetAndFetchUsers.rejected]: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      },
      [fetchUsers.rejected]: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      },
      [fetchUsers.pending]: (state, action) => {
        state.status = 'loading';
      },
      [fetchUsers.fulfilled]: (state, action) => {
        let users = [];
        if(Array.isArray(action.payload)) {
          users = action.payload.map(u => mapIncomingUser(u));
        }
        state.status = 'succeeded';
        state.userList = users;
      },
      [updateUser.rejected]: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      },
      [updateUser.pending]: (state, action) => {
        state.status = 'loading';
      },
      [updateUser.fulfilled]: (state, action) => {
        state.showEditModal = false;
        state.editFields = {};
        const newUserObj = action.payload;
        const id = newUserObj.id;
        //This is needed to maintain the correct object structure.
        delete newUserObj.id;
        const userList = state.userList;
        const oldUserIndex = userList.findIndex(u => u.id === id);
        userList[oldUserIndex].fields = newUserObj;
        state.userList = userList;
      },
      [deleteUser.rejected]: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      },
      [deleteUser.pending]: (state, action) => {
        state.status = 'loading';
      },
      [deleteUser.fulfilled]: (state, action) => {
        const deletedUserId = action.payload.id;
        const userList = state.userList;
        state.userList = userList.filter(u => u.id !== deletedUserId);
        state.status = 'succeeded';
      },
      [createUser.rejected]: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      },
      [createUser.pending]: (state, action) => {
        state.status = 'loading';
      },
      [createUser.fulfilled]: (state, action) => {
        const createdUser = mapIncomingUser(action.payload);
        const userList = state.userList;
        userList.push(createdUser);
        state.userList = userList;
        state.showAddUserModal = false;
        state.status = 'succeeded';
      }
    }
});

export const { openAddUserModal, cancelAddChanges, startToEdit, cancelEditChanges, editFieldContent, openInfoModal, closeInfoModal } = userSlice.actions;
export const getUserIds = state => state.users.userList.map(u => u.id);
export const selectUserById = (state, id) => state.users.userList.find(u => u.id === id);
export const userList = state => state.users.userList;
export const isEditModalShown = state => state.users.showEditModal;
export const isInfoModalShown = state => state.users.showInfoModal;
export const isAddUserModalShown = state => state.users.showAddUserModal;
export const selectedUser = state => state.users.userList.find(u => u.id === state.users.selectedUserId);
export const editFields = state => state.users.editFields;
export default userSlice.reducer;