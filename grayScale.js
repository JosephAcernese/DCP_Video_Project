var Jimp = require('jimp');


getImages("test.mp4",1);



async function getImages(fileName,frameCount){
    
    await require('dcp-client').init();
    const compute = require('dcp/compute');

    var rowArray = [];
    var imageArray = [];


    
    for(var i = 1; i <= frameCount; i++){

        /*
        await Jimp.read('test_frames/test_' + i.toString().padStart(3,"0") + '.jpg').then( image =>{
        */

        await Jimp.read('bricktest.jpg').then( image =>{

            for(let j = 0; j < image.bitmap.data.length; j = j + image.bitmap.width){

                var tempRow = image.bitmap.data.slice(j, j + image.bitmap.width);

                console.log(JSON.stringify(image.bitmap.data));


                
                var tempObject = {

                    width: image.bitmap.width,
                    height: 1,
                    data: tempRow

                }

                console.log(tempObject.width,tempObject.height,tempObject.data.slice(0,4),tempObject.data.length);

                rowArray.push(tempObject);

            }

            imageArray.push(image);

        });
    }


    var job = compute.for(rowArray,grayScale);

    job.debug = true;

    
    //job.computeGroups = [ { joinKey: 'hackathon', joinSecret: 'dcp2021' } ];
    



    job.on('accepted', () => {
        console.log(` - Job accepted with id: ${job.id}`);
    });
    job.on('result', (ev) => {
        console.log(` - Received result ${ev}`);
    });
    job.on('readystatechange', (state) => {
        console.log(` - Ready State ${state}`);
    });

    job.on('error', (state) => {
        console.log(` - Error State ${state}`);
    });

    job.on('console', (state) => {
        console.log("Console " , state);
    });

    job.on('status', (state) => {
        console.log("Status " ,state);
    });

    var results =  Array.from(await job.exec());


    console.log("Jobs done");




    let height = imageArray[0].bitmap.height;




    for(var i = 0; i < frameCount; i++){


        
        var tempBitmapData = new Uint8Array();

        for(var j = 0; j < height; j++){



            tempBitmapData.concat(results[i*height + j].data);

        }



        imageArray[i].bitmap.data = tempBitmapData;

        /*
        imageArray[i].write("test_frames/test_" + (i+1).toString().padStart(3,"0") + ".jpg");
        */

        bricktest.jpg
        imageArray[i].write("bricktest.jpg");

    }


    return;

}


//GrayScale function which takes in image's bitmap
function grayScale(bitmap){

    progress();


    //Loops through all rows
    for(let i = 0; i < bitmap.height;i++){

        console.log(i, bitmap.data.length);


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