import React, {Component} from 'react';
import Week from '../Components/Week/Week';
import classes from './Pages.module.scss';
import { actionWeekId } from '../redux/actions';
import { connect } from 'react-redux';

class CurrentWeek extends Component {

  componentDidMount() {
    this.props.setId(this.props.currentweek);
  }

  render () {
    return (
      <div className={classes.Container}>
        <h3>Текущая неделя</h3>
        <Week weekToRender={this.props.currentweek}/>
      </div>
    );
  }
};

function mapStateToProps(state) {  
  return {
    currentweek: state.currentweek,
    weekid: state.weekid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setId: (id) => dispatch(actionWeekId(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeek);
