
# yarcl
Yet another react chart library.


# Development

To build yarcl, you need to install required dependencies by executing `npm i` in command line.

Then you can build yarcl by executing `npm start` , library bundle will be in the folder `lib` .

To run tests, just execute `npm test` .

# Usage

# Charts
## Bar Chart
Example:
```javascript
<BarChart
    title={'Population of largest Turkey cities (in millions)'}
    subtitle={'according to 2015 estimates'}
    label={['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Adana']}
    data={[14000000, 4700000, 2800000, 1900000, 1600000]}
/>
```
Bar chart has these attributes:

    title (optional): The main title
    
    subtitle (optional): Explanatory subtitle
    
    label: This string array contains the names of the bars.
    
    data: This number array contains the values.
    
    color (optional): You can change the bars color to one chosen color. eg. "orange"
    
    scale (optional): This number changes the X line scale. eg. "5" splits the scale to 5 points.

## Area Chart
Example:
```javascript
<AreaChart
    title="Population of countries by years (in millions)"
    subtitle="in 1950, 1965, 1980, 1995 and 2010"
    series={[
        {label: 'Turkey', data: [21, 30, 43, 58, 71]},
        {label: 'Germany', data: [69, 75, 78, 81, 80]},
        {label: 'Canada', data: [14, 19, 24, 29, 34]},
        {label: 'Israel', data: [null, 2, 3, 5, 7]}
    ]}
/>
```
Area chart has these attributes:

    title (optional): The main title
    
    subtitle (optional): Explanatory subtitle
    
    series: This contains label, data and color.

        label: This string array contains the names of the bars.
    
        data: This number array contains the values.
    
        color (optional): You can change the bars color to one chosen color. eg. "orange"
    
    scale (optional): This number changes the X line scale. eg. "5" splits the scale to 5 points.
    
    scaleLabel (optional): You can directly give labels to x axis with string array.

## Stacked Area Chart
Example:
```javascript
<StackedAreaChart
    title="Population of countries by years (in millions)"
    subtitle="in 1950, 1965, 1980, 1995 and 2010"
    series={[
        {label: 'Turkey', data: [21, 30, 43, 58, 71]},
        {label: 'Germany', data: [69, 75, 78, 81, 80]},
        {label: 'Canada', data: [14, 19, 24, 29, 34]},
        {label: 'Israel', data: [null, 2, 3, 5, 7]}
    ]}
/>
```
Stacked area chart has these attributes:

    title (optional): The main title
    
    subtitle (optional): Explanatory subtitle
    
    series: This contains label, data and color.

        label: This string array contains the names of the bars.
    
        data: This number array contains the values.
    
        color (optional): You can change the bars color to one chosen color. eg. "orange"
    
    scale (optional): This number changes the X line scale. eg. "5" splits the scale to 5 points.
    
    scaleLabel (optional): You can directly give labels to x axis with string array.

## Stacked Line Chart
Example:
```javascript
<LineChart
    title={{text: 'Population of countries by years (in millions)'}}
    subtitle={{text: 'in 1950, 1965, 1980, 1995 and 2010'}}
    yAxis={{title: {text: 'Population'}}}
    plotOptions={{pointStart: 10}}
    width={1000}
    height={400}
    series={[
        {name: 'Turkey', data: [21, 30, 43, 58, 71]},
        {name: 'Germany', data: [69, 75, 78, 81, 80]},
        {name: 'Canada', data: [14, 19, 24, 29, 34]},
        {name: 'Israel', data: [0, 2, 3, 5, 7]}
    ]}
/>
```
Line chart has these attributes:

    title: This contains text.

        text: The main title.
    
    subtitle: This contains text.

        text: Explanatory subtitle.

    yAxis: This contains title.

        title:  ---

            text: Y Axis title.
    
    plotOptions: This contains pointStart.

        pointStart: Starting point for X Axis.

    width: Width of the chart.

    height: Height of the chart.
    
    series: This contains name and data.

        name: Name of the Data.
    
        data: This number array contains the values.