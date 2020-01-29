import Victor from 'victor';

let v1 = new Victor(1, 1);
let v2 = v1.clone().add(v1);

export default () => {
  document.body.innerHTML = 'Hello, World!';
  console.log(v1, v2);
};
