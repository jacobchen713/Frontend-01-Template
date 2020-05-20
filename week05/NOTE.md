## week 05

http rfc 2616

### HTTP Request
POST / HTTP/1.1
Host: 127.0.0.1
Content-Type:  application/x-www-form-urlencoded

param1=abc&param2=def


### HTTP Response
HTTP/1.1 200 OK
Content-Type: text/html
Date: Tue, 19 May 2020 10:27:11 GMT
Connection: keep-alive
Transfer-Encoding: chunked

26
<html><body> Hello World<body></html>
0
