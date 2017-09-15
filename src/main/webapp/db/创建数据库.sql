----------------------------------------------------
-- Spring (4.3.9) + mybatis (3.4.4) + Oracle 11g  --
-- 工厂框架基本表                                                                                                --
-- Created by SONG on 2017-07-21 16:21:21         --
----------------------------------------------------

create table SYS_CODES
(
  ID        NUMBER(6) not null,
  PARENT_ID NUMBER(6),
  CODE_ID   VARCHAR2(20),
  NAME      VARCHAR2(50),
  STATUS    VARCHAR2(20),
  DEF_VALUE VARCHAR2(20),
  DESCN     VARCHAR2(400)
)
;
comment on table SYS_CODES
  is '基础代码表';
comment on column SYS_CODES.ID
  is '基础代码表序号，主键';
comment on column SYS_CODES.PARENT_ID
  is '父级序号';
comment on column SYS_CODES.CODE_ID
  is '代码编号';
comment on column SYS_CODES.NAME
  is '代码名称';
comment on column SYS_CODES.STATUS
  is '状态';
comment on column SYS_CODES.DEF_VALUE
  is '默认值';
comment on column SYS_CODES.DESCN
  is '说明';
alter table SYS_CODES
  add constraint PK_SYS_CODES primary key (ID);
alter table SYS_CODES
  add constraint FK_SYS_CODE foreign key (PARENT_ID)
  references SYS_CODES (ID);


create table SYS_LOGS
(
  ID       NUMBER(6) not null,
  LOGIN_ID VARCHAR2(50),
  PRIORITY VARCHAR2(200),
  LOG_DATE DATE,
  CLASS    VARCHAR2(200),
  METHOD   VARCHAR2(200),
  MSG      VARCHAR2(400)
)
;
comment on table SYS_LOGS
  is '日志信息';
comment on column SYS_LOGS.ID
  is '日志序号，主键';
comment on column SYS_LOGS.LOGIN_ID
  is '登陆编号';
comment on column SYS_LOGS.PRIORITY
  is '日志级别';
comment on column SYS_LOGS.LOG_DATE
  is '日志记录时间';
comment on column SYS_LOGS.CLASS
  is '用于写日志的类的名称';
comment on column SYS_LOGS.METHOD
  is '被记录到日志中的方法名';
comment on column SYS_LOGS.MSG
  is '日志详细信息';
alter table SYS_LOGS
  add constraint PK_SYS_LOGS primary key (ID);


create table SYS_MENUS
(
  ID        NUMBER(6) not null,
  PARENT_ID NUMBER(6),
  SEQ       NUMBER(6),
  NAME      VARCHAR2(50),
  DESCN     VARCHAR2(400),
  LINK_URL  VARCHAR2(200),
  STATUS    VARCHAR2(20)
)
;
comment on table SYS_MENUS
  is '菜单信息';
comment on column SYS_MENUS.ID
  is '菜单序号，主键';
comment on column SYS_MENUS.PARENT_ID
  is '父级序号';
comment on column SYS_MENUS.SEQ
  is '菜单排序';
comment on column SYS_MENUS.NAME
  is '菜单名称';
comment on column SYS_MENUS.DESCN
  is '菜单说明';
comment on column SYS_MENUS.LINK_URL
  is '链接地址';
comment on column SYS_MENUS.STATUS
  is '是否可用';
alter table SYS_MENUS
  add constraint PK_SYS_MENUS primary key (ID);
alter table SYS_MENUS
  add constraint FK_SYS_MENUS_1 foreign key (PARENT_ID)
  references SYS_MENUS (ID);


create table SYS_ROLES
(
  ID    NUMBER(6) not null,
  NAME  VARCHAR2(50),
  CODE  VARCHAR2(50),
  DESCN VARCHAR2(400)
)
;
comment on table SYS_ROLES
  is '角色信息';
comment on column SYS_ROLES.ID
  is '用户序号，主键';
comment on column SYS_ROLES.NAME
  is '角色名称';
comment on column SYS_ROLES.CODE
  is '角色编号';
comment on column SYS_ROLES.DESCN
  is '角色说明';
alter table SYS_ROLES
  add constraint PK_SYS_ROLES primary key (ID);


create table SYS_MENU_ROLE
(
  MENU_ID NUMBER(6),
  ROLE_ID NUMBER(6)
)
;
comment on table SYS_MENU_ROLE
  is '菜单角色对应表';
comment on column SYS_MENU_ROLE.MENU_ID
  is '菜单编号';
comment on column SYS_MENU_ROLE.ROLE_ID
  is '角色编号';
alter table SYS_MENU_ROLE
  add constraint FK_SYS_MENUS_2 foreign key (MENU_ID)
  references SYS_MENUS (ID);
alter table SYS_MENU_ROLE
  add constraint FK_SYS_ROLES_1 foreign key (ROLE_ID)
  references SYS_ROLES (ID);

create table SYS_USERS
(
  ID         NUMBER(6) not null,
  USERNAME   VARCHAR2(50) not null,
  PASSWORD   VARCHAR2(50) not null,
  STATUS     VARCHAR2(20),
  PHOTO_PATH VARCHAR2(200)
)
;
comment on table SYS_USERS
  is '系统用户信息';
comment on column SYS_USERS.ID
  is '系统用户序号，主键';
comment on column SYS_USERS.USERNAME
  is '用户登录编号';
comment on column SYS_USERS.PASSWORD
  is '用户密码';
comment on column SYS_USERS.STATUS
  is '用户状态，对应代码表的CODE_ID字段';
comment on column SYS_USERS.PHOTO_PATH
  is '用户照片路径';
alter table SYS_USERS
  add constraint PK_SYS_USERS primary key (ID);


create table SYS_USER_ROLE
(
  USER_ID NUMBER(6),
  ROLE_ID NUMBER(6)
)
;
comment on table SYS_USER_ROLE
  is '用户角色对应表';
comment on column SYS_USER_ROLE.USER_ID
  is '用户编号';
comment on column SYS_USER_ROLE.ROLE_ID
  is '角色编号';
alter table SYS_USER_ROLE
  add constraint FK_SYS_ROLES_2 foreign key (ROLE_ID)
  references SYS_ROLES (ID);
alter table SYS_USER_ROLE
  add constraint FK_SYS_USERS foreign key (USER_ID)
  references SYS_USERS (ID);


create sequence SEQ_SYS_CODES
minvalue 1
maxvalue 999999
start with 2
increment by 1
nocache
order;


create sequence SEQ_SYS_LOGS
minvalue 1
maxvalue 999999
start with 2
increment by 1
nocache
order;


create sequence SEQ_SYS_MENUS
minvalue 1
maxvalue 999999
start with 29
increment by 1
nocache
order;


create sequence SEQ_SYS_ROLES
minvalue 1
maxvalue 999999
start with 29
increment by 1
nocache
order;


create sequence SEQ_SYS_USERS
minvalue 1
maxvalue 999999
start with 8
increment by 1
nocache
order;

create sequence SEQ_EMP
minvalue 8000
maxvalue 9999
start with 8000
increment by 1
nocache
order;

create sequence SEQ_DEPT
minvalue 50
maxvalue 99
start with 50
increment by 1
nocache
order;


