    /*
 * fis
 * http://fis.baidu.com/
 */

'use strict';

module.exports = function (ret, conf, settings, opt) { //打包后处理
    if(opt.increment){
        //创建一个对象，存放处理后的配置项
        var channel=settings.channel||fis.config.get('project.sourcepath')[1];
        var path=fis.project.initDir(fis.project.getProjectPath()+"/"+channel+"version",'controle version');
        var increpath=fis.project.initDir(fis.project.getProjectPath()+"/"+channel+"newrelease",'controle version');
        fis.util.del(increpath);
        // var path=fis.project.initDir(fis.project.getProjectPath()+"/version",'controle version');
        var versionpath=path+"/version.json";
        var version=[];
        if(fis.util.exists(versionpath)){
            var version=fis.util.readJSON(versionpath);
            version[version.length]=parseInt(version[version.length-1])+1;
        }else{
            version[0]=1;
        }
        fis.util.write(versionpath,JSON.stringify(version,null,"\t"))
        var filelist={};
        fis.util.map(ret.src, function(subpath, file){
            var releasepath=file.getHashRelease();
            var hash=file.getHash();
            var releasfile=[releasepath,hash]
            filelist[file.getId()]=releasfile;
        });
        fis.util.write(path+"/V"+version[version.length-1]+".json",JSON.stringify(filelist,null,"\t"))
        if(version.length>1){
            var filelistMap={};
            var beforeVersion=0;
            if(parseInt(opt.increment)){
                beforeVersion=parseInt(opt.increment)
            }else{
                beforeVersion=version[version.length-2];
            }
            var beforeFileList=fis.util.readJSON(path+"/V"+beforeVersion+".json");   
            var _ = require('underscore');
            var upfile=_.difference(_.keys(filelist),_.keys(beforeFileList))
            var downfile=_.difference(_.keys(beforeFileList),_.keys(filelist));
            var unionfile=_.intersection(_.keys(beforeFileList),_.keys(filelist))
            var unionfile=_.filter(unionfile,function(num){
               // console.log(filelist[key]+"---"+num);
                //console.log(_.isEqual(filelist[key],num));
                if(_.isEqual(filelist[num],beforeFileList[num])){
                    return false;
                }
                return true;
            });
            filelistMap['addfile']=_.pick(filelist,upfile);
            filelistMap['subfile']=_.pick(beforeFileList,downfile)
            filelistMap['updatefile']=_.pick(filelist,unionfile);
            var modifyreq=true;
            fis.util.map(filelistMap['addfile'], function(subpath, file){
              var kk=ret.src["/"+subpath];
              if(file[0].indexOf('/test')!=0){
                 fis.util.write(increpath+file[0],kk.getContent());
              }
              if(modifyreq&&file[0].indexOf('component')>-1){
                 modifyreq=false;
              }
            });
             fis.util.map(filelistMap['updatefile'], function(subpath, file){
              var kk=ret.src["/"+subpath];
              if(file[0].indexOf('/test')!=0){
                 fis.util.write(increpath+file[0],kk.getContent());
              }
               if(modifyreq&&file[0].indexOf('component')>-1){
                 modifyreq=false;
              }
            });
            if(!modifyreq){
            	fis.util.write(increpath+"/appframe/kernel/require.js",ret.src["/ah_all_web_view/appframe/kernel/require.js"].getContent());	
            }
            // var kk=ret.ids['ah_boss_web_view/apps/serviceapps/s4622/js/s4622.js'];
            // console.log(increpath+kk.getHashRelease())
            fis.util.write(path+"/V"+version[version.length-1]+"---V"+beforeVersion+".json",JSON.stringify(filelistMap,null,"\t"))
        }
        
    }
};
