// @flow
import React, {Component} from 'react';  // eslint-disable-line
import {connect} from 'react-redux';

import {MemberComponent} from '../Components';

class MemberContainer extends Component {
  render() {
    const {member} = this.props.navigation.state.params;

    return <MemberComponent member={member} />;
  }
}
export default connect()(MemberContainer);
