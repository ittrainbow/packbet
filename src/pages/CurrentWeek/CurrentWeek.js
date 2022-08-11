import React, {Component} from 'react';
import Week from '../../Components/Week/Week';
import { actionWeekId } from '../../redux/actions';
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
    setId: (id) => dispatch(actionWeekId(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeek);
