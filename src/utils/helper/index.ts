const makeError = (msg: string, code: number) => {
    const err: any = new Error(msg);
    err.code = 400;
    return err;
};

const getCookie = (cookie: string = '', key: string) => {
    key = `${key}=`;
    return cookie
        ?.split(';')
        ?.map((item) => item.trim(), [])
        ?.filter((item) => item.includes(key), [])?.[0]
        ?.replace(key, '');
};
export { makeError, getCookie };
