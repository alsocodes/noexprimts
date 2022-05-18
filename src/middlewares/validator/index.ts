import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import HttpResponse from '../../utils/response';

const validator = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    const e = errors.array().reduce((row: any, item: any) => {
        row[item.param] = row[item.param] || {
            value: item.value,
            location: item.location,
            msgs: [],
        };
        row[item.param].msgs = [...row[item.param].msgs, item.msg];
        return row;
    }, Object.create(null));

    const response = new HttpResponse();
    response.invalidInput(res, 400, 'Invalid input', e);
};

export default validator;
