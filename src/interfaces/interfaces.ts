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