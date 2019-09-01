const { spawn } = require("child_process");

const opts = { stdio: "inherit", cwd: ".", shell: true };

spawn("node", ["proxy"], opts);
spawn("node", ["hello"], { ...opts, cwd: "api" });
