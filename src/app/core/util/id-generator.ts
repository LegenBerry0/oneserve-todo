export function generateTempId(): string {
  return 'temp_' + Math.random().toString(36).substr(2);
}
