import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Loader } from '../../UI'
import './Userpage.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// import { connect } from 'react-redux/es/exports'
// import { actionLogout, actionSetUserName } from '../../redux/actions/authActions'
// import { actionCleanOtherUser, actionSwitchYourself } from '../../redux/actions/othersActions'
// import axios from '../../axios/axios'

const Userpage = () => {
  // const dispatch = useDispatch()

  const { userName } = useSelector((state) => state.auth)
  const { mobile } = useSelector((state) => state.view)
  // const { isItYou } = useSelector((state) => state.others)

  // const [showPassword, setShowPassword] = useState(false)
  // const [showEmail, setShowEmail] = useState(false)
  // const [showNameForm, setShowNameForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [loading] = useState(false)

  useEffect(() => {
    setNewName(userName)

    return
    // eslint-disable-next-line
  }, [])

  // passwordHandler() {
  //   const password = localStorage.getItem('password')
  //   const stars = '*'.repeat(password.length)

  //   return this.state.showPassword ? password : stars
  // }

  // emailHandler() {
  //   const email = localStorage.getItem('email')
  //   const stars = '*'.repeat(email.length)

  //   return this.state.showEmail ? email : stars
  // }

  // passwordToggleHandler() {
  //   this.setState({
  //     showPassword: !this.state.showPassword
  //   })
  // }

  // emailToggleHandler() {
  //   this.setState({
  //     showEmail: !this.state.showEmail
  //   })
  // }

  // logoutHandler() {
  //   this.props.logout()
  //   this.props.cleanOtherUser()
  // }

  // changeNameHandler() {
  //   return <Input value={this.state.newName} onChange={(event) => this.onChangeHandler(event)} />
  // }

  // async saveNameHandler() {
  //   this.setState({ loading: true })
  //   this.props.setUserName(this.state.newName)
  //   await axios.put(`/pack/users/${this.props.localId}.json`, { name: this.state.newName })
  //   this.setState({ loading: false, showNameForm: false })
  // }

  // toggleFormHandler() {
  //   this.setState({
  //     showNameForm: !this.state.showNameForm
  //   })
  // }

  // onChangeHandler(event) {
  //   this.setState({
  //     newName: event.target.value,
  //     canWriteName: event.target.value === this.props.userName
  //   })
  // }

  // const temp = () => {
  //   return (
  //     <div>
  //       <div className="UserName">
  //         {showNameForm ? this.changeNameHandler() : `Имя: ${this.props.userName}`}
  //       </div>
  //       <div className="UserDiv">
  //         Email:{' '}
  //         <i
  //           className="fa fa-eye"
  //           onClick={() => this.emailToggleHandler()}
  //           style={{ cursor: 'pointer' }}
  //         />{' '}
  //         {this.emailHandler()}
  //       </div>
  //       <div className="UserDiv">
  //         Пароль:{' '}
  //         <i
  //           className="fa fa-eye"
  //           onClick={() => this.passwordToggleHandler()}
  //           style={{ cursor: 'pointer' }}
  //         />{' '}
  //         {this.passwordHandler()}
  //       </div>
  //       <div className="UserDiv">{this.props.isAdmin ? 'Вы - администратор' : null}</div>
  //       <div>
  //         <Button text="Выйти" onClick={this.logoutHandler.bind(this)} />
  //       </div>
  //       {!this.state.showNameForm ? (
  //         <Button text="Изменить имя" onClick={() => this.toggleFormHandler()} />
  //       ) : (
  //         <div>
  //           <Button
  //             text="Сохранить имя"
  //             onClick={() => this.saveNameHandler()}
  //             disabled={this.state.newName === this.props.userName}
  //           />
  //           <Button text="Отменить" onClick={() => this.toggleFormHandler()} />
  //         </div>
  //       )}
  //     </div>
  //   )
  // }

  return (
    <div className={mobile ? 'UserpageMobile' : 'Userpage'}>
      {loading ? <Loader /> : newName}
    </div>
  )
}

// function mapStateToProps(state) {
//   return {
//     userName: state.auth.userName,
//     localId: state.auth.localId,
//     isItYou: state.others.isItYou,
//     isAdmin: state.auth.isAdmin,
//     mobile: state.view.mobile
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     logout: () => dispatch(actionLogout()),
//     switchYourself: (status) => dispatch(actionSwitchYourself(status)),
//     cleanOtherUser: () => dispatch(actionCleanOtherUser()),
//     setUserName: (name) => dispatch(actionSetUserName(name))
//   }
// }

export default Userpage
