export function getHeight() {
  return (
    Math.max(
      document.getElementById('container').offsetHeight + 35,
      window.innerHeight
    )
  )
}