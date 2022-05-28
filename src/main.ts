import "./style.css";

import setupPaper from "./canvas/setupPaper";
import metaball from "./canvas/metaball";

const app = document.querySelector<HTMLDivElement>("#app");

setupPaper(app);
metaball();
