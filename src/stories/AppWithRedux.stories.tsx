import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import App from "../App";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/AppWithRedux',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;
const Template: Story = () =>
    <App demo={true}/>

    export const AppWithReduxExample = Template.bind({});
    AppWithReduxExample.args={};