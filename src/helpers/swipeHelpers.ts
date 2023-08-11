type SwipeHelperProps = {
  moveX: number
  canSwipeLeft: boolean
  canSwipeRight: boolean
}

export const swipeHelper = ({ moveX, canSwipeLeft, canSwipeRight }: SwipeHelperProps) => {
  const container = document.querySelector('.container')

  if (moveX > 0 && canSwipeLeft) {
    const list = container?.classList
    list?.add('animate-fade-out-right')
  }

  if (moveX < 0 && canSwipeRight) {
    const list = container?.classList
    list?.add('animate-fade-out-left')
  }
}
