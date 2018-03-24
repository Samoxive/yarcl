import * as React from 'react';

export interface TextProps {
    text: string
}

export const Text = ({ text }: TextProps) => <h1>{ text }</h1>;