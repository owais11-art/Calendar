import { getNumberOfDays, DAYS, increase, decrease, arrangeGridAccordingToDays } from "./helpers"
import {Database} from '../db/database'

const updateDateGrid = date => {
    const [ _, monthName, __, year ] = date.dateString.split(' ')
    const numberOfDays = getNumberOfDays(monthName, year)
    const currentMonthDates = []
    const monthNumber = date.str.getMonth() + 1
    for(let i = 0; i < numberOfDays; i++){
        const item = {}
        const day = new Date(`${year}-${monthNumber}-${i+1}`).getDay()
        item.id = i + 1
        item.dt = i + 1
        item.day = DAYS[day]
        item.haveEvent = Database.haveEvent(monthName, year, item.dt)
        currentMonthDates.push(item)
    }
    return arrangeGridAccordingToDays(currentMonthDates)
}

const updateDate = (date, payload) => {
    const year = date.str.getFullYear()
    const month = date.str.getMonth()
    let newDate = {}
    if(payload.direction === 'next-month') {
        newDate = increase(month, year)
    }
    else newDate = decrease(month, year)
    return newDate
}

const setEventAt = (date, payload) => {
    const eventDate = date.dateString.split(' ')
    eventDate.splice(2, 1, payload.dt)
    return {
        at: eventDate.join(' ')
    }
}

const saveEvent = payload => {
    Database.setEvent(payload)
    return Database.getEvents()
}

const removeEvent = payload => {
    Database.removeEvent(payload.id)
    return Database.getEvents()
}

export {
    updateDateGrid,
    updateDate,
    setEventAt,
    saveEvent,
    removeEvent 
}