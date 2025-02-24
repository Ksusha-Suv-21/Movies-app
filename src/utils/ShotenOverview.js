
function shorten(text, maxLenght) {
    if (text.length > maxLenght) {
      return `${text.slice(0, maxLenght).split(' ').slice(0, -1).join(' ')}...`
    } else {
      return `${text}...`
    }
}

export default shorten
