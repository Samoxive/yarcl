var Enzyme = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");

beforeEach(function () {
    Enzyme.configure({ adapter: new Adapter() });
});
