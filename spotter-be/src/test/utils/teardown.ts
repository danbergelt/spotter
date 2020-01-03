const { exec } = require('child_process');
import redis from "redis";
import { promisify } from "util";
const client: redis.RedisClient = redis.createClient();
const flush = promisify(client.flushall).bind(client);

after(async () => {
  await flush();
  //@ts-ignore
  // these mongodb scripts are personalized to my local environment
  // if cloned, replace this with your personal scripts to stop and start a mongodb docker container :)
  exec("stop mongodb && run-mongodb", (err, stdout, stderr) => {
    if (err) {
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});
