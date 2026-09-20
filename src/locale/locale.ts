export type Locale = { [key: string]: string }
export type LocaleCode = 'ru' | 'ua' | 'by'

const t = (locale: string, ru: string, ua: string, by: string) =>
  locale === 'ua' ? ua : locale === 'by' ? by : ru

export const i18n = (locale: string, component: string): Locale | undefined => {
  const tab0msg = t(locale, 'Инфо', 'Iнфо', 'Інфа')
  const tab1msg = t(locale, 'Профиль', 'Профiль', 'Профіль')
  const tab2msg = t(locale, 'Неделя', 'Тиждень', 'Тыдзень')
  const tab3msg = t(locale, 'Календарь', 'Календар', 'Каляндар')
  const tab4msg = t(locale, 'Таблица', 'Таблиця', 'Табліца')
  const tab5msg = t(locale, 'Редактор', 'Редактор', 'Рэдактар')
  const tab6msg = t(locale, 'Создать', 'Створити', 'Стварыць')

  const dashboardEnterMsg = t(locale, 'Профиль', 'Профiль', 'Профіль')
  const dashboardAdminMsg = t(locale, 'Вы - админ', 'Ви - адмiн', 'Вы — адмін')
  const profileHeaderMsg = t(locale, 'Настройка профиля', 'Налаштування профiлю', 'Налады профілю')
  const profileNameMsg = t(locale, 'Введите username', 'Введіть username', 'Увядзіце username')
  const profileLangMsg = t(locale, 'Язык', 'Мова', 'Мова')
  const loginIntro = t(locale, 'Зарегистрированы?', 'Зареєстровані?', 'Зарэгістраваны?')
  const loginMsg = t(locale, 'Войти', 'Увiйти', 'Увайсці')
  const regIntro = t(locale, 'Нет профиля?', 'Немає профілю?', 'Няма профілю?')
  const regMsg = t(locale, 'Регистрация', 'Реєстрація', 'Рэгістрацыя')
  const forgotMsg = t(locale, 'Забыли пароль?', 'Забули пароль?', 'Забылі пароль?')
  const regNameMsg = t(locale, 'Username', 'Username', 'Username')
  const regNameAlert = t(locale, 'Введите username', 'Введiть username', 'Увядзіце username')
  const regEmailAlert = t(locale, 'Введите валидный e-mail', 'Введiть валiдний e-mail', 'Увядзіце сапраўдны e-mail')
  const regPasswordAlert = t(
    locale,
    'Введите пароль не менее шести символов',
    'Введіть пароль щонайменше шести символів',
    'Увядзіце пароль не менш за шэсць сімвалаў'
  )
  const emailMsg = t(locale, 'E-mail', 'E-mail', 'E-mail')
  const passwordMsg = t(locale, 'Пароль', 'Пароль', 'Пароль')
  const packContestLead = t(locale, 'Прогнозы на игры Пэкерз', 'Прогнози на ігри Пекерз', 'Прагнозы на гульні Пэкерз')
  const emailExistsMsg = t(locale, 'E-mail уже используется', 'E-mail вже використовується', 'E-mail ужо выкарыстоўваецца')
  const emailWrongMsg = t(locale, 'Проверьте e-mail', 'Перевірте e-mail', 'Праверце e-mail')
  const passwordWrongMsg = t(
    locale,
    'Проверьте правильность ввода пароля',
    'Перевірте правильність введення пароля',
    'Праверце правільнасць пароля'
  )

  const buttonChangesMsg = t(locale, 'Изменений нет', 'Немає змiн', 'Зменаў няма')
  const buttonCancelMsg = t(locale, 'Отменить', 'Скасувати', 'Скасаваць')
  const buttonSaveMsg = t(locale, 'Сохранить', 'Зберегти', 'Захаваць')
  const buttonLogoutMsg = t(locale, 'Выйти', 'Вийти', 'Выйсці')
  const buttonProfileMsg = t(locale, 'Настроить профиль', 'Налаштувати профіль', 'Наладзіць профіль')
  const buttonDetailsMsg = t(locale, 'Подробнее', 'Докладніше', 'Падрабязней')
  const buttonCollapseMsg = t(locale, 'Свернуть', 'Згорнути', 'Згарнуць')
  const buttonDeleteWeekMsg = t(locale, 'Удалить', 'Видалити', 'Выдаліць')
  const buttonRegisterMsg = t(locale, 'Регистрация', 'Реєстрація', 'Рэгістрацыя')
  const buttonRegisterGoogleMsg = t(locale, 'Регистрация Google', 'Реєстрація Google', 'Рэгістрацыя Google')
  const buttonLoginMsg = t(locale, 'Войти', 'Увiйти', 'Увайсці')
  const buttonLoginGoogleMsg = t(locale, 'Войти через Google', 'Увiйти через Google', 'Увайсці праз Google')
  const buttonRecoverMsg = t(locale, 'Выслать e-mail', 'Надіслати e-mail', 'Даслаць e-mail')
  const buttonDeleteYesMsg = t(locale, 'Да', 'Так', 'Так')
  const buttonDeleteNoMsg = t(locale, 'Нет', 'Нi', 'Не')

  const countdownMsg = t(locale, 'До начала игры', 'До початку гри', 'Да пачатку гульні')
  const gameStartedMsg = t(locale, 'Игра началась', 'Гра почалась', 'Гульня пачалася')
  const fiveDaysMsg = t(locale, 'дней', 'днiв', 'дзён')
  const twoDaysMsg = t(locale, 'дня', 'днi', 'дні')
  const oneDayMsg = t(locale, 'день', 'день', 'дзень')
  const fiveHoursMsg = t(locale, 'часов', 'годин', 'гадзін')
  const twoHoursMsg = t(locale, 'часа', 'години', 'гадзіны')
  const oneHourMsg = t(locale, 'час', 'година', 'гадзіна')
  const minutesMsg = t(locale, 'мин', 'хв', 'хв')
  const secondsMsg = t(locale, 'сек', 'сек', 'сек')
  const atTimeMsg = t(locale, 'в', 'о', 'у')

  const playerMsg = t(locale, 'Игрок', 'Гравець', 'Гулец')
  const adminMsg = t(locale, 'Админ', 'Адмiн', 'Адмін')
  const successMsg = t(locale, 'Успешно сохранено', 'Успішно збережено', 'Паспяхова захавана')
  const failureMsg = t(locale, 'Не удалось сохранить', 'Не вдалося зберегти', 'Не ўдалося захаваць')

  const tableNameMsg = t(locale, 'Игрок', 'Гравець', 'Гулец')
  const tableAllMsg = t(locale, 'Всего', 'Всього', 'Усяго')
  const tableCorrectMsg = t(locale, 'Верно', 'Вiрно', 'Верна')
  const tableBuddiesMsg = t(locale, 'Избранное', 'Вибранi', 'Абранае')
  const tableNoBuddiesMsg = t(
    locale,
    'Нет избранных игроков, измените отображение в настройках',
    'Немає обраних гравців, змініть відображення в налаштуваннях',
    'Няма абраных гульцоў, змяніце адлюстраванне ў наладах'
  )
  const tableAllUsersMsg = t(locale, 'Все игроки', 'Всi гравцi', 'Усе гульцы')
  const tableOnlyWeekMsg = t(locale, 'За неделю', 'За тиждень', 'За тыдзень')
  const tableAllSeasonMsg = t(locale, 'За сезон', 'За сезон', 'За сезон')
  const tableLimitMsg = t(locale, 'Лимит', 'Ліміт', 'Ліміт')
  const tableTierline = t(
    locale,
    'Таблица будет обновлена после внесения результатов очередной недели. Выберите игрока, чтобы увидеть его ответы.',
    'Таблиця буде оновлена після внесення результатів чергового тижня. Виберіть гравця, щоб побачити його відповіді.',
    'Табліца будзе абноўлена пасля ўнясення вынікаў чарговага тыдня. Выберыце гульца, каб убачыць яго адказы.'
  )
  const tableClearBtn = t(locale, 'Очистить', 'Очистити', 'Ачысціць')
  const tableSearchMsg = t(locale, 'Найти игрока', 'Знайти гравця', 'Знайсці гульца')
  const tableHeaderhMsg = t(locale, 'По итогам игры', 'За пiдсумками гри', 'Па выніках гульні')
  const tableNoGamesMsg = t(locale, 'Нет завершенных игр', 'Немає завершених ігор', 'Няма завершаных гульняў')
  const tableUpdate = t(locale, 'Обновить таблицу', 'Оновити таблицю', 'Абнавіць табліцу')
  const tableUpdateSuccessMsg = t(locale, 'Таблица обновлена', 'Таблиця оновлена', 'Табліца абноўлена')
  const tableUpdateFailureMsg = t(
    locale,
    'Не удалось обновить таблицу',
    'Не вдалося оновити таблицю',
    'Не ўдалося абнавіць табліцу'
  )
  const tableChooseSeason = t(locale, 'Выберите сезон', 'Виберіть сезон', 'Выберыце сезон')
  const tableSeason = t(locale, 'По итогам сезона', 'За пiдсумками сезону', 'Па выніках сезона')
  const tableOldStandings1 = t(
    locale,
    'В сезоне 2022 правила были иными, требовалось ответить как минимум на 90% вопросов',
    'У сезоні 2022 року правила були іншими, потрібно було відповісти як мінімум на 90% питань',
    'У сезоне 2022 правілы былі іншымі, трэба было адказаць як мінімум на 90% пытанняў'
  )
  const tableOldStandings2 = t(
    locale,
    'Игроки, ответившие на меньшее количество вопросов, выбывали из конкурса и отправлялись в нижнюю часть таблицы, там они отсортированы по количеству точных ответов без учета их количества',
    'Гравці, які відповіли на меншу кількість питань, вибували з конкурсу та вирушали до нижньої частини таблиці, там вони відсортовані за кількістю точних відповідей без урахування їх кількості',
    'Гульцы, якія адказалі на меншую колькасць пытанняў, выбывалі з конкурсу і траплялі ў ніжнюю частку табліцы, там яны адсартаваны па колькасці дакладных адказаў без уліку іх колькасці'
  )
  const tableOldStandings3 = t(
    locale,
    'Они не принимали участия в борьбе за победу',
    'Вони не бралі участі у боротьбі за перемогу',
    'Яны не бралі ўдзелу ў барацьбе за перамогу'
  )
  const tableOldStandings4 = t(
    locale,
    'Последняя графа таблицы показывает процент данных игроком ответов',
    'Остання графа таблиці показує відсоток даних гравцем відповідей',
    'Апошняя графа табліцы паказвае адсотак дадзеных гульцом адказаў'
  )
  const tableDetailsResults = t(locale, 'Результаты', 'Результати', 'Вынікі')
  const tableDetailsCorrect = t(locale, 'Верные ответы', 'Вірні відповіді', 'Верныя адказы')
  const tableDetailsAnswers = t(locale, 'Данные ответы', 'Дані відповіді', 'Дадзеныя адказы')
  const tableDetailsSkipped = t(locale, 'Пропущено ответов', 'Пропущені відповіді', 'Прапушчана адказаў')
  const tableDetailsLimit = t(locale, 'Лимит пропусков', 'Ліміт пропусків', 'Ліміт пропускаў')
  const tableDetailsAdjusted = t(
    locale,
    'Ответы с учетом лимита',
    'Відповіді з урахуванням ліміту',
    'Адказы з улікам ліміту'
  )
  const tableDetailsAnswersButton = t(locale, 'Подробнее', 'Докладніше', 'Падрабязней')
  const tableDetailsCollapse = t(locale, 'Свернуть', 'Згорнути', 'Згарнуць')

  const weekNameMsg = t(locale, 'Название недели', 'Назва тижня', 'Назва тыдня')
  const weekQuestionMsg = t(locale, 'Вопрос', 'Запитання', 'Пытанне')
  const weekTotalMsg = t(locale, 'Тотал', 'Тотал', 'Тотал')
  const weekActivityMsg = t(locale, 'Активна', 'Активна', 'Актыўна')
  const weekDeleteTitle = t(locale, 'Удалить неделю?', 'Видалити тиждень?', 'Выдаліць тыдзень?')
  const weekDeleteMsg = t(
    locale,
    'Текущая неделя будет удалена, вы хотите продолжить?',
    'Поточний тиждень буде видалено, чи ви хочете продовжити?',
    'Бягучы тыдзень будзе выдалены, хочаце працягнуць?'
  )
  const editorTitleMsg = t(locale, 'Редактор', 'Редактор', 'Рэдактар')
  const weekQuestionRuMsg = t(locale, 'Вопрос на русском', 'Запитання росiйською', 'Пытанне па-руску')
  const weekQuestionUaMsg = t(locale, 'Вопрос на украинском', 'Запитання українською', 'Пытанне па-ўкраінску')
  const weekQuestionByMsg = t(locale, 'Вопрос на белорусском', 'Запитання бiлоруською', 'Пытанне па-беларуску')

  const otherUser1msg = t(
    locale,
    'Нажмите, чтобы вернуться к своему профилю.',
    'Натисніть, щоб повернутися до свого профілю.',
    'Націсніце, каб вярнуцца да свайго профілю.'
  )
  const otherUser2msg = t(locale, 'Сейчас вы просматриваете профиль ', 'Зараз ви переглядаєте профіль ', 'Зараз вы праглядаеце профіль ')
  const otherUser3msg = t(
    locale,
    ', прогнозы не начавшихся игр скрыты.',
    ', прогнози ігор, що не почалися, приховані.',
    ', прагнозы гульняў, што не пачаліся, схаваныя.'
  )

  const weekListMsg = t(locale, 'Календарь', 'Календар', 'Каляндар')
  const weekListEditorMsg = t(
    locale,
    'Выберите неделю для редактирования',
    'Виберіть тиждень для редагування',
    'Выберыце тыдзень для рэдагавання'
  )
  const weekStatusStarted = t(locale, 'игра началась', 'гра почалась', 'гульня пачалася')
  const weekListEmptyMsg = t(locale, 'Сезон ещё не начался', 'Сезон ще не розпочався', 'Сезон яшчэ не пачаўся')

  const jan = t(locale, 'января', 'сiчня', 'студзеня')
  const feb = t(locale, 'февраля', 'лютого', 'лютага')
  const mar = t(locale, 'марта', 'березня', 'сакавіка')
  const apr = t(locale, 'апреля', 'квiтня', 'красавіка')
  const may = t(locale, 'мая', 'травня', 'мая')
  const jun = t(locale, 'июня', 'червня', 'чэрвеня')
  const jul = t(locale, 'июля', 'липня', 'ліпеня')
  const aug = t(locale, 'августа', 'серпня', 'жніўня')
  const sep = t(locale, 'сентября', 'вересня', 'верасня')
  const oct = t(locale, 'октября', 'жовтня', 'кастрычніка')
  const nov = t(locale, 'ноября', 'листопада', 'лістапада')
  const dec = t(locale, 'декабря', 'грудня', 'снежня')

  const aboutTitleMsg = t(locale, 'Информация', 'Інформація', 'Інфармацыя')
  const aboutYesMsg = t(locale, 'Да', 'Так', 'Так')
  const aboutNoMsg = t(locale, 'Нет', 'Ні', 'Не')
  const aboutOverMsg = t(locale, 'Больше', 'Більше', 'Больш')
  const aboutUnderMsg = t(locale, 'Меньше', 'Менше', 'Менш')
  const aboutLegendMsg = t(locale, 'Принятые обозначения', 'Прийняті позначення', 'Прынятыя абазначэнні')
  const aboutRulesMsg = t(locale, 'Правила', 'Правила', 'Правілы')
  const aboutTermsMsg = t(locale, 'Термины', 'Терміни', 'Тэрміны')
  const aboutColPlayer = t(locale, 'Игрок', 'Гравець', 'Гулец')
  const aboutColCorrect = t(locale, 'Верно', 'Вірно', 'Верна')
  const aboutColSkipped = t(locale, 'Пропуски', 'Пропуски', 'Пропускі')
  const aboutColAccuracy = t(locale, '%', '%', '%')

  switch (component) {
    case 'about':
      return {
        aboutTitleMsg,
        aboutYesMsg,
        aboutNoMsg,
        aboutOverMsg,
        aboutUnderMsg,
        aboutLegendMsg,
        aboutRulesMsg,
        aboutTermsMsg,
        aboutColPlayer,
        aboutColCorrect,
        aboutColSkipped,
        aboutColAccuracy
      }

    case 'weeklist':
      return { weekListMsg, weekListEditorMsg, weekStatusStarted, weekListEmptyMsg }

    case 'month':
      return { jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec }

    case 'header':
      return { tab0msg, tab1msg, tab2msg, tab3msg, tab4msg, tab5msg, tab6msg }

    case 'editor': {
      return {
        weekNameMsg,
        weekQuestionMsg,
        weekTotalMsg,
        weekActivityMsg,
        weekDeleteTitle,
        weekDeleteMsg,
        editorTitleMsg,
        weekQuestionRuMsg,
        weekQuestionUaMsg,
        weekQuestionByMsg
      }
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
        tableTierline,
        tableClearBtn,
        tableBuddiesMsg,
        tableNoBuddiesMsg,
        tableAllUsersMsg,
        tableOnlyWeekMsg,
        tableAllSeasonMsg,
        tableHeaderhMsg,
        tableSearchMsg,
        tableNoGamesMsg,
        tableLimitMsg,
        tableUpdate,
        tableUpdateSuccessMsg,
        tableUpdateFailureMsg,
        tableChooseSeason,
        tableOldStandings1,
        tableOldStandings2,
        tableOldStandings3,
        tableOldStandings4,
        tableSeason,
        tableDetailsResults,
        tableDetailsCorrect,
        tableDetailsAnswers,
        tableDetailsSkipped,
        tableDetailsLimit,
        tableDetailsAdjusted,
        tableDetailsAnswersButton,
        tableDetailsCollapse
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
        secondsMsg,
        atTimeMsg
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
        packContestLead,
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
        buttonCollapseMsg,
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
