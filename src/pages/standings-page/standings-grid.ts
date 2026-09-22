export function standingsGridClass(seasonSelected: number) {
  return seasonSelected === 2022
    ? 'grid gap-0.5 min-h-[1.875rem] grid-cols-[1.75rem,1fr,3.25rem,2.75rem,2.75rem] sm:grid-cols-[2rem,1fr,4rem,3.5rem,3.5rem]'
    : 'grid gap-0.5 min-h-[1.875rem] grid-cols-[1.75rem,1.75rem,1fr,3.25rem,2.75rem,2.75rem] sm:grid-cols-[2rem,2rem,1fr,4rem,3.5rem,3.5rem]'
}
