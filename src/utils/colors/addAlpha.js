export function addAlpha(color, opacity) {
  const firstThreeChr = color.slice(0, 3)

  if (firstThreeChr.slice(0, 1) === '#') {
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255)
    return `${color}${_opacity.toString(16).toUpperCase()}`
  } else if (firstThreeChr === 'rgb') {
    const _opacity = Math.min(Math.max(opacity || 1, 0), 1)
    return `${color.replace('rgb', 'rgba').slice(0, -1)},${_opacity})`
  } else if (firstThreeChr === 'hsl') {
    const _opacity = Math.min(Math.max(opacity || 1, 0), 1)
    return `${color.replace('hsl', 'hsla').slice(0, -1)},${_opacity})`
  }
}
