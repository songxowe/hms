
softfactory 框架结构说明书

softfactory -------------- 项目名(工程名)
  src/main/java ---------- Java 源码
    pojo ----------------- 实体类
    dao ------------------ 持久层(Mybaties)
        ------------------ 映射器接口
        ------------------ 映射文件
    service -------------- 业务逻辑层(Spring)
    controller ----------- 表示层(SpringMvc)
    util ----------------- 工具类  
    
  src/main/resources ----- 配置文件
      -------------------- Spring 配置文件
      -------------------- properties文件(jdbc/log4j)

  src/test/java ---------- JUnit 单元测试      
      
	src/main/webapp -------- Web App 
	  db ------------------- 数据库脚本
		commons -------------- 公共 jsp页面
		easyui --------------- easyui 所需的js/css/icons
		images --------------- 图片
		js ------------------- 自定义 js 文件
		WEB-INF
			lib ---------------- 工厂所需jar文件
		*.jsp

  reports ---------------- 日志报告
  target ----------------- 输出目标
  
  pom.xml ---------------- 项目对象管理 (依赖 jar 包) 		    
    
    
    
工厂框架的开发步骤:
01.执行 src/main/webapp/db/*.sql 数据库脚本
  tips:若无则建表/建序列/初始化数据
02.修改 src/main/resources/jdbc.properties 的Oracle实例/用户名/密码

03.pojo下新建实体类 Xxx.java
04.dao下新建映射器接口 XxxMapper.java / 映射文件XxxMapper.xml 

05.service下新建业务逻辑类 XxxService.java
  tips:数据库连接池/事务管理已配置 (applicationContext.xml)
06.src/test/java JUnit 单元测试 (spring + mybatis + oracle)   

07.controller下新建表示层 XxxController.java
  tips:SpringMVC配置文件 (applicationContext-mvc.xml)  
  
  测试URL:xxxController.do?page=1&rows=5&sort=xxx&order=asc
  
08.*.jsp 

09.设置用户 - 角色 - 菜单
    系统管理/菜单管理/新增菜单 
   系统管理/角色管理/设置角色菜单
   系统管理/用户管理/设置用户角色-授权

10.部署至 Web Server
  tips:web.xml

  

开发阶段部署(Exploded):
产品阶段部署(Packaged): *.war
  .jar - Java Classes [第三方 jar 包]
  .war - Web App
  .ear - 企业工程包 (.jar + .war)



作业:
 src/main/webapp/db/
  商品管理初始化脚本_ora.sql




