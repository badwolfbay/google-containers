/*
 * fis
 * http://fis.baidu.com/
 */

'use strict';

module.exports = function (ret, conf, settings, opt) { //打包后处理
  var channel=settings.channel;
  var projectroot;
  if(channel=="boss"){
    channel="ah_boss_web_view";
  }else if(channel=="echn"){
    channel="ah_echn_web_view";
  }
  if(!channel){
    channel=fis.config.get('project.sourcepath')[1];
    projectroot=fis.config.get('project.sourcepath')[0];
  }else{
    projectroot="ah_all_web_view";
  }
  fis.util.map(ret.src, function (id, file) {
    if(file.isHtmlLike){
        var content=file.getContent();
        content=content.replace(/<(appinner|scriptinner)([\s\S]*?)ref="(\S*)"([\s\S]*?)>[\s\S]*?<\/(\1)>/g, function(m, m1,m2,m3,m4,m5){
          var filepath=file.subdirname;
          filepath=filepath.replace(projectroot,channel);
          var innerid=filepath+"/inner/"+m3;
          var innerfile=ret.src[innerid];
          if(!!innerfile){
            if(m1=='scriptinner'){
              var innerpath=innerfile.getUrl(opt.hash, opt.domain);
              return '<script type="text/javascript" src="'+innerpath+'"></script>'
            }
            return innerfile.getContent();
          }
          return "";
        });
        file.setContent(content);
       
    }
  });
};
  