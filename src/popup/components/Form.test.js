import { sendMessage } from '../../browser';
import { Types } from '../../types';
import { Button } from './styled/buttons';
import CheckboxGroup from './CheckboxGroup';
import Form from './Form';


jest.mock('../../browser');
jest.mock('../../window');

let props, form;

beforeEach(() => {
    props = {
        bundleName: 'Bundle Name',
        categories: {
            ebook_epubmobipdf: {
                platform: 'ebook',
                count: 5,
                productGroups: {
                    epub: {id: 'abc', products: [1, 2]},
                    mobi: {id: 'def', products: [3, 4]},
                    pdf: {id: 'ghi', products: [5, 6]}
                }
            },
            ebook_pdf: {
                platform: 'ebook',
                count: 2,
                productGroups: {
                    pdf: {id: 'jkl', products: [7, 8]}
                }
            }
        }
    };
    form = shallow(<Form {...props} />);
});

afterEach(() => {
    jest.clearAllMocks();
});

test('Form state is setup properly', () => {
    expect(form.state()).toEqual({
        error: undefined,
        form: {
            abc: false,
            def: false,
            ghi: false,
            jkl: false
        }
    });
});

test('form renders 2 CheckboxGroups', () => {
    const groups = form.find(CheckboxGroup);
    expect(groups.length).toBe(2);
});

test('onChange triggers state change', () => {
    form.instance().onChange({
        target: {
            id: 'abc'
        }
    });
    expect(form.state()).toEqual({
        error: undefined,
        form: {
            abc: true,
            def: false,
            ghi: false,
            jkl: false
        }
    });
});

test('isChecked returns the correct boolean values', () => {
    const instance = form.instance();
    expect(instance.isChecked('abc')).toBe(false);
    expect(instance.isChecked('def')).toBe(false);
    expect(instance.isChecked('ghi')).toBe(false);
    expect(instance.isChecked('jkl')).toBe(false);
    form.setState({
        form: {
            ...form.state('form'),
            abc: true
        }
    });
    form.update();
    expect(instance.isChecked('abc')).toBe(true);
    expect(instance.isChecked('def')).toBe(false);
    expect(instance.isChecked('ghi')).toBe(false);
    expect(instance.isChecked('jkl')).toBe(false);
});

test('onSubmit sets error', () => {
    form.simulate('submit', {
        preventDefault: jest.fn()
    });
    expect(form.state('error')).not.toBeUndefined();
});

test('onSubmit calls sendMessage', () => {
    form.setState({
        form: {
            ...form.state('form'),
            abc: true,
            def: true
        }
    });
    form.simulate('submit', {
        preventDefault: jest.fn()
    });
    expect(sendMessage).toHaveBeenCalledWith({
        payload: [1, 2, 3, 4],
        type: Types.DOWNLOAD_REQUEST
    });
});
