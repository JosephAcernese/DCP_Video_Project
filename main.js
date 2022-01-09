const dcpFile = require("./grayScale.js");
const index = require('./index.js');
const vac = require('./videoAudioCombiner.js');
const ae = require('./audioExtractor.js');
const itv = require('./imageToVideo.js');





console.log(process.argv[2],process.argv[3]);


ae.extractAudioFromVideo(process.argv[2]+ ".mp4", process.argv[2]+ ".mp3" )

index.extractImagesFromVideo(process.argv[2]+".mp4", process.argv[2] + '_frames/' +  process.argv[2] + '_%03d.jpg');

dcpFile.getImages(process.argv[2],parseInt(process.argv[3]));

itv.imageToVideo(process.argv[2] + '_frames/' +  process.argv[2] + '_%03d.jpg', process.argv[2] + "na.mp4");

vac.combiner(process.argv[2] + "na.mp4",process.argv[2]+ ".mp3",process.argv[2] + "gray.mp4");








