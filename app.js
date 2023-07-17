const express=require("express");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
const _=require("lodash");
// const date=require(__dirname+"/date.js");

const app= express();
// const items=["Yoga","Worship","DSA Revision"];
// const workItems=[];
mongoose.connect("mongodb://127.0.0.1:27017/todoListDB",{useNewUrlParser:true})
.then(()=>console.log("Connection Successfull"))
.catch((err)=>console.log(err));

const itemsSchema=new mongoose.Schema({
    name: String
});

const Item=mongoose.model("Item",itemsSchema);
const item1=new Item({
    name: "Welcome to your todoList!!"
});
const item2=new Item({
    name: "Hit the + button to add a new Item."
});

const item3=new Item({
    name: "<-- Hit this to delete and Item."
});

const defaultItems = [item1,item2,item3];

const listSchema={
    name: String,
    items: [itemsSchema]
};

const List =mongoose.model("List",listSchema);

app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    
    Item.find({})
    .then(function(foundItems){
        if(foundItems.length === 0){
            Item.insertMany(defaultItems)
            .then(function(){
                console.log("Successfully saved default items")
            })
            .catch(function(err){
                console.log(err);
            })
            res.redirect("/");
        }
        res.render("list",{listTitle:"Today",newListItems:foundItems});
    });

    // const day=date.getDate();
});
app.post("/",function(req,res){
    const itemName= req.body.newItem;
    const listName= req.body.list;
    const item=new Item({
        name:itemName
    });

    if(listName==="Today"){
        item.save().then(()=>{
            console.log("Successfully Saved");
        });
        res.redirect("/");
    }
    else{
        List.findOne({name: listName}).then((foundList)=>{
            foundList.items.push(item);
            foundList.save().then(()=>{
                console.log("Successfully Saved item to new List");
            })
            res.redirect("/"+listName);
        })
    }
    // if(req.body.list === "Work"){
    //     workItems.push(item);
    //     res.redirect("/work");
    // }else{
    //     items.push(item);
    //     res.redirect("/");
    // }

});

app.post("/delete",function(req,res){
    const checkedItemID = req.body.checkbox;
    const listName =req.body.listName;

    if(listName==="Today"){

        Item.findByIdAndRemove(checkedItemID).then(()=>{
            console.log("Deleted Successfully Item");
            res.redirect("/");
        });
    }else{
        List.findOneAndUpdate({name:listName},{$pull: {items: {_id: checkedItemID}}}).then((foundList)=>{
            res.redirect("/"+listName);
        });
    }
});
// app.get("/work",function(req,res){
//     res.render("list",{listTitle:"Work list",newListItems:workItems});
// }) Now using Express

app.get("/:customListName",function(req,res){
    const customListName = _.capitalize(req.params.customListName);
    List.findOne({name: customListName})
    .then((foundList)=>{
        if(!foundList){
            const list =new List({
            name: customListName,
            items: defaultItems
            });
            list.save().then(()=>console.log("Listitems saved successfully"));
            res.redirect("/"+customListName);
        }
        else{
            res.render("list",{listTitle: foundList.name,newListItems: foundList.items});
        }
    }).catch((err)=>console.log(err));
})
app.get("/about",function(req,res){
    res.render("about");
})
app.post("/work",function(){
    const item= req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})
app.listen(3000,function(){
    console.log("Server Started on port 3000");
})