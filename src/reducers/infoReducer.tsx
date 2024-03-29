import * as type from '../constants/actionType';
import { InfoState, ActionType } from '../constants/globalInterface';

const initialState: InfoState = {
    seconds: 0,
    minutes: 0,
    hours: 0,
    isInfo: true,
    isclear: true,
    timeLimit: 0,
    undoMove: true,
    isRestartTime: false,
    listMessages:  [],
    myMessage: ''
};

export default function infoReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case type.COUNT_DOWN: {
            let { seconds, minutes, hours } = state;
            if (minutes === 59) {
                hours += 1;
                minutes = 0;
            } else if (seconds === 59) {
                minutes += 1;
                seconds = 0;
            } else {
                seconds += 1;
            }
            return { ...state, seconds, minutes, hours };
        }
        case type.USER_HANDLE_TAP_CHANGE: {
            return { ...state, isInfo: !state.isInfo };
        }
        case type.USER_HANLDE_CHANGE_SETTING: {
            const { timeLimit, undoMove } = action.payload;
            return { ...state, timeLimit, undoMove };
        }
        case type.USER_HANDLE_RESET_TIME: {
            return { ...state, seconds: 0, minutes: 0, hours: 0, isRestartTime: true };
        }
        case type.USER_HANDLE_AFTER_RESTART_TIME: {
            return { ...state, isRestartTime: false };
        }
        case type.HANDLE_CHANGE_MESSAGE: {
            const { value } = action.payload;
            return { ...state, myMessage: value };
        }
        case type.HANDLE_SEND_MESSAGE: {
            const { value } = action.payload;
            const { listMessages } = state;
            listMessages.push(value);
            return { ...state, listMessages };
        }
        case type.HANDLE_RESTART_INFO: {
            return initialState;
        }
        default:
            return state;
    }
}
