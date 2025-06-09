export interface IApiResponse {
    statusCode: number;
    message: string;
    data?: any;
}

export interface IEvent {
    title: string;
    user_id: number;
    description?: string;
    event_date: Date;
    created_at: Date;
}