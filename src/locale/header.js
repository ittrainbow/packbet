export const headerLocale = (locale) => {
  const tab0msg = locale === 'ru' ? 'Инфо' : 'Iнфо'
  const tab1msg = locale === 'ru' ? 'Профиль' : 'Профiль'
  const tab2msg = locale === 'ru' ? 'Неделя' : 'Тиждень'
  const tab3msg = locale === 'ru' ? 'Календарь' : 'Календар'
  const tab4msg = locale === 'ru' ? 'Таблица' : 'Таблиця'
  const tab5msg = locale === 'ru' ? 'Редактор' : 'Редактор'
  const tab6msg = locale === 'ru' ? 'Создать' : 'Створити'

  return {
    tab0msg,
    tab1msg,
    tab2msg,
    tab3msg,
    tab4msg,
    tab5msg,
    tab6msg
  }
}