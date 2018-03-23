const axios = require("axios");
const fs = require("fs");

Promise.all([
  axios.get("http://www.mhwdb.kr/apis/armors"),
  axios.get("http://www.mhwdb.kr/apis/skills")
])
  .then(([armors, skills]) => [
    Array.from(armors.data),
    Array.from(skills.data)
  ])
  .then(([armors, skills]) => {
    // skill name 채우기
    let dic = {};
    armors.forEach(a => a.skills.forEach(s => (dic[s.idx] = s.name)));
    skills.forEach(s => {
      s.name = dic[s.idx];
    });
    return [armors, skills];
  })
  .then(([armors, skills]) => {
    fs.writeFileSync("./static/armors.json", JSON.stringify(armors));
    fs.writeFileSync("./static/skills.json", JSON.stringify(skills));
  })
  .catch(err => console.error(err));
