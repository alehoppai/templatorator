/**
 * Capitalizing any word, not whole sentence
 * @param {string} str 
 * @returns {string}
 */
export function capitalize(str) {
  if (!str) return '';

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Should used for split by \n file content.
 * looking for a next line index below last match of 
 * given keyword.
 * @param {string[]} lines 
 * @param {string} keyword 
 * @returns {number}
 */
export function findLineAfterKeyword(lines, keyword) {
  let lastKeywordIndex = -1

  lines.forEach((line, index) => {
    if (line.includes(keyword)) {
      lastKeywordIndex = index
    }
  });

  return lastKeywordIndex !== -1 && lastKeywordIndex + 1 < lines.length 
    ? lastKeywordIndex + 1
    : -1
}
