import "./style.css";
import { PanelUI } from "./ui/PanelUI";

const app = document.querySelector<HTMLDivElement>("#app")!;

const me_panelUI = new PanelUI();
const enemy_panelUI = new PanelUI();

app.appendChild(me_panelUI.canvasElement);
app.appendChild(enemy_panelUI.canvasElement);
