import React, { Component } from 'react'
import classes from './About.module.scss'
import Button from '../../UI/Button/Button'
import { connect } from 'react-redux'
import { FaCheck, FaBan, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { actionSetHeight } from '../../redux/actions/viewActions'

class About extends Component {
  state = {
    show: false
  }

  toggleHandler = async () => {
    await this.setState({
      show: !this.state.show
    })

    if (!this.props.mobile) {
      const height = Math.max(
        document.getElementById('container').offsetHeight + 40,
        window.innerHeight
      )
      this.props.setHeight(height)
    }
  }

  textHandler() {
    const jsx = (
      <div>
        <div className={!this.props.mobile ? classes.Paragraph : classes.ParagraphMobile}>
          Каждую неделю до конца сезона мы будем представлять вашему вниманию прогнозы по "тоталам"
          на игры Пэкерз. Вам нужно будет угадать, произойдет ли то или иное событие. Суть проста.
          Угадать "тотал" или результат "с форой". Или случится ли событие в принципе.
        </div>
        <div className={!this.props.mobile ? classes.Paragraph : classes.ParagraphMobile}>
          Например, указана линия "Аарон Роджерс, пасовые ярды: 299.5". Вы выбираете прогноз{' '}
          <FaArrowDown
            style={{ fontSize: this.props.mobile ? '15px' : '11px', color: 'darkred' }}
          />{' '}
          "Меньше". Если по итогам игры тотал пасовых ярдов Аарона составит менее 299 - вы угадали.
          Если более 300 - ошиблись.
        </div>
        <div className={!this.props.mobile ? classes.Paragraph : classes.ParagraphMobile}>
          Или "Защита Пэкерз, тотал сэков 1.5". Вы отвечаете{' '}
          <FaArrowUp
            style={{ fontSize: this.props.mobile ? '17px' : '11px', color: 'darkgreen' }}
          />{' '}
          "Больше". Если наши игроки сделают 2 или более сэков - значит, ваш прогноз верен. И
          наоборот.
        </div>
        <div className={!this.props.mobile ? classes.Paragraph : classes.ParagraphMobile}>
          Победа Пэкерз с форой (-2.5) - если команда побеждает в филд-гол или крупнее - сыграет
          результат{' '}
          <FaCheck style={{ fontSize: this.props.mobile ? '17px' : '11px', color: 'darkgreen' }} />{' '}
          "Да", если разрыв окажется меньше или игра завершится не в нашу пользу - результат{' '}
          <FaBan style={{ fontSize: this.props.mobile ? '17px' : '11px', color: 'darkred' }} />{' '}
          "Нет".
        </div>
        <div className={!this.props.mobile ? classes.Paragraph : classes.ParagraphMobile}>
          Тачдаун Кристиана Уотсона. Тут все проще простого.{' '}
          <FaCheck style={{ fontSize: this.props.mobile ? '17px' : '11px', color: 'darkgreen' }} />{' '}
          "Да", или{' '}
          <FaBan style={{ fontSize: this.props.mobile ? '17px' : '11px', color: 'darkred' }} />{' '}
          "Нет".
        </div>
        <div className={!this.props.mobile ? classes.Paragraph : classes.ParagraphMobile}>
          Обычно в таких конкурсах побеждает тот, кто дал наибольшее число точных ответов. У нас
          будет немного не так.
        </div>
        <div className={!this.props.mobile ? classes.Paragraph : classes.ParagraphMobile}>
          Ваша задача - набрать максимальный процент точных ответов. И ответить как минимум на 90%
          вопросов. Сколько всего будет вопросов - мы пока не знаем, так как не знаем, как долго
          продлится сезон нашей команды.
        </div>
        <div className={!this.props.mobile ? classes.Paragraph : classes.ParagraphMobile}>
          Почему именно так? Почему не общее число точных ответов? Неприятная особенность подобных
          конкурсов заключается в том, что пропуск одной недели (по забывчивости ли, иной причине)
          лишает вас шансов на победу. Гонка за общим числом не прощает прогулов.
        </div>
        <div className={!this.props.mobile ? classes.Paragraph : classes.ParagraphMobile}>
          В нашем же случае у вас появляется право на ошибку. Иной раз можете даже пропустить
          неудобный вопрос, ответа на который не знаете. Оставленный без ответа вопрос не
          учитывается в таблице.
        </div>
      </div>
    )

    return this.state.show ? jsx : null
  }

  render() {
    return (
      <div className={!this.props.mobile ? classes.About : classes.AboutMobile}>
        <div className={!this.props.mobile ? classes.Paragraph : classes.ParagraphMobile}>
          Каждую неделю до конца сезона мы будем представлять вашему вниманию прогнозы по "тоталам"
          на игры Пэкерз. Вам нужно будет угадать, произойдет ли то или иное событие.
        </div>
        <div className={!this.props.mobile ? classes.Paragraph : classes.ParagraphMobile}>
          Обратная связь - <a href="https://t.me/ittrainbow">@ittrainbow</a>
        </div>
        <div className={!this.props.mobile ? classes.Paragraph : classes.ParagraphMobile}>
          <Button text="Об игре" onClick={() => this.toggleHandler()} />
        </div>
        {this.textHandler()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    mobile: state.view.mobile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setHeight: (height) => dispatch(actionSetHeight(height))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
