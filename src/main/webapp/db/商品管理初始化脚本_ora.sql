----------------------------------------------------
-- Export file for user SCOTT                     --
-- Created by SONG 2017-10-22                     --
----------------------------------------------------


create table CATEGORIES
(
  CATEGORY_ID    NUMBER(10) not null,
  CATEGORY_NAME  VARCHAR2(100) not null,
  CATEGORY_DESCN VARCHAR2(500)
)
;
alter table CATEGORIES
  add constraint PK_CATEGORIES primary key (CATEGORY_ID);


create table PRODUCTS
(
  PRODUCT_NO    VARCHAR2(10) not null,
  CATEGORY_ID   NUMBER(10) not null,
  PRODUCT_NAME  VARCHAR2(300) not null,
  PRODUCT_PRICE NUMBER(10,2) not null,
  PHOTO_PATH    VARCHAR2(100),
  PRODUCT_DESCN VARCHAR2(2000)
)
;
alter table PRODUCTS
  add constraint PK_PRODUCTS primary key (PRODUCT_NO);
alter table PRODUCTS
  add constraint FK_PRODUCTS_REFERENCE_CATEGORI foreign key (CATEGORY_ID)
  references CATEGORIES (CATEGORY_ID);


create table SUPPLIERS
(
  SUPPLY_NO    VARCHAR2(10) not null,
  SUPPLY_NAME  VARCHAR2(200) not null,
  SUPPLY_DESCN VARCHAR2(400)
)
;
alter table SUPPLIERS
  add constraint PK_SUPPLIERS primary key (SUPPLY_NO);


create table PRODUCT_SUPPLY
(
  SUPPLY_NO  VARCHAR2(10),
  PRODUCT_NO VARCHAR2(10)
)
;
alter table PRODUCT_SUPPLY
  add constraint FK_PRODUCT__REFERENCE_PRODUCTS foreign key (PRODUCT_NO)
  references PRODUCTS (PRODUCT_NO);
alter table PRODUCT_SUPPLY
  add constraint FK_PRODUCT__REFERENCE_SUPPLIER foreign key (SUPPLY_NO)
  references SUPPLIERS (SUPPLY_NO);


create sequence SEQ_CATEGORY
minvalue 1
maxvalue 99999
start with 4
increment by 1
nocache
order;




------------------------初始化数据------------------

insert into CATEGORIES (CATEGORY_ID, CATEGORY_NAME, CATEGORY_DESCN)
values (1, '笔记本', null);
insert into CATEGORIES (CATEGORY_ID, CATEGORY_NAME, CATEGORY_DESCN)
values (2, '台式机', null);
insert into CATEGORIES (CATEGORY_ID, CATEGORY_NAME, CATEGORY_DESCN)
values (3, '数码相机', null);
commit;

