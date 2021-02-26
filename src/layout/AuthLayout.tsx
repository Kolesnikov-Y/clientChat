import React from 'react';
import './authLayout.scss'

export interface CalendarLayoutModel {
    children: React.ReactChild | React.ReactChild[]
}

export default function AuthLayout ({children}: CalendarLayoutModel): JSX.Element {
    return (
        <div className="auth-layout">
            <div className="auth-wrapper">{children}</div>
        </div>
    )
}