export const i18n = (locale: string, component: string): { [key: string]: string } | undefined => {
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

  const playerMsg = locale === 'ru' ? 'Режим игрока' : 'Режим гравця'
  const adminMsg = locale === 'ru' ? 'Режим админа' : 'Режим адмiна'
  const successMsg = locale === 'ru' ? 'Успешно сохранено' : 'Успішно збережено'
  const failureMsg = locale === 'ru' ? 'Не удалось сохранить' : 'Не вдалося зберегти'

  const tableNameMsg = locale === 'ru' ? 'Игрок' : `Гравець`
  const tableAllMsg = locale === 'ru' ? 'Всего' : 'Всього'
  const tableCorrectMsg = locale === 'ru' ? 'Верно' : 'Вiрно'
  const tableTierline =
    locale === 'ru'
      ? 'В таблице отображены только игроки, давшие ответ хотя бы на один вопрос.'
      : 'У таблиці відображені лише гравці, які дали відповідь хоча б на одне питання.'
  const findBtn = locale === 'ru' ? 'Найти' : 'Знайти'
  const findMeBtn = locale === 'ru' ? 'Ко мне' : 'До мене'
  const clearBtn = locale === 'ru' ? 'Очистить' : 'Очистити'

  const weekNameMsg = locale === 'ru' ? 'Название недели' : 'Назва тижня'
  const weekQuestionMsg = locale === 'ru' ? 'Вопрос' : 'Запитання'
  const weekTotalMsg = locale === 'ru' ? 'Тотал' : 'Тотал'
  const weekActivityMsg = locale === 'ru' ? 'Активность' : 'Активність'

  const otherUser1msg =
    locale === 'ru' ? 'Нажмите, чтобы вернуться к своему профилю.' : 'Натисніть, щоб повернутися до свого профілю.'
  const otherUser2msg = locale === 'ru' ? 'Сейчас вы просматриваете профиль ' : 'Зараз ви переглядаєте профіль '
  const otherUser3msg =
    locale === 'ru' ? ', прогнозы не начавшихся игр скрыты.' : ', прогнози ігор, що не почалися, приховані.'

  const devMsg = locale === 'ru' ? 'Разработка:' : 'Розробка:'

  const aboutYesMsg = locale === 'ru' ? `Ответ "Да"` : `Відповідь "Так"`
  const aboutNoMsg = locale === 'ru' ? `Ответ "Нет"` : `Відповідь "Ні"`
  const aboutOverMsg = locale === 'ru' ? `Ответ "Больше"` : `Відповідь "Більше"`
  const aboutUnderMsg = locale === 'ru' ? `Ответ "Меньше"` : `Відповідь "Менше"`

  switch (component) {
    case 'about':
      return { aboutYesMsg, aboutNoMsg, aboutOverMsg, aboutUnderMsg, devMsg }

    case 'header':
      return { tab0msg, tab1msg, tab2msg, tab3msg, tab4msg, tab5msg, tab6msg }

    case 'editor': {
      return { weekNameMsg, weekQuestionMsg, weekTotalMsg, weekActivityMsg }
    }

    case 'standings':
      return { tableNameMsg, tableAllMsg, tableCorrectMsg, tableTierline, findMeBtn, clearBtn, findBtn }

    case 'otheruser':
      return { otherUser1msg, otherUser2msg, otherUser3msg }

    case 'week':
      return { playerMsg, adminMsg, successMsg, failureMsg }

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
        emailExistsMsg
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
