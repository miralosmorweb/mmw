import { EventColor } from 'calendar-utils';

export interface CalendarEvent<MetaType = any>{
    id?: string | number;
    start: Date;
    end?: Date;
    title: string;
    discord: boolean;
    citeClass: string;
    description?: string;
    color?: EventColor;
    actions?: CalendarEventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: MetaType;
};

export interface CalendarEventAction {
    id?: string | number;
    label: string;
    cssClass?: string;
    a11yLabel?: string;
    onClick({ event, sourceEvent, }: {
        event: CalendarEvent;
        sourceEvent: MouseEvent | KeyboardEvent;
    }): any;
};