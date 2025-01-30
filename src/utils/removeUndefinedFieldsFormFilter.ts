import {EventFilters} from "../types/events/event";

export const RemoveUndefinedFieldsFormFilter = (filters: EventFilters) => {
  return   Object.keys(filters).reduce((acc  , key) => {
        if (filters[key] !== undefined) {
            acc[key] = filters[key];
        }
        return acc;
    }, {} as EventFilters);
}
