
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
Barchart has these attributes:

    title (optional): The main title
    
    subtitle (optional): Explanatory subtitle
    
    label: This string array contains the names of the bars.
    
    data: This number array contains the values.
    
    color (optional): You can change the bars color to one chosen color. eg. "orange"
    
    scale (optional): This number changes the X line scale. eg. "5" splits the scale to 5 points.