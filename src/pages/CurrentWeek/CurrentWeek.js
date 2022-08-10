import React, {Component} from 'react';
import Week from '../../Components/Week/Week';
import { SET_WEEK_ID } from '../../redux/types';
import { connect } from 'react-redux';

class CurrentWeek extends Component {

  componentDidMount() {
    this.props.setId(this.props.currentweek);
  }

  render () {
    return (
      <div style={{marginTop: '20px', marginLeft: '20px'}}>
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
    setId: (id) => {
      const action = { type: SET_WEEK_ID, payload: id};
      dispatch(action);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeek);
