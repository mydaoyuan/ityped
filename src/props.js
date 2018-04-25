/**
 * @name setProps
 * @description Set the ityped properties configuration
 * @param {Object} config The configuration properties
 * @return {Promise}
 */
export const setProps = ({
  strings = ['Put your strings here...', 'and Enjoy!'],
  typeSpeed = 100,
  waitDelay = 500,
  startDelay = 500,
  cursorChar = '|',
  showCursor = true,
  onFinished = function() {}
}) => ({
  strings,
  typeSpeed,
  cursorChar,
  waitDelay,
  startDelay,
  showCursor,
  onFinished
})
