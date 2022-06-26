import { login, firstLaunch, bookmarkList } from "../redux/actions";

const initialState = {
    user: {},
    count: 0
};

function loginReducer(state = initialState, action) {

    switch (action.type) {
        case login:
            return { ...state, user: action.payload }
        case firstLaunch:
            return {
                ...state, count: action.payload
            }
        case bookmarkList:
            return {
                ...state, cat_and_que_list: action.payload
            }
        default:
            return state
    }

}

export default loginReducer;