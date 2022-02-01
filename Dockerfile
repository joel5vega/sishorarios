FROM centos:7

RUN yum install httpd -y
COPY frontend-sishorarios/ /var/www/html
CMD apachectl -DFOREGROUND
