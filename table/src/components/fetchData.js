import matchFunctions from "./matchFunctions";

const fetchData = async () => {
	console.log("fetching data");
  const v = await matchFunctions.fetchData();
  console.log(v);
  
  return v;
}
const val = fetchData();
console.log(val);

export default val;
