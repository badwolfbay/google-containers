module.exports = function(content, file, opt){
	var filename=file.subpathNoExt.substring(file.subpathNoExt.indexOf("/tpl")+5);
    file.release=file.release.replace(".tpl",".js");
    file.rExt='.js';
    var tomd=require("tmodjs"); 
    var content=tomd(content,filename);
    // console.log(modObject);
	var output=content;
    return output;
};