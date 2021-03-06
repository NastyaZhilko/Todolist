import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import {AddItemForm, AddItemFormPropsType} from "../components/AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/AddItemForm Stories',
    component: AddItemForm,
    argTypes: {
        backgroundColor: {control: 'color'},
        onClick: {
            description: 'AddItemFormExample clicked'
        },
        value: {
            defaultValue: 'hello'
        }
    },
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormBaseExample = Template.bind({});
AddItemFormBaseExample.args = {
    addItem: action('AddItemFormExample clicked')
};