insert into PRODUCTS (PRODUCT_NO, CATEGORY_ID, PRODUCT_NAME, PRODUCT_PRICE, PHOTO_PATH, PRODUCT_DESCN)
values ('0001', 3, '三星 NV3', 1899, null, null);
insert into PRODUCTS (PRODUCT_NO, CATEGORY_ID, PRODUCT_NAME, PRODUCT_PRICE, PHOTO_PATH, PRODUCT_DESCN)
values ('0002', 2, '联想 锋行A6040 P4 2.8HT 512120pV(W)', 4000, null, null);
insert into PRODUCTS (PRODUCT_NO, CATEGORY_ID, PRODUCT_NAME, PRODUCT_PRICE, PHOTO_PATH, PRODUCT_DESCN)
values ('0003', 1, '华硕 A8Js', 6000, null, null);
insert into PRODUCTS (PRODUCT_NO, CATEGORY_ID, PRODUCT_NAME, PRODUCT_PRICE, PHOTO_PATH, PRODUCT_DESCN)
values ('0004', 1, '惠普 Compaq Presario', 6999, null, null);
insert into PRODUCTS (PRODUCT_NO, CATEGORY_ID, PRODUCT_NAME, PRODUCT_PRICE, PHOTO_PATH, PRODUCT_DESCN)
values ('0005', 3, '柯达Z712', 2060, null, null);
insert into PRODUCTS (PRODUCT_NO, CATEGORY_ID, PRODUCT_NAME, PRODUCT_PRICE, PHOTO_PATH, PRODUCT_DESCN)
values ('0006', 3, '索尼 T200', 3180, null, null);
insert into PRODUCTS (PRODUCT_NO, CATEGORY_ID, PRODUCT_NAME, PRODUCT_PRICE, PHOTO_PATH, PRODUCT_DESCN)
values ('0007', 3, '富士 S6500', 2680, null, null);
insert into PRODUCTS (PRODUCT_NO, CATEGORY_ID, PRODUCT_NAME, PRODUCT_PRICE, PHOTO_PATH, PRODUCT_DESCN)
values ('0008', 1, '惠普 Compaq Presario V3414TX(GP259PA)', 6550, null, null);
insert into PRODUCTS (PRODUCT_NO, CATEGORY_ID, PRODUCT_NAME, PRODUCT_PRICE, PHOTO_PATH, PRODUCT_DESCN)
values ('0009', 1, '神舟 优雅T500N', 6998, null, null);
insert into PRODUCTS (PRODUCT_NO, CATEGORY_ID, PRODUCT_NAME, PRODUCT_PRICE, PHOTO_PATH, PRODUCT_DESCN)
values ('0010', 1, '戴尔 Inspiron 1420(Q510802)', 6999, null, null);
insert into PRODUCTS (PRODUCT_NO, CATEGORY_ID, PRODUCT_NAME, PRODUCT_PRICE, PHOTO_PATH, PRODUCT_DESCN)
values ('0011', 1, '三星 R25-X008', 7488, null, null);
insert into PRODUCTS (PRODUCT_NO, CATEGORY_ID, PRODUCT_NAME, PRODUCT_PRICE, PHOTO_PATH, PRODUCT_DESCN)
values ('0012', 2, '戴尔 EC280(Q210506EM)', 2598, null, null);
insert into PRODUCTS (PRODUCT_NO, CATEGORY_ID, PRODUCT_NAME, PRODUCT_PRICE, PHOTO_PATH, PRODUCT_DESCN)
values ('0013', 2, 'TCL SHE8533', 5198, null, null);
commit;

insert into SUPPLIERS (SUPPLY_NO, SUPPLY_NAME, SUPPLY_DESCN)
values ('S0001', '湖南时运电脑', '专做品牌');
insert into SUPPLIERS (SUPPLY_NO, SUPPLY_NAME, SUPPLY_DESCN)
values ('S0002', '湖南新浪潮', '硬件批发');
insert into SUPPLIERS (SUPPLY_NO, SUPPLY_NAME, SUPPLY_DESCN)
values ('S0003', '湖南蓝威电脑', '兼容机及品牌机');
insert into SUPPLIERS (SUPPLY_NO, SUPPLY_NAME, SUPPLY_DESCN)
values ('S0004', '联众达电脑', '兼容机及品牌机');
insert into SUPPLIERS (SUPPLY_NO, SUPPLY_NAME, SUPPLY_DESCN)
values ('S0005', '锐新公司', '硬件批发');
commit;


insert into PRODUCT_SUPPLY (SUPPLY_NO, PRODUCT_NO)
values ('S0001', '0002');
insert into PRODUCT_SUPPLY (SUPPLY_NO, PRODUCT_NO)
values ('S0001', '0003');
insert into PRODUCT_SUPPLY (SUPPLY_NO, PRODUCT_NO)
values ('S0001', '0004');
insert into PRODUCT_SUPPLY (SUPPLY_NO, PRODUCT_NO)
values ('S0002', '0005');
insert into PRODUCT_SUPPLY (SUPPLY_NO, PRODUCT_NO)
values ('S0002', '0006');
insert into PRODUCT_SUPPLY (SUPPLY_NO, PRODUCT_NO)
values ('S0002', '0007');
insert into PRODUCT_SUPPLY (SUPPLY_NO, PRODUCT_NO)
values ('S0003', '0008');
insert into PRODUCT_SUPPLY (SUPPLY_NO, PRODUCT_NO)
values ('S0004', '0009');
insert into PRODUCT_SUPPLY (SUPPLY_NO, PRODUCT_NO)
values ('S0005', '0010');
insert into PRODUCT_SUPPLY (SUPPLY_NO, PRODUCT_NO)
values ('S0005', '0011');
insert into PRODUCT_SUPPLY (SUPPLY_NO, PRODUCT_NO)
values ('S0002', '0012');
insert into PRODUCT_SUPPLY (SUPPLY_NO, PRODUCT_NO)
values ('S0004', '0013');
commit;
