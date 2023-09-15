import { csrfFetch } from "./csrf";

const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER,
});

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch("/api/current-session", {
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        }),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
        return data;
    }
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case SET_USER:
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
