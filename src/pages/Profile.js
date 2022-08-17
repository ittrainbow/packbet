import React from 'react';
import Auth from '../Components/Auth/Auth';
import classes from './Pages.module.scss';

const Profile = () => {
  return (
    <div className={classes.Container}>
      <h3>Авторизация</h3>
      <Auth />
    </div>
  );
};

export default Profile;