export interface BaseSuccess<T>{
    success: true,
    code: string,
    message: string,
    data: T,
};

export interface BaseFail {
    success: false,
    code: string,
    message: string,
    timestamp: string,
    path: string,
};

export type BaseResponse<T> = BaseSuccess<T> | BaseFail;