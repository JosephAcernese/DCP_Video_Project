var ffmpeg = require("ffmpeg");
var fs = require("fs");

const { exec } = require("child_process");

const { stdout, stderr } = require("process");

const input_file = "test1.mp4";
const output_file = "test1.mp3";

const extractAudioFromVideo = (input, output) => {
  const cmd_line_args = `ffmpeg -i ${input} -map 0:a ${output}`;
  exec(cmd_line_args, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};


module.exports = {extractAudioFromVideo};