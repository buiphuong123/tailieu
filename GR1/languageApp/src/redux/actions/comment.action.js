import axios from 'axios';
import { API_ENDPOINT } from '../../constants';
import * as types from './../constants/action-types';

export function getListCommentRequest (grammar_id, user_id) { 
    return {
      type: types.GET_LIST_COMMENT_REQUEST,
      payload: {grammar_id, user_id},
      
    }
}

export const getListCommentSuccess = (commentList) => {
    return {
        type: types.GET_LIST_COMMENT,
        payload: {commentList},
    }
};
