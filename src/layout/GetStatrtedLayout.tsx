import React from 'react';
import { CalendarLayoutModel } from './AuthLayout';

export default function GetStartedLayout ({children}: CalendarLayoutModel): JSX.Element {
    return (
        <div className="get-started-layout">
            <div className="get-started-wrapper">{children}</div>
        </div>
    )
}