var ffmpeg = require('ffmpeg');

const {exec} = require('child_process');
const { stdout, stderr } = require('process');

const input_file = 'test.mp4'
const output_file = 'test_frames/test_%03d.jpg'
const cmd_line_args = `ffmpeg -i ${input_file} -qscale:v 2 ${output_file}`

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

