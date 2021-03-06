
# yarcl
Yet another react chart library. It's 16KB in size (gzipped)!

# Usage

To use yarcl, you must have a project using react. You can find the library bundle and the default stylesheet file under `lib` folder.

```cmd
npm i yarcl
```

To use in your project:

```javascript
import './node_modules/yarcl/lib/style.css';
import { LineChart } from 'yarcl';
```

Or you can use <script> tags:

```html
<link rel="stylesheet" href="./node_modules/yarcl/lib/style.css">
<script src="./node_modules/yarcl/lib/yarcl.umd.min.js"></script>
<script>
    const LineChart = yarcl.LineChart;
</script>
```

# Charts
## Bar Chart
Example:
```javascript
import { BarChart, BarChartVertical } from 'yarcl';

<BarChart
    title={'Population of largest Turkey cities (in millions)'}
    subtitle={'according to 2015 estimates'}
    label={['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Adana']}
    data={[14000000, 4700000, 2800000, 1900000, 1600000]}
/>

<BarChartVertical
    title={'Population of largest Turkey cities (in millions)'}
    subtitle={'according to 2015 estimates'}
    label={['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Adana']}
    data={[14000000, 4700000, 2800000, 1900000, 1600000]}
/>
```

![](static/bar_chart.png)
![](static/bar_chart_vertical.png)

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
import { AreaChart } from 'yarcl';

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

![](static/area_chart.png)

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
import { StackedAreaChart } from 'yarcl';

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

![](static/stacked_area_chart.png)

Stacked area chart has these attributes:

    title (optional): The main title
    
    subtitle (optional): Explanatory subtitle
    
    series: This contains label, data and color.

        label: This string array contains the names of the bars.
    
        data: This number array contains the values.
    
        color (optional): You can change the bars color to one chosen color. eg. "orange"
    
    scale (optional): This number changes the X line scale. eg. "5" splits the scale to 5 points.
    
    scaleLabel (optional): You can directly give labels to x axis with string array.

## Line Chart
Example:
```javascript
import { LineChart } from 'yarcl';

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

![](static/line_chart.png)

Line chart has these attributes:

    title (optional): This contains text.

        text: The main title.
    
    subtitle (optional): This contains text.

        text: Explanatory subtitle.

    yAxis (optional): This contains title.

        title:  ---

            text: Y Axis title.
    
    plotOptions (optional): This contains pointStart.

        pointStart: Starting point for X Axis.

    width (optional): Width of the chart.

    height (optional): Height of the chart.
    
    series: This contains name and data.

        name: Name of the Data.
    
        data: This number array contains the values.

## Pie Chart
Example:
```javascript
import { PieChart } from 'yarcl';

<PieChart
    title={'Spread of population in top 5 districts in Kayseri '}
    data={[
        {label: 'Melikgazi', value: 562000},
        {label: 'Kocasinan', value: 394000},
        {label: 'Talas', value: 155000},
        {label: 'Develi', value: 64000},
        {label: 'Yahyalı', value: 36000},
    ]}
    options={{ showPercentage: true, isDonut: true, donutPercentage: 0.5 }}
/>
```

![](static/pie_chart.png)
![](static/donut_chart.png)

Pie chart has these attributes

    title: String value for the chart's title

    data: Array of objects for data to be displayed

        label: Label of the given serie

        value: Value of type number for the serie

    options (optional): Customization options for the chart

        pieStartingPercentage (optional): A number value that determines which angle the pies start from. Value can be between 0 and 1, 1 being 360 degrees. (default: 0.25)

        isDonut (optional): A boolean value to enable donut chart (default: false)

        donutPercentage (optional): A number value between 0 and 1 that determines the size of empty circle inside donut chart (default: 0.5)

## Heatmap Chart
Example:
```javascript
import { HeatmapChart } from 'yarcl';

