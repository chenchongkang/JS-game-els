
var http = require('http');
        // ���������ѡ��
        var options = {
           host: 'localhost',
           port: '8081',
           path: '/eluosi12345.html'  
        };

        // ������Ӧ�Ļص�����
        var callback = function(response){
           // ���ϸ�������
           var body = '';
           response.on('data', function(data) {
              body += data;
           });

           response.on('end', function() {
              // ���ݽ������
              console.log(body);
           });
        }
        // �����˷�������

 function mytest(){
	var req = http.request(options, callback);
        req.end();
}
        