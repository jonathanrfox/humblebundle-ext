import { formatBytes } from '../../utils';
import { Checkbox } from '../styled/checkbox';
import CheckboxItem from '../CheckboxItem';

jest.mock('../../utils');

let props, wrapper;

beforeEach(() => {
    props = {
        id: 1,
        format: "f",
        totalFileSize: 100,
        checked: false,
        onChange: jest.fn()
    }
    wrapper = shallow(<CheckboxItem {...props} />);
});

afterEach(() => {
    jest.clearAllMocks();
});

test('formatBytes is called', () => {
    expect(formatBytes)
        .toHaveBeenCalledWith(props.totalFileSize);
});

test('onChange is called', () => {
    const checkbox = wrapper.find(Checkbox);
    expect(checkbox.prop('checked')).toBeFalsy();
    checkbox.simulate('change');
    expect(props.onChange).toHaveBeenCalled();
});

test('CheckboxItem does not re-render w/ same props', () => {
    let result = wrapper.instance().shouldComponentUpdate(props);
    expect(result).toBeFalsy();
});

test('CheckboxItem does re-render w/ diff props', () => {
    let result = wrapper.instance().shouldComponentUpdate({
        ...props,
        id: props.id + 1
    });
    expect(result).toBeTruthy();
});
