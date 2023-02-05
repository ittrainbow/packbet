export const i18n = (locale, component) => {
  const tab0msg = locale === 'ru' ? 'Инфо' : 'Iнфо'
  const tab1msg = locale === 'ru' ? 'Профиль' : 'Профiль'
  const tab2msg = locale === 'ru' ? 'Неделя' : 'Тиждень'
  const tab3msg = locale === 'ru' ? 'Календарь' : 'Календар'
  const tab4msg = locale === 'ru' ? 'Таблица' : 'Таблиця'
  const tab5msg = locale === 'ru' ? 'Редактор' : 'Редактор'
  const tab6msg = locale === 'ru' ? 'Создать' : 'Створити'

  const dashboardEnterMsg = locale === 'ru' ? 'Вы вошли как' : 'Ви увiйшли як'
  const dashboardAdminMsg = locale === 'ru' ? 'Вы - админ' : 'Ви - адмiн'
  const profileHeaderMsg = locale === 'ru' ? 'Настройка профиля' : 'Налаштування профiлю'
  const profileNameMsg = locale === 'ru' ? 'Введите имя' : `Введіть ім'я`
  const profileLangMsg = locale === 'ru' ? 'Выберите язык интерфейса' : 'Виберіть мову інтерфейсу'
  const loginIntro = locale === 'ru' ? 'Зарегистрированы?' : 'Зареєстровані?'
  const loginMsg = locale === 'ru' ? 'Войти' : 'Увiйти'
  const registerIntro = locale === 'ru' ? 'Нет аккаунта?' : 'Немає профілю?'
  const registerMsg = locale === 'ru' ? 'Регистрация' : 'Реєстрація'
  const forgotMsg = locale === 'ru' ? 'Забыли пароль?' : 'Забули пароль?'
  const registerNameMsg = locale === 'ru' ? 'Имя' : `Iм'я`

  const buttonChangesMsg = locale === 'ru' ? 'Изменений нет' : 'Немає змiн'
  const buttonCancelMsg = locale === 'ru' ? 'Отменить' : 'Скасувати'
  const buttonSaveMsg = locale === 'ru' ? 'Сохранить' : 'Зберегти'
  const buttonLogoutMsg = locale === 'ru' ? 'Выйти' : 'Вийти'
  const buttonProfileMsg = locale === 'ru' ? 'Настроить профиль' : 'Налаштувати профіль'
  const buttonDetailsMsg = locale === 'ru' ? 'Подробнее' : 'Докладніше'
  const buttonDeleteWeekMsg = locale === 'ru' ? 'Удалить неделю' : 'Видалити тиждень'
  const buttonRegisterMsg = locale === 'ru' ? 'Регистрация' : 'Реєстрація'
  const buttonRegisterGoogleMsg = locale === 'ru' ? 'Регистрация Google' : 'Реєстрація Google'
  const buttonLoginMsg = locale === 'ru' ? 'Войти' : 'Увiйти'
  const buttonLoginGoogleMsg = locale === 'ru' ? 'Войти через Google' : 'Увiйти через Google'
  const buttonRecoverMsg = locale === 'ru' ? 'Выслать e-mail' : 'Надіслати e-mail'

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
  const successMsg = locale === 'ru' ? 'Успешно сохранено' : 'Успішно збережено'
  const failureMsg = locale === 'ru' ? 'Не удалось сохранить' : 'Не вдалося зберегти'

  const tableNameMsg = locale === 'ru' ? 'Имя' : `Iм'я`
  const tableAllMsg = locale === 'ru' ? 'Всего' : 'Всього'
  const tableCorrectMsg = locale === 'ru' ? 'Верно' : 'Вiрно'

  const weekNameMsg = locale === 'ru' ? 'Название недели' : 'Назва тижня'
  const weekQuestionMsg = locale === 'ru' ? 'Вопрос' : 'Запитання'
  const weekTotalMsg = locale === 'ru' ? 'Тотал' : 'Тотал'
  const weekActivityMsg = locale === 'ru' ? 'Активность' : 'Активність'

  const otherUser1msg =
    locale === 'ru'
      ? 'Нажмите, чтобы вернуться к своему профилю.'
      : 'Натисніть, щоб повернутися до свого профілю.'
  const otherUser2msg =
    locale === 'ru' ? 'Сейчас вы просматриваете профиль ' : 'Зараз ви переглядаєте профіль '
  const otherUser3msg =
    locale === 'ru'
      ? ', прогнозы не начавшихся игр скрыты.'
      : ', прогнози ігор, що не почалися, приховані.'
  // const otherUser3msg = locale === 'ru' ? 'Нажмите, чтобы вернуться к своему профилю' : 'Натисніть, щоб повернутися до свого профілю.'

  const aboutYesMsg = locale === 'ru' ? `Ответ "Да"` : `Відповідь "Так"`
  const aboutNoMsg = locale === 'ru' ? `Ответ "Нет"` : `Відповідь "Ні"`
  const aboutOverMsg = locale === 'ru' ? `Ответ "Больше"` : `Відповідь "Більше"`
  const aboutUnderMsg = locale === 'ru' ? `Ответ "Меньше"` : `Відповідь "Менше"`

  switch (component) {
    case 'about':
      return { aboutYesMsg, aboutNoMsg, aboutOverMsg, aboutUnderMsg }

    case 'header':
      return { tab0msg, tab1msg, tab2msg, tab3msg, tab4msg, tab5msg, tab6msg }

    case 'editor': {
      return { weekNameMsg, weekQuestionMsg, weekTotalMsg, weekActivityMsg }
    }

    case 'standings':
      return { tableNameMsg, tableAllMsg, tableCorrectMsg }

    case 'otheruser':
      return { otherUser1msg, otherUser2msg, otherUser3msg }

    case 'week':
      return { playerMsg, adminMsg, successMsg, failureMsg }

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
        dashboardEnterMsg,
        dashboardAdminMsg,
        profileHeaderMsg,
        profileNameMsg,
        profileLangMsg,
        loginMsg,
        loginIntro,
        registerMsg,
        registerIntro,
        forgotMsg,
        registerNameMsg
      }

    case 'buttons':
      return {
        buttonChangesMsg,
        buttonCancelMsg,
        buttonSaveMsg,
        buttonLogoutMsg,
        buttonProfileMsg,
        buttonDetailsMsg,
        buttonDeleteWeekMsg,
        buttonRegisterMsg,
        buttonRegisterGoogleMsg,
        buttonLoginMsg,
        buttonLoginGoogleMsg,
        buttonRecoverMsg
      }

    default:
      return
  }
}
