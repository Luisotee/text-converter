export function convertText(text: string): string {
  return text.replace(/\n/g, "\\n").replace(/"/g, '\\"');
}
