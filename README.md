# Library Date React

A simple and reusable Datepicker component for React.

## Installation

The package can be installed via [npm](https://github.com/npm/cli):

```
npm i library-date-react
```

Or via [yarn](https://github.com/yarnpkg/yarn):

```
yarn add library-date-react
```

Below is a simple example of how to use the Datepicker in a React view.

```js
import React, { useState } from "react";
import { DatePicker } from "library-date-react";

const Example = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  );
};
```

## Configuration

The most basic use of the DatePicker can be described with:

```js
<DatePicker selected={startdate} onChange={(date) => setStartDate(date)} />
```

You can use `onSelectDate` event handler which fires each time some calendar date has been selected

```js
<DatePicker
  selected={date}
  onSelectDate={handleDateSelect} //when day is clicked
  onChange={handleDateChange} //only when value has changed
/>
```

## Live Demo Examples

To see demo examples, run the following command :


```
npm run storybook
```

Or via [yarn](https://github.com/yarnpkg/yarn):

```
yarn storybook
```

## Running Tests

To run tests, run the following command :

```
npm run test
```

Or via [yarn](https://github.com/yarnpkg/yarn):

```
yarn test
```