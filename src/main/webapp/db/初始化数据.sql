----------------------------------------------------
-- Spring (4.3.9) + mybatis (3.4.4) + Oracle 11g  --
-- 工厂框架基本表                                                                                                --
-- Created by SONG on 2017-07-21 16:21:21         --
----------------------------------------------------

insert into SYS_MENUS (id, parent_id, seq, name, descn, link_url, status)
values (1, null, 100, '系统管理', '系统管理', null, '1');
insert into SYS_MENUS (id, parent_id, seq, name, descn, link_url, status)
values (2, 1, 103, '菜单管理', '菜单管理', 'menulist.jsp', '1');
insert into SYS_MENUS (id, parent_id, seq, name, descn, link_url, status)
values (3, 1, 102, '角色管理', '角色管理', 'rolelist.jsp', '1');
insert into SYS_MENUS (id, parent_id, seq, name, descn, link_url, status)
values (4, 1, 101, '用户管理', '用户管理', 'userlist.jsp', '1');

insert into SYS_MENUS (id, parent_id, seq, name, descn, link_url, status)
values (5, null, 200, 'DEMO演示', 'DEMO演示', null, '1');
insert into SYS_MENUS (id, parent_id, seq, name, descn, link_url, status)
values (6, 5, 202, '雇员管理', '雇员管理', 'emplist.jsp', '1');
insert into SYS_MENUS (id, parent_id, seq, name, descn, link_url, status)
values (7, 5, 201, '部门管理', '部门管理', 'deptlist.jsp', '1');
commit;


insert into SYS_ROLES (id, name, code, descn)
values (15, '系统管理员', 'ROLE-001', '系统管理员');
commit;


insert into SYS_MENU_ROLE (menu_id, role_id)
values (1, 15);
insert into SYS_MENU_ROLE (menu_id, role_id)
values (2, 15);
insert into SYS_MENU_ROLE (menu_id, role_id)
values (3, 15);
insert into SYS_MENU_ROLE (menu_id, role_id)
values (4, 15);

insert into SYS_MENU_ROLE (menu_id, role_id)
values (5, 15);
insert into SYS_MENU_ROLE (menu_id, role_id)
values (6, 15);
insert into SYS_MENU_ROLE (menu_id, role_id)
values (7, 15);
commit;


insert into SYS_USERS (id, USERNAME, password, status, photo_path)
values (4, 'admin', '21232F297A5', '1', '20158146141441122374145.jpg');
commit;


insert into SYS_USER_ROLE (user_id, role_id)
values (4, 15);
commit;
