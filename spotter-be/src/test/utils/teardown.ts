const { exec } = require('child_process');
import redis from "redis";
import { promisify } from "util";
const client: redis.RedisClient = redis.createClient();
const flush = promisify(client.flushall).bind(client);

after(async () => {
  await flush();
  //@ts-ignore
  exec("stop mongodb && run-mongodb", (err, stdout, stderr) => {
    if (err) {
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});
