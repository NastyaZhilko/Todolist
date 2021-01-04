import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import {EditableSpan, EditableSpanPropsType} from "../EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes:{
        onChange:{
            description:'Changed value editable span'
        },
        value:{
            defaultValue:'HTML',
            description: 'Start value to editable span'
        }
    },
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
  onChange: action('Value changed')
};
