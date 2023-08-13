export type LocaleType = { [key: string]: string }

export const i18n = (locale: string, component: string): LocaleType | undefined => {
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
  const profileNameMsg = locale === 'ru' ? 'Введите username' : `Введіть username`
  const profileLangMsg = locale === 'ru' ? 'Выберите язык интерфейса' : 'Виберіть мову інтерфейсу'
  const loginIntro = locale === 'ru' ? 'Зарегистрированы?' : 'Зареєстровані?'
  const loginMsg = locale === 'ru' ? 'Войти' : 'Увiйти'
  const regIntro = locale === 'ru' ? 'Нет профиля?' : 'Немає профілю?'
  const regMsg = locale === 'ru' ? 'Регистрация' : 'Реєстрація'
  const forgotMsg = locale === 'ru' ? 'Забыли пароль?' : 'Забули пароль?'
  const regNameMsg = locale === 'ru' ? 'Username' : `Username`
  const regNameAlert = locale === 'ru' ? 'Введите username' : `Введiть username`
  const regEmailAlert = locale === 'ru' ? 'Введите валидный e-mail' : 'Введiть валiдний e-mail'
  const regPasswordAlert =
    locale === 'ru' ? 'Введите пароль не менее шести символов' : 'Введіть пароль щонайменше шести символів'
  const emailMsg = locale === 'ru' ? 'E-mail' : 'E-mail'
  const passwordMsg = locale === 'ru' ? 'Пароль' : 'Пароль'
  const emailExistsMsg = locale === 'ru' ? 'E-mail уже используется' : 'E-mail вже використовується'
  const emailWrongMsg = locale === 'ru' ? 'Проверьте e-mail' : 'Перевірте e-mail'
  const passwordWrongMsg =
    locale === 'ru' ? 'Проверьте правильность ввода пароля' : 'Перевірте правильність введення пароля'

  const buttonChangesMsg = locale === 'ru' ? 'Изменений нет' : 'Немає змiн'
  const buttonCancelMsg = locale === 'ru' ? 'Отменить' : 'Скасувати'
  const buttonSaveMsg = locale === 'ru' ? 'Сохранить' : 'Зберегти'
  const buttonLogoutMsg = locale === 'ru' ? 'Выйти' : 'Вийти'
  const buttonProfileMsg = locale === 'ru' ? 'Настроить профиль' : 'Налаштувати профіль'
  const buttonDetailsMsg = locale === 'ru' ? 'Подробнее' : 'Докладніше'
  const buttonDeleteWeekMsg = locale === 'ru' ? 'Удалить' : 'Видалити'
  const buttonRegisterMsg = locale === 'ru' ? 'Регистрация' : 'Реєстрація'
  const buttonRegisterGoogleMsg = locale === 'ru' ? 'Регистрация Google' : 'Реєстрація Google'
  const buttonLoginMsg = locale === 'ru' ? 'Войти' : 'Увiйти'
  const buttonLoginGoogleMsg = locale === 'ru' ? 'Войти через Google' : 'Увiйти через Google'
  const buttonRecoverMsg = locale === 'ru' ? 'Выслать e-mail' : 'Надіслати e-mail'
  const buttonDeleteYesMsg = locale === 'ru' ? 'Да' : 'Так'
  const buttonDeleteNoMsg = locale === 'ru' ? 'Нет' : 'Нi'

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

  const tableNameMsg = locale === 'ru' ? 'Игрок' : `Гравець`
  const tableAllMsg = locale === 'ru' ? 'Всего' : 'Всього'
  const tableCorrectMsg = locale === 'ru' ? 'Верно' : 'Вiрно'
  const tableBuddiesMsg = locale === 'ru' ? 'Избранное' : 'Вибранi'
  const tableAllUsersMsg = locale === 'ru' ? 'Все игроки' : 'Всi гравцi'
  const tableOnlyWeekMsg = locale === 'ru' ? 'За неделю' : 'За тиждень'
  const tableAllSeasonMsg = locale === 'ru' ? 'За сезон' : 'За сезон'
  const tableLimitMsg = locale === 'ru' ? 'Лимит' : 'Ліміт'
  const tablePSOne =
    locale === 'ru'
      ? 'Таблица будет обновлена после внесения результатов очередной недели. Ранжирование по 90% ответов будет применено ближе к завершению сезона.'
      : 'Таблиця буде оновлена після внесення результатів чергового тижня. Ранжування по 90% відповідей буде застосовано ближче до завершення сезону.'
  const tablePSTwo =
    locale === 'ru' ? 'Выберите игрока, чтобы увидеть его ответы.' : 'Виберіть гравця, щоб побачити його відповіді.'
  const tableClearBtn = locale === 'ru' ? 'Очистить' : 'Очистити'
  const tableSearchMsg = locale === 'ru' ? 'Найти игрока' : 'Знайти гравця'
  const tableHeaderhMsg = locale === 'ru' ? 'По итогам игры ' : 'За пiдсумками гри '
  const tableNoGamesMsg = locale === 'ru' ? 'Таблица' : 'Таблиця'

  const weekNameMsg = locale === 'ru' ? 'Название недели' : 'Назва тижня'
  const weekQuestionMsg = locale === 'ru' ? 'Вопрос' : 'Запитання'
  const weekTotalMsg = locale === 'ru' ? 'Тотал' : 'Тотал'
  const weekActivityMsg = locale === 'ru' ? 'Активность' : 'Активність'
  const weekDeleteMsg = locale === 'ru' ? 'Удалить неделю?' : 'Вдалити тиждень?'

  const otherUser1msg =
    locale === 'ru' ? 'Нажмите, чтобы вернуться к своему профилю.' : 'Натисніть, щоб повернутися до свого профілю.'
  const otherUser2msg = locale === 'ru' ? 'Сейчас вы просматриваете профиль ' : 'Зараз ви переглядаєте профіль '
  const otherUser3msg =
    locale === 'ru' ? ', прогнозы не начавшихся игр скрыты.' : ', прогнози ігор, що не почалися, приховані.'

  const aboutYesMsg = locale === 'ru' ? `- ответ "Да"` : `- відповідь "Так"`
  const aboutNoMsg = locale === 'ru' ? `- ответ "Нет"` : `- відповідь "Ні"`
  const aboutOverMsg = locale === 'ru' ? `- ответ "Больше"` : `- відповідь "Більше"`
  const aboutUnderMsg = locale === 'ru' ? `- ответ "Меньше"` : `- відповідь "Менше"`
  const aboutLegendMsg = locale === 'ru' ? 'Принятые обозначения' : 'Прийняті визначення:'
  const aboutLegendExplain =
    locale === 'ru'
      ? 'Под "лидером сезона" подразумевается а) лидер текущего сезона б) среди игроков Пэкерз и в) по итогам игры, о которой идет речь.'
      : 'Під "лідером сезону" маємо на увазі: а) лідер поточного сезону б) серед гравців Пекерз та в) за підсумками гри, про яку йдеться.'

  switch (component) {
    case 'about':
      return { aboutYesMsg, aboutNoMsg, aboutOverMsg, aboutUnderMsg, aboutLegendMsg, aboutLegendExplain }

    case 'header':
      return { tab0msg, tab1msg, tab2msg, tab3msg, tab4msg, tab5msg, tab6msg }

    case 'editor': {
      return { weekNameMsg, weekQuestionMsg, weekTotalMsg, weekActivityMsg, weekDeleteMsg }
    }

    case 'otheruser':
      return { otherUser1msg, otherUser2msg, otherUser3msg }

    case 'week':
      return { playerMsg, adminMsg, successMsg, failureMsg }

    case 'standings':
      return {
        tableNameMsg,
        tableAllMsg,
        tableCorrectMsg,
        tablePSOne,
        tablePSTwo,
        tableClearBtn,
        tableBuddiesMsg,
        tableAllUsersMsg,
        tableOnlyWeekMsg,
        tableAllSeasonMsg,
        tableHeaderhMsg,
        tableSearchMsg,
        tableNoGamesMsg,
        tableLimitMsg
      }

    case 'ticks':
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
        regMsg,
        regIntro,
        forgotMsg,
        regNameMsg,
        regNameAlert,
        regEmailAlert,
        regPasswordAlert,
        emailMsg,
        passwordMsg,
        emailExistsMsg,
        emailWrongMsg,
        passwordWrongMsg
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
        buttonRecoverMsg,
        buttonDeleteYesMsg,
        buttonDeleteNoMsg
      }

    default:
      return
  }
}
