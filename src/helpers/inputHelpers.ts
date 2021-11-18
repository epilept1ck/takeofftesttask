import formatStringByPattern from "format-string-by-pattern";
import {filterNumbersFromString} from "./numberHelpers";

export const formatPhoneByPattern = (phone: string, pattern?: string) => {
    const _phone  = phone.length === 1 && phone[0] !== '7' ? '7' : phone
    return formatStringByPattern(pattern || '+7 (999) 999-99-99', filterNumbersFromString(_phone))
}

export const filterPhone = (phone: string) => {
    return phone
        .replaceAll('(', '')
        .replaceAll(')', '')
        .replaceAll(' ', '')
        .replaceAll('-', '')
}
