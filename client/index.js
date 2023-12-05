import React from "react";
import './styles.scss';
import { createRoot } from 'react-dom/client';
import App from './components/App';
// import banana from './styles.scss'

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(<App />);
