export default function invertor(selector) {
  return selector[2] === '1' ? selector[0] + ':0' : selector[0] + ':1';
}