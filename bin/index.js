#!/usr/bin/env node

const version = require("../package.json").version;
const program = require("commander");
const download = require("download-git-repo");
const inquirer = require("inquirer");
const handlebars = require("handlebars");
const fs = require("fs");
const ora = require("ora");
const chalk = require("chalk");
const symbols = require("log-symbols");

program.version(version, "-v, --version");

program
  .command("create <app-name>")
  .description("使用 hzy 创建一个新的项目")
  .option("-d --dir <dir>", "创建目录")
  .action(async (name) => {
    if (fs.existsSync(name)) {
      // 错误提示项目已存在，避免覆盖原有项目
      console.log(symbols.error, chalk.red("项目名已存在，请删除后重新创建"));
      return;
    }
    const prompt = [
      {
        type: "list",
        name: "template",
        message: "请选择模板",
        choices: ["vite_ts_vue3", "blog"],
      },
    ];
    try {
      const answers = await inquirer.prompt(prompt);
      const { template } = answers;

      let url = "";
      switch (template) {
        case "vite_ts_vue3":
          url =
            "direct:https://github.com/codehzy/hzy-cli/vitepress-template.git";
          break;
        case "blog":
          url =
            "direct:https://github.com/codehzy/hzy-cli/vue3+ts+jsx+pinia+router4.git";
          break;
      }
      download(url, name, { clone: true }, (err) =>
        downloadTemplate(err, name)
      );
    } catch (error) {
      throw error;
    }
  });

//解析命令行
program.parse(process.argv);

/**
 * 下载模板
 * @param {object} err
 */
function downloadTemplate(err, name) {
  const spinner = ora("正在下载模板...");
  spinner.start();
  if (!err) {
    spinner.succeed();
    const meta = {
      name,
      // projectName: answers.projectName,
    };
    const fileName = `${name}/package.json`;
    if (fs.existsSync(fileName)) {
      const content = fs.readFileSync(fileName).toString();
      const result = handlebars.compile(content)(meta);
      fs.writeFileSync(fileName, result);
    }
    console.log(symbols.success, chalk.green("下载成功"));
    console.log(
      chalk.cyan(` ${chalk.gray("$")} cd ${name}\n`) +
        chalk.cyan(` ${chalk.gray("$")} npm install \n`) +
        chalk.cyan(` ${chalk.gray("$")} npm run serve \n`)
    );
  } else {
    spinner.fail();
    console.log(symbols.error, chalk.red(`拉取远程仓库失败${err}`));
  }
}
