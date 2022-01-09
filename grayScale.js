var Jimp = require('jimp');


getImages("pointer",100);



async function getImages(fileName,frameCount){
    
    await require('dcp-client').init();
    const compute = require('dcp/compute');

    var rowArray = [];
    //var imageArray = [];
    var tempImage;
    var bitArray = [];
    
    for(var i = 1; i <= frameCount; i++){


        await Jimp.read(fileName + '_frames/' + fileName + '_' + i.toString().padStart(frameCount.toString().length,"0") + '.jpg').then( image =>{
        
    
            /*
            for(let j = 0; j < image.bitmap.data.length; j = j + image.bitmap.width){

                
                var tempRow = Array.from(image.bitmap.data.slice(j, j + image.bitmap.width));

                
                var tempObject = {

                    width: image.bitmap.width,
                    height: 1,
                    data: JSON.stringify(tempRow)
                }

                rowArray.push(tempObject);


            }
            */




            

            var tempArr = Array.from(image.bitmap.data);

            //console.log(tempArr.length);


            var tempObject = {

                width: image.bitmap.width,
                height: image.bitmap.height,
                data: JSON.stringify(tempArr)

            }


            //image.bitmap.data = null;

            //imageArray.push(image);
            tempImage = image;
            bitArray.push(tempObject);
            


        });
    }

    //console.log(baseArray[0].length);

    var job = compute.for(bitArray,grayScale);


    job.debug = true;

    job.public.name = "Joe's code" ;
    
    job.computeGroups = [ { joinKey: 'hackathon', joinSecret: 'dcp2021' } ];

    



    job.on('accepted', () => {
        console.log(` - Job accepted with id: ${job.id}`);
        bitArray = null;
    });
    job.on('result', (ev) => {
        console.log("Result", ev);
    });
    job.on('readystatechange', (state) => {
        console.log("Ready", state);
    });

    job.on('error', (state) => {
        console.log("Error" , state);
    });

    job.on('console', (state) => {
        console.log("Console " , state);
    });

    job.on('status', (state) => {
        console.log("Status " ,state);
    });

    var results =  Array.from(await job.exec(0.00001));


    console.log("Jobs done:", results);


    //let height = imageArray[0].bitmap.height;

    for(var i = 0; i < frameCount; i++){


        /*
        var tempBitmapData = new Array();

        for(var j = 0; j < height; j++){



            tempBitmapData.concat(results[i*height + j].data);

        }



        imageArray[i].bitmap.data = tempBitmapData;
        */



        /*
        imageArray[i].bitmap.data = results[i].data;

        await imageArray[i].writeAsync("pointer_frames/pointer_" + (i+1).toString().padStart(3,"0") + ".jpg");
        */


        console.log(i, "slice done");

        tempImage.bitmap = results[i];

        await tempImage.writeAsync(fileName + '_frames/' + fileName + '_' + (i+1).toString().padStart(frameCount.toString().length,"0") + ".jpg");

        

        /*
        imageArray[i].write("bricktest.jpg");
        */

    }

    process.exit();


}


//GrayScale function which takes in image's bitmap
function grayScale(bitmap){

try{


    progress();



    bitmap.data = JSON.parse(bitmap.data);



    //console.log("Worker started ", bitmap.data.length, bitmap.data[0]);

    //console.log(bitmap.data.slice(0,3));

    //Loops through all rows
    for(let i = 0; i < bitmap.height;i++){



        //Loops through all columns
        for(let j = 0; j < bitmap.width; j++){



            //Calculate index using row and column offset
            let index = (i*4) * bitmap.width + j*4;

            //Calculate average RGB value
            let average = Math.floor(( bitmap.data[index] + bitmap.data[index+1] + bitmap.data[index + 2])/3);

            //Assign average rgb value
            bitmap.data[index] = average;
            bitmap.data[index + 1] = average;
            bitmap.data[index + 2] = average;

    

        }

        progress(1/bitmap.height);

    }

    
    //Return new bitmap
    return bitmap;


}catch(e){
    console.log(e);
}

}





