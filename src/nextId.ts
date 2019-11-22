let count = 0;

export default function nextId(id?: string): string {
  return typeof id === 'string' ? id : 'ReactToastSnack:' + count++;
}
