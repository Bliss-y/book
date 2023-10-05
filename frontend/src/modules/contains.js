export default function contains(arr, item, cb) {
  for (let i in arr) {
    if (cb(arr[i], item)) return true;
  }
  return false;
}
