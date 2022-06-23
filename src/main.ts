import { CanvasManager } from './CanvasManger'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

const canvas = CanvasManager.createCanvas(1000, 500);
CanvasManager.init(canvas);

app.appendChild(canvas);