<HeatmapChart
    title={{text:'Sales per employee per weekday'}}
    xAxis={{categories:['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura']}}
    yAxis={{categories:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']}}
    width={900}
    height={500}
    series= {{
        borderWidth: 0,
        data: [
            [0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], 
            [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], 
            [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], 
            [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], 
            [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], 
            [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], 
            [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], 
            [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], 
            [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], 
            [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], 
            [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], 
            [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], 
            [9, 3, 48], [9, 4, 91]],
        dataLabels: {
            enabled: true,
            color: 'black'
        }
    }}
/>
```

![](static/heatmap_chart.png)

HeatMap chart has these attributes

    title: This contains text.

        text: The main title.
    
    xAxis: This contains categories.

        categories: This string array contains names for x axis of data.

    yAxis: This contains categories.

        categories: This string array contains names for y axis of data.

    width: Width of the chart.

    height: Height of the chart.
    
    series: This contains borderWidth, data and dataLabels.

        borderWidth: Width of the border between each of the heatmap data cells if wanted else leave "0".

        data: This 2D number array contains x index, y index and data value for each data.

        dataLabels: This contains enabled and color.

            enabled: Boolean value if data values be wanted to be shown on the data cells.

            color: Color of data values if enabled.


## BubbleChart Chart
Example:
```javascript
import { BubbleChart } from 'yarcl';

<BubbleChart
    title={{text: 'Sugar and fat intake per country'}}
    subtitle={{text: 'data taken from https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/bubble/'}}
    xAxis={{
        gridLineWidth: 1,
        per: 'day',
        plotLines: [{
            color: 'black',
            dashStyle: '4, 4, 8, 4',
            label:{
                text: 'Safe fat intake ',
                x: 0,
                y: 0
            },
            value: 200,
            width: 1
        }],
        title:{text: 'Daily fat intake'},
        unitName: 'gr'
    }}
    yAxis={{
        gridLineWidth: 1,
        per: 'day',
        plotLines:[{
            color: 'black',
            dashStyle: '4, 4',
            label:{
                text: 'Safe sugar intake ',
                x: 0,
                y: 0
            },
            value: 80,
            width: 1
        }],
        title:{text: 'Daily sugar intake'},
        unitName: 'gr'
    }}
    width={1000}
    height={550}
    series={[
        { x: 85.1, y: 305.1, z: 50.8, shortName: 'BE', fullName: 'Belgium       ' },
        { x: 86.5, y: 102.9, z: 14.7, shortName: 'DE', fullName: 'Germany       ' },
        { x: 80.8, y: 191.5, z: 15.8, shortName: 'FI', fullName: 'Finland       ' },
        { x: 80.4, y: 102.5, z: 12.1, shortName: 'NL', fullName: 'Netherlands   ' },
        { x: 80.3, y: 186.1, z: 11.8, shortName: 'SE', fullName: 'Sweden        ' },
        { x: 78.4, y: 170.1, z: 16.6, shortName: 'ES', fullName: 'Spain         ' },
        { x: 74.2, y: 168.5, z: 14.5, shortName: 'FR', fullName: 'France        ' },
        { x: 73.5, y: 183.1, z: 10.1, shortName: 'NO', fullName: 'Norway        ' },
        { x: 71.1, y: 193.2, z: 24.7, shortName: 'UK', fullName: 'United Kingdom' },
        { x: 69.2, y: 157.6, z: 10.4, shortName: 'IT', fullName: 'Italy         ' },
        { x: 68.6, y: 120.1, z: 16.1, shortName: 'RU', fullName: 'Russia        ' },
        { x: 65.5, y: 126.4, z: 35.3, shortName: 'US', fullName: 'United States ' },
        { x: 65.4, y: 150.8, z: 28.5, shortName: 'HU', fullName: 'Hungary       ' },
        { x: 63.4, y: 151.8, z: 15.4, shortName: 'PT', fullName: 'Portugal      ' },
        { x: 64.1, y: 182.9, z: 31.3, shortName: 'NZ', fullName: 'New Zealand   ' }
    ]}
/>
```

![](static/bubble_chart.png)

BubbleChart chart has these attributes

    title (optional): This contains text.

        text: The main title.
    
    subtitle (optional): This contains text.

        text: Explanatory subtitle.
    
    xAxis: This contains gridLineWidth, per, plotLines, title and unitName.

        gridLineWidth (optional): Width of the vertical grid lines.
        
        per: UnitName of y where why is x/y
        
        plotLines: This contains color, dashStyle, label, value and width.

            color: Color of plotline.
            
            dashStyle: DashStyle for plotline.
            
            label: This contains text, x and y.

                tex: text of plot line.

                x (optional): x offset from plotline for text.

                y (optional): y offset from plotline for text.
            
            value: value for plotline for where it should be.
            
            width: Width of the plotline of xAxis.
        
        title (optional): ---

            text: Title for xAxis.
        
        unitName: UnitName of x where why is x/y
    
    yAxis: This contains gridLineWidth, per, plotLines, title and unitName.

        gridLineWidth (optional): Width of the horizontal grid lines.
        
        per: UnitName of y where why is x/y
        
        plotLines: This contains color, dashStyle, label, value and width.

            color: Color of plotline.
            
            dashStyle: DashStyle for plotline.
            
            label: This contains text, x and y.

                tex: text of plot line.

                x (optional): x offset from plotline for text.

                y (optional): y offset from plotline for text.
            
            value: value for plotline for where it should be.
            
            width: Width of the plotline of yAxis.
        
        title (optional): ---

            text: Title for xAxis.
        
        unitName: UnitName of x where why is x/y

    width (optional): Width of the chart.

    height (optional): Height of the chart.
    
    series: This contains borderWidth, data and dataLabels.

        borderWidth: Width of the border between each of the heatmap data cells if wanted else leave "0".

        data: This 2D number array contains x index, y index and data value for each data.

        dataLabels: This contains enabled and color.

            enabled: Boolean value if data values be wanted to be shown on the data cells.

            color: Color of data values if enabled.

# Development

To build yarcl, you need to install required dependencies by executing `npm i` in command line.

Then you can build yarcl by executing `npm start` , library bundle will be in the folder `lib` .

To run tests, just execute `npm test` .