// API Fetch tutorial: https://blog.devgenius.io/async-api-fetching-with-redux-toolkit-2020-8623ff9da267

import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  email: null,
  isRegistered: false,
  preview: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.email = action.payload;
    },
    registerValidation: (state, action) => {
      state.isRegistered = action.payload;
    },
    updatePreview: (state, payload) => {
      state.preview = payload;
    },
    logoutUser: (state) => {
      state.email = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, logoutUser, registerValidation, updatePreview } =
  userSlice.actions;

export default userSlice.reducer;

// Asynchronous thunk action
export const loginUser = (_email, _password) => (dispatch) => {
  let requestUrl = "https://foodbutler-backend.herokuapp.com/validatelogin";

  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: _email, password: _password }),
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => {
          dispatch(registerValidation(res));
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const checkRegistered = (_email) => (dispatch) => {
  let requestUrl = "https://foodbutler-backend.herokuapp.com/checkregistered";

  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: _email }),
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => {
          dispatch(registerValidation(res));
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const savePreference = (_email, _age, _cuisines) => (dispatch) => {
  let requestUrl = "https://foodbutler-backend.herokuapp.com/setpreference";

  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: _email, age: _age, cuisines: _cuisines }),
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => {
          dispatch(registerValidation(res));
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setPreview = (preview) => (dispatch) => {
  dispatch(updatePreview(preview));
};
