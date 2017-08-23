FROM centos:7

RUN yum -y install python python-devel gcc python-virtualenv curl
RUN curl -k http://gigaspaces-repository-eu.s3.amazonaws.com/org/cloudify3/get-cloudify.py -o get-cloudify.py
RUN curl -k https://bootstrap.pypa.io/get-pip.py -o get-pip.py
RUN python get-pip.py
RUN python get-cloudify.py