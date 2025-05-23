const fs = require("fs");
const archiver = require("archiver");

const items = [
  { path: "game", nameInZip: "game", type: "directory" },
  { path: "boot.json", nameInZip: "boot.json", type: "file" },
  { path: "readme.txt", nameInZip: "readme.txt", type: "file" },
];

/////////////////////////////////////////////
//EN - Check all items exist and have correct type
//CN - 检查所有项目是否存在并具有正确类型
/////////////////////////////////////////////

for (const item of items) {
  if (!fs.existsSync(item.path)) {
    console.error(`[Error] Missing: ${item.path}`);
    process.exit(1);
  }
  const stats = fs.statSync(item.path);
  if (item.type === "directory" && !stats.isDirectory()) {
    console.error(`[Error] Not a directory: ${item.path}`);
    process.exit(1);
  }
  if (item.type === "file" && !stats.isFile()) {
    console.error(`[Error] Not a file: ${item.path}`);
    process.exit(1);
  }
}

/////////////////////////////////////////////
//EN - File Zipping Logic
//CN - 文件压缩逻辑
/////////////////////////////////////////////

console.log("[Verifying] Looking Up Mod Version...");
const bootData = JSON.parse(fs.readFileSync("boot.json", "utf-8"));
const modVersion = bootData.version;
console.log(`[Info] Mod Version: ${modVersion}`);

const outputName = `Dol-Teleporter-v${modVersion}.mod.zip`;
const output = fs.createWriteStream(outputName);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => {
  console.log(`[Completed] Created ${outputName} (${archive.pointer()} bytes)`);
});

archive.on("error", (err) => {
  throw err;
});

archive.pipe(output);

for (const item of items) {
  if (item.type === "directory") {
    archive.directory(item.path, item.nameInZip);
  } else {
    archive.file(item.path, { name: item.nameInZip });
  }
}

archive.finalize();
