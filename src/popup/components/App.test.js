import MDSpinner from 'react-md-spinner';

import {
    onMessage,
    removeMessageListener,
    sendMessage
} from '../../../browser';
import { Types } from '../../../common';

import App from '../App';
import Form from '../Form';
import ErrorView from '../ErrorView';


jest.mock('../../../browser');

afterEach(() => {
    jest.clearAllMocks();
});

test('Initial App', () => {
    const wrapper = shallow(<App />, {
        disableLifecycleMethods: true
    });
    expect(wrapper.find(MDSpinner).length).toBe(1);
});

function componentRenderedWhenType(Component, type) {
    const wrapper = shallow(<App />, {
        disableLifecycleMethods: true
    });
    wrapper.instance()._handleIncomingData({ type });
    wrapper.update();
    return wrapper.find(Component).length >= 1;
}

test('App renders Form when FETCH_RESPONSE', () => {
    const actual = componentRenderedWhenType(
        Form,
        Types.FETCH_RESPONSE
    );
    expect(actual).toBeTruthy();
});

test('App renders Form when STORAGE_CHANGE', () => {
    const actual = componentRenderedWhenType(
        Form,
        Types.STORAGE_CHANGE
    );
    expect(actual).toBeTruthy();
});

test('App renders ErrorView when FETCH_ERROR', () => {
    const actual = componentRenderedWhenType(
        ErrorView,
        Types.FETCH_ERROR
    );
    expect(actual).toBeTruthy();
});

test('App renders Loader when BACKGROUND_ACK', () => {
    const actual = componentRenderedWhenType(
        MDSpinner,
        Types.BACKGROUND_ACK
    );
    expect(actual).toBeTruthy();
});
