Webcam.set({
    width:400,
    height:400,
    format:"jpeg",
    jpeg_quality:90,
    flip_horiz:true
});
camera = document.getElementById("camera");

Webcam.attach('#camera');

function capImage(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='imageCaptured' src="+data_uri+">";
    });
} 
console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/342jWt-9X/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded")
}

function identifyImage(){
    img = document.getElementById("imageCaptured");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_person_name").innerHTML = results[0].label;
        document.getElementById("result_person_accuracy").innerHTML = results[0].confidence.toFixed(2);
    }
}