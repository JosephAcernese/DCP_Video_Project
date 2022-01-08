var ffmpeg = require('ffmpeg');
var fs = require('fs')

const {exec} = require('child_process');

const { stdout, stderr } = require('process');

const input_file = 'test.mp4'
const output_file = 'test_frames/test_%03d.jpg'


const extractImagesFromVideo = (input, output) => {
    const cmd_line_args = `ffmpeg -i ${input} -qscale:v 2 ${output}`
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
    })
}

extractImagesFromVideo(input_file, output_file);

