const typeString = (word, i, el, props) => {
  el.innerHTML += word[i]
  if (i === word.length - 1) {
    if (isLastLetterOfLastString(word, props)) {
      return props.onFinished()
    }
    window.setTimeout(() => (el.innerHTML += '<br/>'), props.waitDelay)
  }
}

const isLastLetterOfLastString = (word, props) =>
  props.strings.indexOf(word) === props.strings.length - 1

const writeString = (el, position, props, time) => {
  const word = props.strings[position]
  let i = 0
  const startTick = window.setTimeout(() => {
    Array.from(word).forEach((letter, i) =>
      setTimeout(
        () => typeString(word, i, el, props),
        props.typeSpeed * (i + 1)
      )
    )
  }, time)
}

export const start = (element, props) => {
  const times = []
  const { strings, startDelay, typeSpeed, waitDelay } = props
  const arrLen = strings.length
  for (let i = 0; i < arrLen; i++) {
    const len = strings[i].length
    const prevTime = times[i - 1] || 0
    const nextTime = prevTime + len * typeSpeed + startDelay + waitDelay
    times.push(nextTime)
    const time = i === 0 ? startDelay : startDelay + times[i - 1]
    writeString(element, i, props, time)
  }
}
