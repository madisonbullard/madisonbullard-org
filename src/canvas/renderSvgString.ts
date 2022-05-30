import * as paper from "paper";

export function renderSvgString(svgString: string) {
  return paper.project.importSVG(svgString);
}
