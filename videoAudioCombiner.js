var ffmpeg = require("ffmpeg");
var fs = require("fs");

const { exec } = require("child_process");

const { stdout, stderr } = require("process");

const input_file = "test1.mp4";
const output_file = "test1.mp3";

const combiner = (input_video, input_audio, output_path) => {
  const cmd_line_args = `ffmpeg -i ${input_video} -i ${input_audio} -c:v copy -c:a aac ${output_path}`;
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
combiner(
  "final_test.mp4",
  "Amy_Waitress_Character_Animation.wav",
  "combined.mp4"
);
