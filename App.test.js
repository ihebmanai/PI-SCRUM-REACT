import React from 'react';
import {shallow} from 'enzyme/build';
import Provider from 'react-redux';
import App from './App';


it('mounts without crashing', () => {
  const wrapper = shallow(<App />);
  wrapper.unmount()
});
