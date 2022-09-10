import React from 'react'
import { connect } from 'react-redux/es/exports'
import { useNavigate } from 'react-router-dom'
import Auth from '../Components/Auth/Auth'
import Userpage from '../Components/Userpage/Userpage'
import classes from './Pages.module.scss'
import Button from '../UI/Button/Button'

const Profile = (props) => {
  const navigate = useNavigate()

  function renderPage() {
    if (props.isAuthenticated) return <Userpage />

    return <Auth />
  }

  function renderHeader() {
    if (props.isAuthenticated) return 'Профиль'
    if (props.authPage) return 'Войти'

    return 'Регистрация'
  }

  function redirect() {
    navigate('/recover')
  }

  return (
    <div className={props.mobile ? classes.ContainerMobile : classes.Container}>
      <h3>{renderHeader()}</h3>
      {renderPage()}
      {props.isAuthenticated ? null : <Button text="Забыли пароль?" onClick={() => redirect()} />}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.token,
    authPage: state.auth.authPage,
    mobile: state.view.mobile
  }
}

export default connect(mapStateToProps, null)(Profile)
