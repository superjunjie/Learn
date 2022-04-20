var deserialize = function(s) {
  let index = 0;
  const dfs = (s) => {
      if (s[index] === '[') {
          index++;
          const ni = new NestedInteger();
          while (s[index] !== ']') {
              ni.add(dfs(s));
              if (s[index] === ',') {
                  index++;
              }
          }
          index++;
          return ni;
      } else {
          let negative = false;
          if (s[index] === '-') {
              negative = true;
              index++;
          }
          let num = 0;
          while (index < s.length && isDigit(s[index])) {
              num = num * 10 + s[index].charCodeAt() - '0'.charCodeAt();
              index++;
          }
          if (negative) {
              num *= -1;
          }
          return new NestedInteger(num);
      }
  }
  return dfs(s);
};

const isDigit = (ch) => {
  return parseFloat(ch).toString() === "NaN" ? false : true;
}