import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    taskDetailModal: {
        "priorityTask": {
            "priorityId": 2,
            "priority": "Medium"
        },
        "taskTypeDetail": {
            "id": 2,
            "taskType": "new task"
        },
        "assigness": [


        ],
        "lstComment": [],
        "taskId": 9283,
        "taskName": "trung",
        "alias": "trung",
        "description": "<p>11222vdvdvdfvfvfv</p>",
        "statusId": "1",
        "originalEstimate": 12,
        "timeTrackingSpent": 4,
        "timeTrackingRemaining": 12,
        "typeId": 2,
        "priorityId": 2,
        "projectId": 11848
    },

}

const taskModalReducer = createSlice({
    name: 'taskModalReducer',
    initialState,
    reducers: {

        get_detail_task: (state, action) => {
            state.taskDetailModal = action.payload;


        },
        update_detail_task: (state, action) => {

            state.taskDetailModal = action.payload;
        },
        add_member_task: (state, action) => {

            state.taskDetailModal.assigness = [...state.taskDetailModal.assigness, action.payload];
        },
        delete_member_task: (state, action) => {

            state.taskDetailModal.assigness = state.taskDetailModal.assigness.filter(user => user.id !== action.payload)
            
        },




    },
});

export const { get_detail_task, update_detail_task, update_description_task, add_member_task, delete_member_task } = taskModalReducer.actions;

export default taskModalReducer.reducer;
