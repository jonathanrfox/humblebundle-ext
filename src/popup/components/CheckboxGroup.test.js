import CheckboxGroup from '../CheckboxGroup';
import CheckboxItem from '../CheckboxItem';


let props, wrapper;

beforeEach(() => {
    props = {
        group: {
            meta: [{
                id: 1,
                format: 'f',
                totalFileSize: 100
            }],
            products: [{}, {}]
        },
        platform: 'platform',
        onChange: jest.fn().mockName('onChange'),
        isChecked: jest.fn().mockName('isChecked')
    }
    wrapper = shallow(<CheckboxGroup {...props} />);
});

afterEach(() => {
    jest.clearAllMocks();
});

test('1 CheckboxItem is rendered', () => {
    const items = wrapper.find(CheckboxItem);
    expect(items.length).toBe(1);
});

test('isChecked is called', () => {
    expect(props.isChecked).toHaveBeenCalled();
});
