var ffmpeg = require("ffmpeg");
var fs = require("fs");

const { exec } = require("child_process");

const { stdout, stderr } = require("process");

const input_file = "test1.mp4";
const output_file = "test1.mp3";

const imageToVideo = (input_path, output) => {
  const cmd_line_args = `ffmpeg -r 24 -f image2 -s 1920x1080 -i ${input_path} -vcodec libx264 -crf 25  -pix_fmt yuv420p ${output}`;
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
imageToVideo("test_frames/test_%03d.jpg", "final_test.mp4");
