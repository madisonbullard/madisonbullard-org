import * as paper from "paper";

export function renderSvg(svgString: string) {
  return paper.project.importSVG(svgString);
}
