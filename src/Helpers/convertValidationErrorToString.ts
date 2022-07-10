import { ValidationError } from 'express-validator';

export function convertValidationErrorToString(
    data: ValidationError[],
    separatorText: string | undefined
): string {
    if (!data) {
        return '';
    }

    if (data.length > 1) {
        return data
            .map((r): ValidationError => {
                return r.msg;
            })
            .join(separatorText);
    } else {
        return data
            .map((r: ValidationError) => {
                return r.msg;
            })
            .join();
    }
}
