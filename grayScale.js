var Jimp = require('jimp');


getImages("test.mp4",10);



async function getImages(fileName,frameCount){
    
    await require('dcp-client').init();
    const compute = require('dcp/compute');

    var imageArray= [];
    var bitmapArray = [];

    for(var i = 1; i < frameCount + 1 ; i++){


        await Jimp.read('test_frames/test_' + i.toString().padStart(3,"0") + '.jpg').then( image =>{


            bitmapArray.push(image.bitmap);
            imageArray.push(image); 
            console.log(i);

        });



    }



    var job = compute.for(bitmapArray,grayScale);
    
    var temp = Array.from(await job.exec());


    for(var i = 1; i < frameCount + 1 ; i++){

        imageArray[i].bitmap = temp[i];
        console.log(i);

        imageArray[i].write("test_frames/test_" + i.toString().padStart(3,"0") + '.jpg');

    }

}


//GrayScale function which takes in image's bitmap
function grayScale(bitmap){

    //Loops through all rows
    for(let i = 0; i < bitmap.height;i++){

        //Loops through all columns
        for(let j = 0; j < bitmap.width; j++){

            //Calculate index using row and column offset
            let index = (i*4) * bitmap.width + j*4;

            //Calculate average RGB value
            let average = (bitmap.data[index] + bitmap.data[index+1] + bitmap.data[index + 2])/3;

            //Assign average rgb value
            bitmap.data[index] = average;
            bitmap.data[index + 1] = average;
            bitmap.data[index + 2] = average;

        }

    }
    
    //Return new bitmap
    return bitmap;

}