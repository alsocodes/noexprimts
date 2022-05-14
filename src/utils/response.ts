export default class HttpResponse {
    serverError = (res: any, flag: number = 500, messages: string) =>
        res.status(flag).json({ success: false, flag, messages });

    success = (
        res: any,
        flag: number = 200,
        message: string,
        data: any = null
    ) => res.status(flag).json({ success: true, flag, message, result: data });

    error = (res: any, flag: number = 500, message: string) =>
        res.status(flag).json({ success: false, flag, message });

    notFound = (res: any, flag: number = 404, message: string) =>
        res.status(flag).json({ success: false, flag, message });

    invalidInput = (
        res: any,
        flag: number = 400,
        message: string,
        error: any
    ) => res.status(flag).json({ success: false, flag, message, error });

    unauthorized = (res: any, flag: number = 401, message: string) =>
        res.status(flag).json({ success: false, flag, message });

    forbidden = (res: any, flag: number = 500, message: string) =>
        res.status(403).json({ success: false, flag, message });

    conflict = (res: any, flag: number = 500, message: string) =>
        res.status(409).json({ success: false, flag, message });
}
