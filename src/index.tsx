import React from 'react';
import {render} from 'react-dom';
import './styles.scss';
import App from './components/App';

const element = document.getElementById("root");
if (!element) {
    throw new Error("couldn't find element with id root");
}

render(<App />, element);
