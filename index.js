const express = require("express");
const app = express();
const fs = require("fs")
const jsonLists = require("./list.json");
let jsonTasks = require("./tasks.json");
const bodyParser = require("body-parser")
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const port = 3000;

app.get("/lists", function(req, res) {
    res.send(jsonLists);
})

app.get("/lists/:listId", function(req, res) {
    const id = req.params.listId;
    res.send(jsonLists.filter(x => x.id === id))
})
app.get("/lists/:listId/tasks", function(req, res) {
    const id = req.params.listId;
    res.send(jsonTasks.filter(x => x.listId === id))
})
app.get("/lists/:listId/tasks/:taskId", function(req, res) {
    const id = req.params.listId;
    const taskId = req.params.taskId;
    res.send(jsonTasks.filter(x => x.listId === id && x.id === taskId))
})
app.post("/lists/:listId/tasks", urlencodedParser, function(req, res, err) {
    const data = {
        "id": req.body.id,
        "listId": req.body.listId,
        "createdAt": new Date(),
        "title": req.body.title,
        "desc": req.body.desc,
        "order": req.body.order
    }
    jsonTasks.push(data)
    res.send("Thêm thành công!")
})

app.post("/lists/:listId/tasks/:taskId", urlencodedParser, function(req, res, err) {
    const taskId = req.params.taskId;
    const listId = req.params.listId;
    const data = {
        id: taskId,
        listId: listId,
        createdAt: new Date(),
        title: req.body.title,
        desc: req.body.desc,
        order: req.body.order
    }
    jsonTasks = jsonTasks.map(item => (item.id === taskId) ? data : item)
    res.send("Sửa thành công!")
})
app.delete("/lists/:listId/tasks/:taskId", function(req, res) {
    const taskId = req.params.taskId;
    jsonTasks = jsonTasks.filter(z => z.id === taskId)
    res.send("Xóa thành công!")
})





app.listen(port, () => {
        console.log("Server live in:", port)
    })
    // arr = [
    //     { id: 1, name: "ádf" },
    //     { id: 2, name: "hjlhj" },
    // ]

// arr.map(item => item.id === id ? itemMoi : item)