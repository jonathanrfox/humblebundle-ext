import * as checkbox from './styled/checkbox';
import CheckboxGroup from './CheckboxGroup';
import CheckboxItem from './CheckboxItem';


let props, wrapper;

beforeEach(() => {
    props = {
        platform: 'ebook',
        count: 5,
        productGroups: {
            mobi: {
                id: 'abc',
                totalFileSize: 100
            }
        },
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

test('isChecked is called with id', () => {
    expect(props.isChecked).toHaveBeenCalledWith('abc');
});

test('CheckboxGroupName is set correctly', () => {
    const node = wrapper.find(checkbox.CheckboxGroupName);
    expect(node.render().text()).toMatch('5 ebooks');
})
