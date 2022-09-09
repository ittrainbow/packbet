import React, { Component } from 'react'
import classes from './About.module.scss'
import Button from '../../UI/Button/Button'

class About extends Component {
  state = {
    show: false
  }

  toggleHandler() {
    this.setState({
      show: !this.state.show
    })
  }

  textHandler() {
    const jsx = <div>        
      <div className={classes.Paragraph}>
        Например, указана линия "Аарон Роджерс, пасовые ярды: 299.5". Вы отвечаете "да". Если по
        итогам игры тотал пасовых ярдов Аарона составит 300 или более - вы угадали. Если 299 или
        менее - ошиблись. Или "Защита Пэкерз, перехваты: 0.5". Вы отвечаете "да". Если наши игроки
        сделают перехват (или несколько) - значит, ваша ставка прошла. И наоборот. Обычные ставки 
        "с форой".
      </div>
      <div className={classes.Paragraph}>
        Обычно в таких конкурсах побеждает тот, кто дал наибольшее число точных ответов. У нас
        будет немного не так.
      </div>
      <div className={classes.Paragraph}>
        Ваша задача - набрать максимальный процент точных ответов. И ответить как минимум на 90%
        вопросов. Сколько всего будет вопросов - мы пока не знаем, так как не знаем, как долго
        продлится сезон нашей команды.
      </div>
      <div className={classes.Paragraph}>
        Почему именно так? Почему не общее число точных ответов? Неприятная особенность подобных
        конкурсов заключается в том, что пропуск одной недели (по забывчивости ли, иной причине)
        лишает вас шансов на победу. Гонка за общим числом не прощает прогулов. В нашем же случае
        у вас появляется право на ошибку. Иной раз можете даже пропустить неудобный вопрос, ответа
        на который не знаете. Оставленный без ответа вопрос не учитывается в таблице.
      </div>
    </div>

    return this.state.show ? jsx : null
  }

  render() {
    return (
      <div className={classes.About}>
        <div className={classes.Paragraph}>
          Каждую неделю до конца сезона мы будем представлять вашему вниманию прогнозы по "тоталам"
          на игры Пэкерз. Вам нужно будет угадать, произойдет ли то или иное событие.
        </div>
        <div className={classes.Paragraph}>
          Обратная связь - <a href="https://t.me/ittrainbow">@ittrainbow</a>.
        </div>
        <div className={classes.Paragraph}>
          <Button text='Об игре' onClick={() => this.toggleHandler()}/>
        </div>
        {this.textHandler()}
      </div>
    )
  }
}

export default About
