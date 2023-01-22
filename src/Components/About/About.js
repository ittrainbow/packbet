import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import classes from './About.module.scss'
import { Button } from '../../UI'
import { FaCheck, FaBan, FaArrowUp, FaArrowDown } from 'react-icons/fa'

export const About = () => {
  const [open, setOpen] = useState(false)
  const { mobile } = useSelector((state) => state.view)

  const textHandler = () => {
    const jsx = (
      <div>
        <div className={mobile ? classes.ParagraphMobile : classes.Paragraph}>
          Каждую неделю до конца сезона мы будем представлять вашему вниманию прогнозы по "тоталам"
          на игры Пэкерз. Вам нужно будет угадать, произойдет ли то или иное событие. Суть проста.
          Угадать "тотал" или результат "с форой". Или случится ли событие в принципе.
        </div>
        <div className={mobile ? classes.ParagraphMobile : classes.Paragraph}>
          Например, указана линия "Аарон Роджерс, пасовые ярды: 299.5". Вы выбираете прогноз{' '}
          <FaArrowDown className={classes.FaArrowDown} /> "Меньше". Если по итогам игры тотал
          пасовых ярдов Аарона составит менее 299 - вы угадали. Если более 300 - ошиблись.
        </div>
        <div className={mobile ? classes.ParagraphMobile : classes.Paragraph}>
          Или "Защита Пэкерз, тотал сэков 1.5". Вы отвечаете{' '}
          <FaArrowUp className={classes.FaArrowUp} /> "Больше". Если наши игроки сделают 2 или более
          сэков - значит, ваш прогноз верен. И наоборот.
        </div>
        <div className={mobile ? classes.ParagraphMobile : classes.Paragraph}>
          Победа Пэкерз с форой (-2.5) - если команда побеждает в филд-гол или крупнее - сыграет
          результат <FaCheck className={classes.FaCheck} /> "Да", если разрыв окажется меньше или
          игра завершится не в нашу пользу - результат <FaBan className={classes.FaBan} /> "Нет".
        </div>
        <div className={mobile ? classes.ParagraphMobile : classes.Paragraph}>
          Тачдаун Кристиана Уотсона. Тут все проще простого. <FaCheck className={classes.FaCheck} />{' '}
          "Да", или <FaBan className={classes.FaBan} /> "Нет".
        </div>
        <div className={mobile ? classes.ParagraphMobile : classes.Paragraph}>
          Под "лидером сезона" подразумевается а) лидер текущего сезона б) среди игроков Пэкерз и в)
          по итогам игры, о которой идет речь.
        </div>
        <div className={mobile ? classes.ParagraphMobile : classes.Paragraph}>
          Обычно в таких конкурсах побеждает тот, кто дал наибольшее число точных ответов. У нас
          будет немного не так.
        </div>
        <div className={mobile ? classes.ParagraphMobile : classes.Paragraph}>
          Ваша задача - набрать максимальный процент точных ответов. И ответить как минимум на 90%
          вопросов. Сколько всего будет вопросов - мы пока не знаем, так как не знаем, как долго
          продлится сезон нашей команды.
        </div>
        <div className={mobile ? classes.ParagraphMobile : classes.Paragraph}>
          Почему именно так? Почему не общее число точных ответов? Неприятная особенность подобных
          конкурсов заключается в том, что пропуск одной недели (по забывчивости ли, иной причине)
          лишает вас шансов на победу. Гонка за общим числом не прощает прогулов.
        </div>
        <div className={mobile ? classes.ParagraphMobile : classes.Paragraph}>
          В нашем же случае у вас появляется право на ошибку. Иной раз можете даже пропустить
          неудобный вопрос, ответа на который не знаете. Оставленный без ответа вопрос не
          учитывается в таблице.
        </div>
      </div>
    )

    return open ? jsx : null
  }

  return (
    <div className={mobile ? classes.AboutMobile : classes.About}>
      <div className={mobile ? classes.ParagraphMobile : classes.Paragraph}>
        Каждую неделю до конца сезона мы будем представлять вашему вниманию прогнозы по "тоталам" на
        игры Пэкерз. Вам нужно будет угадать, произойдет ли то или иное событие.
      </div>
      <div className={mobile ? classes.ParagraphMobile : classes.Paragraph}>
        Обратная связь - <a href="https://t.me/ittrainbow">@ittrainbow</a>
      </div>
      <div className={!mobile ? classes.Paragraph : classes.ParagraphMobile}>
        <Button text="Об игре" onClick={() => setOpen(!open)} />
      </div>
      {textHandler()}
    </div>
  )
}
