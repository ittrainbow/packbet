export const i18n = (locale, component) => {
  const tab0msg = locale === 'ru' ? 'Инфо' : 'Iнфо'
  const tab1msg = locale === 'ru' ? 'Профиль' : 'Профiль'
  const tab2msg = locale === 'ru' ? 'Неделя' : 'Тиждень'
  const tab3msg = locale === 'ru' ? 'Календарь' : 'Календар'
  const tab4msg = locale === 'ru' ? 'Таблица' : 'Таблиця'
  const tab5msg = locale === 'ru' ? 'Редактор' : 'Редактор'
  const tab6msg = locale === 'ru' ? 'Создать' : 'Створити'

  const dbEnterMsg = locale === 'ru' ? 'Вы вошли как' : 'Ви увiйшли як'
  const dbAdminMsg = locale === 'ru' ? 'Вы - админ' : 'Ви - адмiн'
  const profHeaderMsg = locale === 'ru' ? 'Настройка профиля' : 'Налаштування профiлю'
  const profNameMsg = locale === 'ru' ? 'Введите имя' : `Введіть ім'я`
  const profLangMsg = locale === 'ru' ? 'Выберите язык интерфейса' : 'Виберіть мову інтерфейсу'

  const buttonChangesMsg = locale === 'ru' ? 'Изменений нет' : 'Немає змiн'
  const buttonCancelMsg = locale === 'ru' ? 'Отменить' : 'Скасувати'
  const buttonSaveMsg = locale === 'ru' ? 'Сохранить' : 'Зберегти'
  const buttonLogoutMsg = locale === 'ru' ? 'Выйти' : 'Вийти'
  const buttonProfileMsg = locale === 'ru' ? 'Настроить профиль' : 'Налаштувати профіль'
  const buttonDetailsMsg = locale === 'ru' ? 'Подробнее' : 'Детальнiше'
  const buttonDeleteWeekMsg = locale === 'ru' ? 'Удалить неделю' : 'Видалити тиждень'

  const countdownMsg = locale === 'ru' ? 'До начала игры' : 'До початку гри'
  const gameStartedMsg = locale === 'ru' ? 'Игра началась' : 'Гра почалась'
  const fiveDaysMsg = locale === 'ru' ? 'дней' : 'днiв'
  const twoDaysMsg = locale === 'ru' ? 'дня' : 'днi'
  const oneDayMsg = locale === 'ru' ? 'день' : 'день'
  const fiveHoursMsg = locale === 'ru' ? 'часов' : 'годин'
  const twoHoursMsg = locale === 'ru' ? 'часа' : 'години'
  const oneHourMsg = locale === 'ru' ? 'час' : 'година'
  const minutesMsg = locale === 'ru' ? 'мин' : 'хв'
  const secondsMsg = locale === 'ru' ? 'сек' : 'сек'

  const playerMsg = locale === 'ru' ? 'Игрок' : 'Гравець'
  const adminMsg = locale === 'ru' ? 'Админ' : 'Адмiн'

  const tableNameMsg = locale === 'ru' ? 'Имя' : `Iм'я`
  const tableAllMsg = locale === 'ru' ? 'Всего' : 'Всього'
  const tableCorrectMsg = locale === 'ru' ? 'Верно' : 'Вiрно'

  const weekNameMsg = locale === 'ru' ? 'Название недели' : 'Назва тижня'
  const weekQuestionMsg = locale === 'ru' ? 'Вопрос' : 'Питання'
  const weekTotalMsg = locale === 'ru' ? 'Тотал' : 'Тотал'
  const weekActivityMsg = locale === 'ru' ? 'Активность' : 'Активність'

  const otherUser1msg = locale === 'ru' ? 'Вы просматриваете ответы ' : 'Ви переглядаєте відповіді '
  const otherUser2msg =
    locale === 'ru'
      ? ', прогнозы не начавшихся игр скрыты. Нажмите для возвращения к своему профилю.'
      : ', прогнози ігор, що не почалися, приховані. Натисніть, щоб повернутися до свого профілю.'

  switch (component) {
    case 'header':
      return { tab0msg, tab1msg, tab2msg, tab3msg, tab4msg, tab5msg, tab6msg }

    case 'editor': {
      return { weekNameMsg, weekQuestionMsg, weekTotalMsg, weekActivityMsg }
    }

    case 'standings':
      return { tableNameMsg, tableAllMsg, tableCorrectMsg }

    case 'otheruser':
      return { otherUser1msg, otherUser2msg }

    case 'week':
      return { playerMsg, adminMsg }

    case 'countdown':
      return {
        countdownMsg,
        gameStartedMsg,
        fiveDaysMsg,
        twoDaysMsg,
        oneDayMsg,
        fiveHoursMsg,
        twoHoursMsg,
        oneHourMsg,
        minutesMsg,
        secondsMsg
      }

    case 'auth':
      return {
        dbEnterMsg,
        dbAdminMsg,
        profHeaderMsg,
        profNameMsg,
        profLangMsg
      }

    case 'buttons':
      return {
        buttonChangesMsg,
        buttonCancelMsg,
        buttonSaveMsg,
        buttonLogoutMsg,
        buttonProfileMsg,
        buttonDetailsMsg,
        buttonDeleteWeekMsg
      }

    default:
      return
  }
}
