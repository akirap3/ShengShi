/**
 * Helper to get localized field value. Supports both old string format and new Map format.
 * @param {string|object} field - The database field (string or {zh, en})
 * @param {string} locale - Current language ('zh' or 'en')
 */
export const getLocalizedField = (field, locale = 'en') => {
  if (!field) return '';
  if (typeof field === 'string') {
    return field;
  }
  return field[locale] || field['zh'] || '';
};

/**
 * Helper to get localized array. Supports old array format and new Map-of-arrays format.
 * @param {array|object} arr - The database field (array or {zh: [], en: []})
 * @param {string} locale - Current language ('zh' or 'en')
 */
export const getLocalizedArray = (arr, locale = 'en') => {
  if (!arr) return [];
  if (Array.isArray(arr)) {
    return arr;
  }
  return arr[locale] || arr['zh'] || [];
};
