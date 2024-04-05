// DatePicker.stories.tsx
import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import DatePicker from "./DatePicker";

export default {
  title: "ReactComponentLibrary/DatePicker",
  tags : ['autodocs'],
  component: DatePicker,
} as Meta<typeof DatePicker>;

const Template: StoryFn<typeof DatePicker> = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithCallback = Template.bind({});
WithCallback.args = {
  onSelectDate: (date: Date) => console.log("Selected date:", date),
};
