import { sendMessage } from '../../../browser';
import { Button } from '../styled/buttons';
import CheckboxGroup from '../CheckboxGroup';
import Form from '../Form';


jest.mock('../../../browser');

let props, form;

beforeEach(() => {
    props = {
        title: 'Form Title',
        machine_name: 'mac',
        data: {
            ebook: [
                {
                    meta: [{
                        id: "1"
                    }]
                }, {
                    meta: [{
                        id: "2"
                    }]
                }
            ]
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
            "1": false,
            "2": false
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
            id: "1"
        }
    });
    expect(form.state()).toEqual({
        error: undefined,
        form: {
            "1": true,
            "2": false
        }
    });
});

test('isChecked returns the correct boolean values', () => {
    const instance = form.instance();
    expect(instance.isChecked("1")).toBe(false);
    expect(instance.isChecked("2")).toBe(false);
    form.setState({
        form: {
            ...form.state('form'),
            "1": true
        }
    });
    form.update();
    expect(instance.isChecked("1")).toBe(true);
    expect(instance.isChecked("2")).toBe(false);
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
            "1": true
        }
    });
    form.simulate('submit', {
        preventDefault: jest.fn()
    });
    expect(sendMessage).toHaveBeenCalled();
});
