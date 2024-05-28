function getSemple(n, k) {
  const indexes = [];
  const res = [];
  for (let i = 0; i < n; i++) {
    indexes.push(i);
  }
  for (let i = 0; i < k; i++) {
      const index = Math.floor(Math.random()*indexes.length);
      res.push(indexes[index]);
      indexes.splice(index, 1);
  }
  return res;
}
