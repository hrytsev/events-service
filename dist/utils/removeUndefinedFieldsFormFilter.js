"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveUndefinedFieldsFormFilter = void 0;
const RemoveUndefinedFieldsFormFilter = (filters) => {
    return Object.keys(filters).reduce((acc, key) => {
        if (filters[key] !== undefined) {
            acc[key] = filters[key];
        }
        return acc;
    }, {});
};
exports.RemoveUndefinedFieldsFormFilter = RemoveUndefinedFieldsFormFilter;
