export interface IApiResponse {
    statusCode: number;
    message: string;
    data?: any;
}

export interface IEvent {
    id: number;
    title: string;
    user_id: number;
    description?: string;
    start_time: Date;
    end_time: Date;
    created_at: Date;
    overlapIndex?: number;
}

export interface PositionedEvent extends IEvent {
    overlap: boolean;
    position: 'left' | 'right';
}

export interface IEditOrDeleteModalResult {
    action: 'EDIT' | 'DELETE'
    event: IEvent;
}

export interface ICreateEventData {
    title: string;
    description?: string;
    start_time: string;
    end_time: string;
}

export interface IForecastData {
    date: Date;
    label: string;
    minTemp: number | null;
    maxTemp: number | null;
    weatherIcon: string;
    events: IEvent[];
}

export interface IUserSetting {
    language: string;
    timezone: string;
    location: string;
    id?: number;
    user_id?: number;
    dark_mode: boolean;
}