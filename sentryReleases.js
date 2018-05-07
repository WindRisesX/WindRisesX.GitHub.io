// 通过CURL将sourceMap文件上传Sentry.io
let  fs = require('fs');
let  join = require('path').join;
let shell = require("shelljs");
let org = process.argv[2];
let project = process.argv[3];
let sourceMapPath = process.argv[4];
let version;

const TOKEN = '08dc62b2d4234abda9f0ea4bc7d511c34eb3721430dd49278690bc5f01a3ddd6'

/**
 * 
 * @param path  suorceMap所在目录
 * @returns {Array}
 */
function findSync(path) {
  let result = [];
  let files = fs.readdirSync(path);
  files.forEach((fName) => {
    if (fName.endsWith('.js.map')) {
      result.push(fName);
      if (fName.startsWith('app.')) {
        version = fName.split('.')[1];
      }
    }
  })
  return result;
}

// 获取所有suorceMap文件路径
let fileNames = findSync(sourceMapPath);

shell.exec(`cd ${sourceMapPath}`);
// 创建一个新的Releases
shell.exec(`curl https://sentry.io/api/0/projects/${org}/${project}/releases/ \
  -X POST \
  -H 'Authorization: Bearer ${TOKEN}' \
  -H 'Content-Type: application/json' \
  -d '{"version": "${version}"}'`);

// upload所有sourceMan文件
fileNames.forEach((fName) => {
  shell.exec(`curl https://sentry.io/api/0/projects/${org}/${project}/releases/${version}/files/ \
    -X POST \
    -H 'Authorization: Bearer ${TOKEN}' \
    -F file=@${join(sourceMapPath, fName)} \
    -F name="http://www.supersheep.cn/static/js/${fName}"`);
})
