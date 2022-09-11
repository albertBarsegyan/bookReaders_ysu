export default function isPrimitive(test: any) {
  return test !== Object(test);
}
