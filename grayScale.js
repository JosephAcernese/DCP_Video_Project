var Jimp = require('jimp');

 Jimp.read('test_frames/test_001.jpg').then(image =>{

    image.bitmap = new grayScale(image.bitmap);
    return image.write('test_frames/test_001.jpg');



 });







function grayScale(bitmap){

    for(let i = 0; i < bitmap.height;i++){

        for(let j = 0; j < bitmap.width; j++){

            let index = (i*4) * bitmap.width + j*4;

            let average = (bitmap.data[index] + bitmap.data[index+1] + bitmap.data[index + 2])/3;

            bitmap.data[index] = average;
            bitmap.data[index + 1] = average;
            bitmap.data[index + 2] = average;

        }



    }
    
    return bitmap;



}