export interface IApiResponse {
    statusCode: number;
    message: string;
    data?: any;
}

export interface IEvent {
    title: string;
    user_id: number;
    description?: string;
    start_time: Date;
    end_time: Date;
    created_at: Date;
}