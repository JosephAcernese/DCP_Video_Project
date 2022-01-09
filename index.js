var ffmpeg = require('ffmpeg');
var fs = require('fs')

const {exec} = require('child_process');

const { stdout, stderr } = require('process');

const input_file = 'pointer.mp4'
const output_file = 'pointer_frames/pointer_%03d.jpg'


const extractImagesFromVideo = (input, output) => {
    const cmd_line_args = `ffmpeg -i ${input} ${output}`
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




module.exports = {extractImagesFromVideo};

