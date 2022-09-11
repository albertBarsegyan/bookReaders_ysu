function isPrimitive(test) {
  return test !== Object(test);
}

console.log(isPrimitive(true));
