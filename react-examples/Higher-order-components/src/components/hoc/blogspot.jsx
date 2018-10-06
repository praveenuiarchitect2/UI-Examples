import React from 'react';
import HocDisplay from './hocomponent';

const DisplayTheSecret = props => (
  <div>
    The secret to life is {props.secretToLife}.
  </div>
);

const WrappedComponent = HocDisplay(DisplayTheSecret);

export default WrappedComponent;