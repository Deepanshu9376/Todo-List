//jshint esversion:6

exports.getDate=function (){
    const today=new Date();

    const options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    return today.toLocaleDateString("en-US",options);
    // return day;
}

exports.getDay=function (){
    const today=new Date();

    const options={
        weekday:"long",
    };
    return today.toLocaleDateString("en-US",options);
     // var currentday=today.getDay();
    // var day="";
    // if(currentday===6 || currentday==0){
    //     day="Weekend";
    // }
    // else{
    //     day="Weekday"
    //     // res.sendFile(__dirname+"/index.html");
    // }
    // switch (currentday) {
    //     case 0:
    //         day="Sunday";
    //         break;
    //     case 1:
    //         day="Monday";
    //         break;
    //     case 2:
    //         day="Tuesday";
    //         break;
    //     case 3:
    //         day="Wednesday";
    //         break;
    //     case 4:
    //         day="Thrusday";
    //         break;
    //     case 5:
    //         day="Friday";
    //         break;
    //     case 6:
    //         day="Saturday";
    //         break;
    
    //     default:
    //         day="Something went Wrong!!"
    //         break;
    // }
    // return day;
}
