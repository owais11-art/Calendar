import { ref } from "vue"
import {
        updateDateGrid,
        updateDate,
        setEventAt,
        saveEvent,
        removeEvent } from "./handlers"
import { Database } from "../db/database"
import { ACTIONS } from "./actions"

const initialState = {
    date: {
        str: new Date(),
        dateString: new Date().toDateString()
    },
    eventAt: {
        at: ''
    },
    events: Database.getEvents(),
    dateGrid: []
}

export const state = ref(initialState)

export const dispatch = action => {
    switch(action.type){
        case ACTIONS.UPDATE_DATE:
            state.value = {...state.value, date: updateDate(state.value.date, action.payload)}
            break
        case ACTIONS.UPDATE_DATE_GRID:
            state.value = {...state.value, dateGrid: updateDateGrid(state.value.date)}
            break
        case ACTIONS.SET_EVENT_AT:
            state.value = {...state.value, eventAt: setEventAt(state.value.date, action.payload)}
            break
        case ACTIONS.SAVE_EVENT:
            state.value = {...state.value, events: saveEvent(action.payload)}
            break
        case ACTIONS.REMOVE_EVENT:
            state.value = {...state.value, events: removeEvent(action.payload)}
            break
        default:
            return
    }
}