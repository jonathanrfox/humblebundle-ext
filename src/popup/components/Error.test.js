import { sendMessage } from '../../browser';
import { Button } from './styled/buttons';
import { Types } from '../../types';
import Error from './Error';


jest.mock('../../browser');

afterEach(() => {
    jest.clearAllMocks();
});

test('onClick calls sendMessage', () => {
    const wrapper = shallow(<Error />);
    wrapper.find(Button).simulate('click');
    expect(sendMessage).toHaveBeenCalled();
});
