/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import FileSaver from "file-saver";
import { surpriseMePrompts } from "../constants";

export function getrandomrprompt(prompt) {
  const ramdomindex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randompropt = surpriseMePrompts[ramdomindex];

  if (randompropt === prompt) return getrandomrprompt(prompt);
  return randompropt;
}
export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
