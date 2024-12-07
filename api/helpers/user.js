/**
 * Filters an object to include only the allowed properties.
 * @param {Object} data - The original object containing the properties.
 * @param {Array<string>} allowedProperties - List of allowed keys.
 * @returns {Object} - A new object containing only the allowed properties.
 */

export const filterEditableFields = (data, EditableFields) => {
    return Object.keys(data)
      .filter((key) => EditableFields.includes(key))
      .reduce((filtered, key) => {
        filtered[key] = data[key];
        return filtered;
      }, {});
};
