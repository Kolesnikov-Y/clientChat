import React from 'react'

interface CalendarLayoutModel {
    children: React.ReactChild | React.ReactChild[]
}

export default function  CalendarLayout ({children}: CalendarLayoutModel): JSX.Element {
    return (
        <div className="calendar-layout">
            <div className="calendar-wrapper">{children}</div>
        </div>
    )
}