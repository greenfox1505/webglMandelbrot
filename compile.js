#!/usr/bin/env node
var fs = require("fs");
var frag = fs.readFileSync("frag.glsl").toString();
var vert = fs.readFileSync("vert.glsl").toString();

//todo add physics shader packer

//SOMEDAY, I'd like this to include a gui material editor. similar to what Unreal does. maybe.
var out = JSON.stringify({frag:frag,vert:vert});
out = "var shader = " + out
fs.writeFileSync("shader.js",out)