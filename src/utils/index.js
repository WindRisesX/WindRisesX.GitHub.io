/**
 * get tags from file name
 * 
 * @export
 * @param {any} fileName 
 */
export function Tags (fileName) {
  let tags = fileName.replace(/\.md$/, '')
  .match(/#[\u4E00-\u9FA5a-zA-Z\.]+/g) || []

  return tags.map(tag => {
    return tag.replace('#', '')
  })
}

/**
 * get title from file name
 *
 * @export
 * @param {string} fileName
 * @returns {string}
 */
export function Title (fileName) {
  return fileName.replace(/\.md$/, '')
    .replace(/\d{4}-\d{1,2}-\d{1,2}-/, '')
    .replace(/#[\u4E00-\u9FA5a-zA-Z\.]+/g, '')
}

/**
 * get publish date from file name
 *
 * @export
 * @param {string} fileName
 * @returns {string}
 */
export function Date (fileName) {
  return /\d{4}-\d{1,2}-\d{1,2}/.exec(fileName)[0]
}
