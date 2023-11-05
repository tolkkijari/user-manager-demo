import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'users',
  initialState: [
    {
      id: 'user1',
      fields: {
        name: 'Esko Esimerkki',
        userName: 'Eze',
        email: 'esko.esimerkki@example.com',
        street: 'Esimerkkitie 7',
        suite: '7',
        town: 'Joensuu',
        zip: '80200',
        phone: '0501234567',
        website: 'example.com',
        company: 'Oy Firma Ab'
      },
      editFields: {},
      isUnderEdit: false
    }
  ],
  reducers: {
    startToEdit: (state, action) => {
      const id = action.payload;
      const user = state.find(u => u.id === id);
      if(!!user) {
        user.isUnderEdit = true;
      }
    },
    cancelChanges: (state, action) => {
      const id = action.payload;
      const user = state.find(u => u.id === id);
      if(!!user) {
        user.isUnderEdit = false;
      }
    },
    editFieldContent: (state, action) => {
      const id = action.payload.id;
      console.log(id);
      const user = state.find(u => u.id === id);
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
      const user = state.find(u => u.id === id);
      if(!!user) {
        user.fields = {...user.fields, ...user.editFields};
        user.isUnderEdit = false;
        user.editFields = {};
      }
    }
  }
});
export const { startToEdit, saveChanges, cancelChanges, editFieldContent } = userSlice.actions;
export const getUserIds = state => state.users.map(u => u.id);
export const selectUserById = (state, id) => state.users.find(u => u.id === id);
export const allUsers = state => state.users;
export default userSlice.reducer;