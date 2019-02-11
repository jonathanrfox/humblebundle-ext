import MDSpinner from 'react-md-spinner';
import {
    onMessage,
    removeMessageListener,
    sendMessage
} from '../../browser';
import { Types } from '../../types';
import App from './App';
import Form from './Form';
import Error from './Error';


jest.mock('../../browser');

beforeEach(() => {
    jest.clearAllMocks();
});

test('Initial App', () => {
    const wrapper = shallow(<App />, {
        disableLifecycleMethods: true
    });
    expect(wrapper.find(MDSpinner).length).toBe(1);
});

function componentRendersForType(Component, type) {
    const wrapper = shallow(<App />, {
        disableLifecycleMethods: true
    });
    wrapper.instance()._handleIncomingData({ type });
    wrapper.update();
    return wrapper.find(Component).length >= 1;
}

test('App renders Form when FETCH_RESPONSE', () => {
    const actual = componentRendersForType(Form, Types.FETCH_RESPONSE);
    expect(actual).toBeTruthy();
});

test('App renders Form when STORAGE_CHANGE', () => {
    const actual = componentRendersForType(Form, Types.STORAGE_CHANGE);
    expect(actual).toBeTruthy();
});

test('App renders Error when FETCH_ERROR', () => {
    const actual = componentRendersForType(Error, Types.FETCH_ERROR);
    expect(actual).toBeTruthy();
});

test('App renders Loader when BACKGROUND_ACK', () => {
    const actual = componentRendersForType(MDSpinner, Types.BACKGROUND_ACK);
    expect(actual).toBeTruthy();
});
