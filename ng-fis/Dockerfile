FROM centos:7
MAINTAINER duangh <duangh@si-tech.com.cn>
RUN curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -
RUN yum install -y nodejs
#RUN rpm -Uivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
RUN ["npm", "install", "-g", "fis"]
#RUN ["fis", "install", "fis-prepackager-app"]
RUN ["npm","install","-g","fis-optimizer-uglify-js"]
RUN ["npm", "install", "-g", "fis-postpackager-simple"]
RUN ["npm", "install", "-g", "fis-postpackager-requirejs"]
RUN ["npm", "install", "-g", "fis-postpackager-autoload"]
RUN ["npm", "install", "-g", "fis-postpackager-increment"]


RUN yum install -y epel-release
RUN yum install -y nginx
CMD ["nginx", "-g", "daemon off;"]