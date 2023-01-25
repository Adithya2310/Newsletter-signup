const express=require('express');
const request=require('request');
const bodyParser=require('body-parser');
const https=require('https')

const app=express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended:true
}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    
    var fname=req.body.fname;
    var lname=req.body.lname;
    var email=req.body.email;
    var data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    };
    var jsonData=JSON.stringify(data);
    url="https://us21.api.mailchimp.com/3.0/lists/6b434be3cd";
    const options={
        method:"post",
        auth:"adithyang:28e92a28b8632272fa731d2e609caf40-us21"
    };
    const request=https.request(url,options,function(responce){
        if(responce.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        responce.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();

});
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
});
// 28e92a28b8632272fa731d2e609caf40-us21
// 6b434be3cd
