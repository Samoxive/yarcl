import * as React from 'react';
import { suite, test } from 'mocha-typescript';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Text } from '..';

@suite('<Text />')
class TextComponent {
    @test('renders properly')
    renders() {
        const text = shallow(<Text text="hello" />);
        return expect(text).to.be.ok;
    }

    @test('it displays given text')
    rendersText() {
        const text = shallow(<Text text="hello" />);
        expect(text.text()).to.equal('hello');
    }
}