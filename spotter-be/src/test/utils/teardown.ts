const { exec } = require('child_process');

after(async () => {
  // @ts-ignore
  // these mongodb scripts are personalized to my local environment
  // if cloned, replace this with your personal scripts to stop and start a mongodb docker container :)
  exec('stop mongodb && run-mongodb', (err, stdout, stderr) => {
    if (err) {
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});
