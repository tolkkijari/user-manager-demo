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

const mapIncomingSuggestion = (user, field) => {
  return {
    id: user.id,
    name: user.name || '',
    selectedFieldContent: user[field]
  };
};

const REMOTE_URL = 'http://localhost:8080/api/users';

export const searchFields = {name: 'Name', username: 'Username', email: 'Email', address: 'Address',
  postalAddress: 'Postal address', phone: 'Phone', website: 'Website', company: 'Company'};

export const fetchUsers = createAsyncThunk('/getAll', async () => {
  const response = await fetch(REMOTE_URL + '/', {
    method: 'GET',
    cache: 'no-cache'
  });
  return await response.json();
});

export const updateUser = createAsyncThunk('/update-user', async (idAndFields) => {
  const {userId, fields} = idAndFields;

  if(userId === null || userId === undefined) {
    const text = "Can't update a user, id is null or undefined";
    console.error(text);
    throw new Exception(text);
  }

  if(fields.name.trim().length === 0) {
    const text = "Can't send an update request for the user id " + userId + " because the name was empty.";
    console.error(text);
    throw new Exception(text);
  }

  const fieldsJson = JSON.stringify(fields);
  if(fieldsJson === null || fieldsJson === undefined) {
    const text = "Can't send an update request for the user id " + userId + " because the fields were parsed to null or undefined.";
    console.error(text);
    throw new Exception(text);
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
    const text = "Can't delete a user, id is null or undefined";
    console.error(text);
    throw new Error(text);
  }
  const response = await fetch(REMOTE_URL + '/' + userId, {
    method: 'DELETE',
    cache: 'no-cache'
  });
  return await response.json();
});

export const createUser = createAsyncThunk('/create-user', async (fields) => {

  if(fields.name.trim().length === 0) {
    const text = "Can't send a create request because the name was empty.";
    console.error(text);
    throw new Exception(text);
  }

  const fieldsJson = JSON.stringify(fields);
  if(fieldsJson === null || fieldsJson === undefined) {
    const text = "Can't send a crete request because the fields were parsed to null or undefined.";
    console.error(text);
    throw new Exception(text);
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

export const runSearch = createAsyncThunk('/run-search', async (searchTerms) => {
  const {field, term} = searchTerms;

  const bodyJson = JSON.stringify({fieldName: field, searchText: term});
  if(bodyJson === null || bodyJson === undefined) {
    const text = "Can't send a crete request because the fields were parsed to null or undefined.";
    console.error(text);
    throw new Exception(text);
  }

  const response = await fetch(REMOTE_URL + '/search', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyJson
  });
  return await response.json();
});

export const appManagerSlice = createSlice({
  name: 'users',
  initialState: {
    userList: [],
    selectedUserId: null,
    error: null,
    status: '',
    showEditModal: false,
    showInfoModal: false,
    showAddUserModal: false,
    editFields: {},
    showSuggestionList: false,
    editFields: {},
    searchTerm: '',
    suggestions: [],
    selectedSearchField: 'name',
  },
  reducers: {
    openAddUserModal: (state, action) => {
      state.editFields = {};
      state.showInfoModal = false;
      state.showEditModal = false;
      state.showSuggestionList = false;
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
        state.showSuggestionList = false;
        state.selectedUserId = id;
      }
      else {
        const text = "No user with the id " + id;
        console.error(text);
        throw new Error(text);
      }
    },
    cancelEditChanges: (state, action) => {
      state.selectedUserId = null;
      state.editFields = {};
      state.showEditModal = false;
    },
    cancelAddUser: (state, action) => {
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
        state.showSuggestionList = false;
        state.suggestions = [];
        state.searchTerm = '';
        state.selectedUserId = id;
      }
      else {
        const text ="No user with the id " + id;
        console.error(text);
        throw new Error(text);
      }
    },
    openSuggestionList: (state, action) => {
      state.showInfoModal = false;
      state.showEditModal = false;
      state.showAddUserModal = false;
      state.showSuggestionList = true;
    },
    closeSuggestionList: (state, action) => {
      state.showSuggestionList = false;
      state.suggestions = [];
    },
    changeSearchField: (state, action) => {
      if(Object.keys(searchFields).findIndex(f => f === action.payload) === -1) {
        const text = action.payload +' is not a suitable value as a search field.';
        console.error(text);
        throw new Error(text);
      }
      state.selectedSearchField = action.payload;
    },
    changeSearchText: (state, action) => {
      state.searchTerm = action.payload;
      if(action.payload === null || state.searchTerm.length === 0) {
        state.suggestions = [];
        state.showSuggestionList = false;
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
    },
    [runSearch.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [runSearch.pending]: (state, action) => {
      state.status = 'loading';
    },
    [runSearch.fulfilled]: (state, action) => {
      state.suggestions = action.payload.map(s => mapIncomingSuggestion(s, state.selectedSearchField));
      if(state.suggestions.length > 0) {
        state.showSuggestionList = true;
      }
      else {
        state.showSuggestionList = false;
      }
      state.status = 'succeeded';
    }
  }
});

export const { openAddUserModal, changeSearchText, changeSearchField, cancelAddUser, startToEdit, cancelEditChanges, editFieldContent, openInfoModal, closeInfoModal } = appManagerSlice.actions;
export const getUserIds = state => state.users.userList.map(u => u.id);
export const selectUserById = (state, id) => state.users.userList.find(u => u.id === id);
export const userList = state => state.users.userList;
export const isEditModalShown = state => state.users.showEditModal;
export const isInfoModalShown = state => state.users.showInfoModal;
export const isAddUserModalShown = state => state.users.showAddUserModal;
export const selectedUser = state => state.users.userList.find(u => u.id === state.users.selectedUserId);
export const editFields = state => state.users.editFields;
export const isSuggestionListShown = state => state.users.showSuggestionList;
export const suggestions = state => state.users.suggestions;
export const searchTerm = state => state.users.searchTerm;
export const selectedSearchField = state => state.users.selectedSearchField;
export default appManagerSlice.reducer;