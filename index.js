const express = require('express');
const fs = require('fs');
var cors = require('cors')
const app = express();
const PORT =  7005;

const getData = () => fs.readFileSync("Data.json", "utf8");
let DataTemp = getData();

const Append = (p) => 
{
    DataTemp = getData()
    fs.writeFileSync("Data.json","[")
    for(let i of JSON.parse(DataTemp))
    {
        fs.appendFileSync("Data.json", (JSON.stringify(i)+","))
    }
    fs.appendFileSync("Data.json", JSON.stringify(p)+"]")
    DataTemp = getData();
}

const Check = (uid) =>
{
    for(let i of JSON.parse(getData()))
    {
        if(i.id === parseInt(uid))
        {
            return i;
        }
    }
}

app.get("/getAllUsers", (req, res) =>
{
    res.status(200).send(JSON.parse(getData()))
})

app.use(cors())
app.use(express.json())

app.post("/addUser", (req,res) =>
{
    const {id, name, surname, age, nationality} = req.body;

    if(!name || !id || !surname || !age || !nationality)
    {
        res.status(400).send({request:"Failed",message:"You have some parameters missing! Check your JSON."})
    }
    else
    {
        res.status(200).send(
        {
            request:"Accepted",
            message:`User ${name+" "+surname} was added!`
        })
        Append(req.body)
    }
})



app.get("/getUser/:uid", (req, res) =>
{
    const {uid} = req.params;

    let Response = Check(uid);

    if(Response)
    {
        res.status(200).send(Response);
    }
    else
    {
        res.status(400).send({request:"Failed",message:"The requested user dosen't exists!"})
    }
})

app.delete("/popUser", (req,res) =>
{
    if(JSON.parse(getData()).length > 0)
    {
        let popedArray = JSON.parse(getData());
        popedArray.pop()
        fs.writeFileSync("Data.json", JSON.stringify(popedArray));
        res.status(200).send({request:"Success",message:"User was poped!"})
    }
    else
    {
        res.status(400).send({request:"Failed",message:"There are no more users to pop!"})
    }
})

app.delete("/removeUser/:uid", (req,res) =>
{
    const {uid} = req.params;

    if(JSON.parse(getData()).length > 0)
    {
        DataTemp = [];
        JSON.parse(getData()).map(i=>
        {
            i.id == parseInt(uid) ? 0 : DataTemp.push(i)
        },0)
        fs.writeFileSync("Data.json", JSON.stringify(DataTemp));
        res.status(200).send({request:"Success",message:"User was removed!"})
    }
    else
    {
        res.status(400).send({request:"Failed",message:"There are no more users to delete!"})
    }
})

app.patch("/updateUser", (req, res) =>
{
    const {id, name, surname, age, nationality} = req.body;

    const exists = Check(id)
    if(exists)
    {
        if(!name || !id || !surname || !age || !nationality)
        {
            res.status(400).send({request:"Failed",message:"You have some parameters missing!"})
        }
        else
        {
            DataTemp = [];
            for(let i of JSON.parse(getData()))
            {
                if(i.id === id)
                {
                    DataTemp.push({id,name,surname,age,nationality})
                }
                else
                {
                    DataTemp.push(i)
                }
            }
            fs.writeFileSync("Data.json", JSON.stringify(DataTemp));
            res.status(200).send({request:"Success",message:"User has been updated!"})
        }
    }
    else
    {
        res.status(400).send({request:"Failed",message:"This user dosen't exists!"})
    }
})

app.listen(PORT, () =>console.log("API is ready!"));