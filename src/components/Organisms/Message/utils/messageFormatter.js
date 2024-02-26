export const useMessageFormatter = () => {
  const mentionFormatter = (message, target) => {
    if (target && message) {
      let str = message
      if (str.includes('@')) {
        str = str.replace(/@\w+\b/g, (match, offset) => {
          return `<span
            id="${match}"
            style="
              font-weight: 600;
              color: hsl(221, 100%, 58%);
              border-bottom: 1px dotted hsla(221, 100%, 58%, 0.6);
              text-decoration: none;
              cursor: pointer;
            "
          >
            ${match}
          </span>`
        })
      }
      target.innerHTML = str
    }
  }

  const gifFormatter = (message, target) => {
    if (target && message) {
      let str = message
      if (str.includes('/gif::')) {
        str = str.replace(/\/gif::.+(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)/g, (match, offset) => {
          const url = match.replace('/gif:: ', '')
          return `<span class="gif_image">
                <img src="${url}"/>
                </span>`
        })
      }
      target.innerHTML = str
    }
  }

  return { mentionFormatter, gifFormatter }
}
