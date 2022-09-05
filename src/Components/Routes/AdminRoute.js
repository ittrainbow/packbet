import { connect } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'

const AdminRoute = (props) => {
  return props.isAdmin && props.isLoggedIn ? <Outlet /> : <Navigate to="/" />
}

function mapStateToProps(state) {
  return {
    isAdmin: state.auth.isAdmin,
    isLoggedIn: !!state.auth.token
  }
}

export default connect(mapStateToProps, null)(AdminRoute)
