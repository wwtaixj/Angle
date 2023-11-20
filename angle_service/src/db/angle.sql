/*
 Navicat Premium Data Transfer

 Source Server         : 192.168.31.137(本地)
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : 192.168.31.137:3306
 Source Schema         : angle

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 19/11/2023 01:38:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for api_permissions
-- ----------------------------
DROP TABLE IF EXISTS `api_permissions`;
CREATE TABLE `api_permissions`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `apiName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `apiType` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE COMMENT 'id',
  UNIQUE INDEX `code`(`code`) USING BTREE COMMENT 'code'
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of api_permissions
-- ----------------------------
INSERT INTO `api_permissions` VALUES (1, '/api/v1/user', '2023-04-20 13:32:47', '2023-04-20 14:13:44', 'user_post', 'post');
INSERT INTO `api_permissions` VALUES (2, '/api/v1/login', '2023-04-20 14:04:24', '2023-04-20 14:07:56', 'login', 'post');
INSERT INTO `api_permissions` VALUES (4, '/api/v1/user', '2023-04-20 14:10:21', '2023-04-20 14:10:21', 'user_get', 'get');
INSERT INTO `api_permissions` VALUES (5, '/api/v1/user', '2023-04-20 14:10:39', '2023-04-20 14:10:39', 'user_put', 'put');
INSERT INTO `api_permissions` VALUES (6, '/api/v1/user/changePassword', '2023-04-20 14:11:11', '2023-04-20 14:11:11', 'change_password', 'put');
INSERT INTO `api_permissions` VALUES (7, '/api/v1/user', '2023-04-20 14:11:37', '2023-04-20 14:11:37', 'user_delete', 'delete');
INSERT INTO `api_permissions` VALUES (8, '/api/config', '2023-04-24 23:16:49', '2023-04-24 23:21:01', 'chat_cofig', 'post');
INSERT INTO `api_permissions` VALUES (9, '/api/chat-process', '2023-04-24 23:16:49', '2023-04-24 23:21:06', 'chat_process', 'post');
INSERT INTO `api_permissions` VALUES (10, '/api/session', '2023-04-24 23:16:49', '2023-04-24 23:21:11', 'chat_session', 'post');
INSERT INTO `api_permissions` VALUES (11, '/api/verify', '2023-04-24 23:16:49', '2023-04-24 23:21:15', 'chat_verify', 'post');
INSERT INTO `api_permissions` VALUES (12, '/api/v1/uploadPhoto', '2023-04-26 18:45:07', '2023-04-26 18:45:22', 'upload_photo', 'post');

-- ----------------------------
-- Table structure for location
-- ----------------------------
DROP TABLE IF EXISTS `location`;
CREATE TABLE `location`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `longitude` decimal(9, 6) NULL DEFAULT NULL,
  `latitude` decimal(9, 6) NULL DEFAULT NULL,
  `loginTime` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `userId` int(0) NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 260 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of location
-- ----------------------------
INSERT INTO `location` VALUES (8, -123.438353, 39.550019, '2023-04-26 09:43:47', NULL, 'admin');
INSERT INTO `location` VALUES (9, -123.438353, 39.550019, '2023-04-26 09:43:47', NULL, 'admin');
INSERT INTO `location` VALUES (10, -123.438353, 39.550019, '2023-04-26 09:43:47', NULL, 'admin');
INSERT INTO `location` VALUES (11, -123.438353, 39.550019, '2023-04-26 09:54:02', NULL, 'admin');
INSERT INTO `location` VALUES (12, -123.438353, 39.550019, '2023-04-26 09:54:02', NULL, 'admin');
INSERT INTO `location` VALUES (13, -123.438353, 39.550019, '2023-04-26 09:55:12', NULL, 'admin');
INSERT INTO `location` VALUES (14, -123.438353, 39.550019, '2023-04-26 09:55:47', NULL, 'admin');
INSERT INTO `location` VALUES (15, -123.438353, 39.550019, '2023-04-26 09:57:09', NULL, 'admin');
INSERT INTO `location` VALUES (16, -123.438353, 39.550019, '2023-04-26 09:57:45', NULL, 'admin');
INSERT INTO `location` VALUES (17, -123.438353, 39.550019, '2023-04-26 09:57:45', NULL, 'admin');
INSERT INTO `location` VALUES (18, -123.438353, 39.550019, '2023-04-26 09:57:45', NULL, 'admin');
INSERT INTO `location` VALUES (19, -123.438353, 39.550019, '2023-04-26 09:57:45', NULL, 'admin');
INSERT INTO `location` VALUES (20, -123.438353, 39.550019, '2023-04-26 09:57:45', NULL, 'admin');
INSERT INTO `location` VALUES (21, -123.438353, 39.550019, '2023-04-26 17:57:45', NULL, 'admin');
INSERT INTO `location` VALUES (22, -123.438353, 39.550019, '2023-04-26 17:57:45', NULL, 'admin');
INSERT INTO `location` VALUES (23, -123.438353, 39.550019, '2023-04-26 18:02:05', NULL, 'admin');
INSERT INTO `location` VALUES (24, -123.438353, 39.550019, '2023-04-26 09:57:45', NULL, 'admin');
INSERT INTO `location` VALUES (25, -123.438353, 39.550019, '2023-04-26 09:57:45', NULL, 'admin');
INSERT INTO `location` VALUES (26, -123.438353, 39.550019, '2023-04-26 11:30:50', NULL, 'admin');
INSERT INTO `location` VALUES (27, -123.438353, 39.550019, '2023-04-26 15:43:48', NULL, 'admin');
INSERT INTO `location` VALUES (28, -123.438353, 39.550019, '2023-04-26 15:45:37', NULL, 'admin');
INSERT INTO `location` VALUES (29, -123.438353, 39.550019, '2023-04-26 15:53:04', NULL, 'admin');
INSERT INTO `location` VALUES (30, -123.438353, 39.550019, '2023-04-26 15:14:10', NULL, 'admin');
INSERT INTO `location` VALUES (31, -123.438353, 39.550019, '2023-04-26 16:22:02', NULL, 'admin');
INSERT INTO `location` VALUES (32, -123.438353, 39.550019, '2023-04-26 16:33:04', NULL, 'admin');
INSERT INTO `location` VALUES (33, NULL, NULL, '2023-04-27 03:47:50', NULL, 'admin');
INSERT INTO `location` VALUES (34, -123.438353, 39.550019, '2023-04-26 17:57:45', NULL, 'admin');
INSERT INTO `location` VALUES (35, NULL, NULL, '2023-04-27 04:42:14', NULL, 'admin');
INSERT INTO `location` VALUES (36, NULL, NULL, '2023-04-27 06:01:39', NULL, 'admin');
INSERT INTO `location` VALUES (37, NULL, NULL, '2023-04-27 06:57:58', NULL, 'admin');
INSERT INTO `location` VALUES (38, -123.438353, 39.550019, '2023-04-27 07:28:32', NULL, 'admin');
INSERT INTO `location` VALUES (39, -123.438353, 39.550019, '2023-04-27 07:38:15', NULL, 'admin');
INSERT INTO `location` VALUES (40, 0.000000, 0.000000, '2023-04-27 09:12:20', NULL, 'admin');
INSERT INTO `location` VALUES (41, 0.000000, 0.000000, '2023-04-27 13:42:38', NULL, 'admin');
INSERT INTO `location` VALUES (42, -123.438353, 39.550019, '2023-04-27 13:43:35', NULL, 'admin');
INSERT INTO `location` VALUES (43, 0.000000, 0.000000, '2023-04-27 13:55:58', NULL, 'admin');
INSERT INTO `location` VALUES (44, 0.000000, 0.000000, '2023-04-27 13:56:04', NULL, 'admin');
INSERT INTO `location` VALUES (45, 0.000000, 0.000000, '2023-04-27 13:56:14', NULL, 'admin');
INSERT INTO `location` VALUES (46, 0.000000, 0.000000, '2023-04-27 15:25:41', NULL, 'admin');
INSERT INTO `location` VALUES (47, 0.000000, 0.000000, '2023-04-27 15:26:37', NULL, 'admin');
INSERT INTO `location` VALUES (48, 0.000000, 0.000000, '2023-04-27 15:29:25', NULL, 'admin');
INSERT INTO `location` VALUES (49, NULL, NULL, '2023-05-10 06:27:52', NULL, 'admin');
INSERT INTO `location` VALUES (50, 0.000000, 0.000000, '2023-05-10 06:34:36', NULL, 'admin');
INSERT INTO `location` VALUES (51, NULL, NULL, '2023-05-19 01:35:12', NULL, 'admin');
INSERT INTO `location` VALUES (52, NULL, NULL, '2023-05-24 02:30:09', NULL, 'admin');
INSERT INTO `location` VALUES (53, NULL, NULL, '2023-05-24 02:30:30', NULL, 'admin');
INSERT INTO `location` VALUES (54, NULL, NULL, '2023-05-24 02:31:25', NULL, 'admin');
INSERT INTO `location` VALUES (55, NULL, NULL, '2023-05-24 02:32:26', NULL, 'admin');
INSERT INTO `location` VALUES (56, NULL, NULL, '2023-05-24 02:32:35', NULL, 'admin');
INSERT INTO `location` VALUES (57, 0.000000, 0.000000, '2023-05-24 02:33:05', NULL, 'admin');
INSERT INTO `location` VALUES (58, NULL, NULL, '2023-05-24 02:34:41', NULL, 'admin');
INSERT INTO `location` VALUES (59, 0.000000, 0.000000, '2023-05-24 03:13:17', NULL, 'admin');
INSERT INTO `location` VALUES (60, NULL, NULL, '2023-06-01 14:44:16', NULL, 'admin');
INSERT INTO `location` VALUES (61, NULL, NULL, '2023-06-02 01:54:22', NULL, 'admin');
INSERT INTO `location` VALUES (62, NULL, NULL, '2023-06-06 07:59:17', NULL, 'admin');
INSERT INTO `location` VALUES (63, NULL, NULL, '2023-06-08 07:28:15', NULL, 'admin');
INSERT INTO `location` VALUES (64, NULL, NULL, '2023-06-10 02:32:08', NULL, 'admin');
INSERT INTO `location` VALUES (65, NULL, NULL, '2023-06-10 09:49:41', NULL, 'admin');
INSERT INTO `location` VALUES (66, NULL, NULL, '2023-06-12 01:34:07', NULL, 'admin');
INSERT INTO `location` VALUES (67, NULL, NULL, '2023-06-12 01:34:18', NULL, 'admin');
INSERT INTO `location` VALUES (68, NULL, NULL, '2023-06-14 06:18:53', NULL, 'admin');
INSERT INTO `location` VALUES (69, 0.000000, 0.000000, '2023-07-16 03:21:00', NULL, 'admin');
INSERT INTO `location` VALUES (70, 0.000000, 0.000000, '2023-10-03 12:27:50', NULL, 'admin');
INSERT INTO `location` VALUES (71, NULL, NULL, '2023-10-03 12:33:53', NULL, 'admin');
INSERT INTO `location` VALUES (72, 0.000000, 0.000000, '2023-10-18 01:32:44', NULL, 'admin');
INSERT INTO `location` VALUES (73, NULL, NULL, '2023-10-18 01:35:00', NULL, 'admin');
INSERT INTO `location` VALUES (74, NULL, NULL, '2023-10-19 03:03:24', NULL, 'admin');
INSERT INTO `location` VALUES (75, NULL, NULL, '2023-10-19 03:03:42', NULL, 'admin');
INSERT INTO `location` VALUES (76, 0.000000, 0.000000, '2023-10-19 09:00:59', NULL, 'admin');
INSERT INTO `location` VALUES (77, 0.000000, 0.000000, '2023-10-19 09:02:34', NULL, 'admin');
INSERT INTO `location` VALUES (78, 0.000000, 0.000000, '2023-10-19 09:15:16', NULL, 'admin');
INSERT INTO `location` VALUES (79, 0.000000, 0.000000, '2023-10-19 09:20:13', NULL, 'admin');
INSERT INTO `location` VALUES (80, 0.000000, 0.000000, '2023-10-25 05:44:23', NULL, 'admin');
INSERT INTO `location` VALUES (81, 0.000000, 0.000000, '2023-10-25 05:44:32', NULL, 'admin');
INSERT INTO `location` VALUES (82, 0.000000, 0.000000, '2023-10-25 05:44:43', NULL, 'admin');
INSERT INTO `location` VALUES (83, 0.000000, 0.000000, '2023-10-25 05:45:52', NULL, 'admin');
INSERT INTO `location` VALUES (84, 0.000000, 0.000000, '2023-10-25 05:46:00', NULL, 'admin');
INSERT INTO `location` VALUES (85, 0.000000, 0.000000, '2023-10-25 06:26:55', NULL, 'admin');
INSERT INTO `location` VALUES (86, 0.000000, 0.000000, '2023-10-25 06:27:03', NULL, 'admin');
INSERT INTO `location` VALUES (87, 0.000000, 0.000000, '2023-10-25 06:27:14', NULL, 'admin');
INSERT INTO `location` VALUES (88, 0.000000, 0.000000, '2023-10-25 06:27:57', NULL, 'admin');
INSERT INTO `location` VALUES (89, NULL, NULL, '2023-10-25 06:28:58', NULL, 'admin');
INSERT INTO `location` VALUES (90, 0.000000, 0.000000, '2023-10-26 01:41:43', NULL, 'admin');
INSERT INTO `location` VALUES (91, NULL, NULL, '2023-10-26 01:57:03', NULL, '11');
INSERT INTO `location` VALUES (92, NULL, NULL, '2023-10-26 02:13:29', NULL, 'admin');
INSERT INTO `location` VALUES (93, 0.000000, 0.000000, '2023-10-26 07:25:33', NULL, 'admin');
INSERT INTO `location` VALUES (94, 0.000000, 0.000000, '2023-10-26 10:15:41', NULL, 'admin');
INSERT INTO `location` VALUES (95, 0.000000, 0.000000, '2023-10-27 01:31:27', NULL, 'admin');
INSERT INTO `location` VALUES (96, 0.000000, 0.000000, '2023-10-27 01:31:54', NULL, 'admin');
INSERT INTO `location` VALUES (97, 0.000000, 0.000000, '2023-10-27 01:32:02', NULL, 'admin');
INSERT INTO `location` VALUES (98, 0.000000, 0.000000, '2023-10-27 02:41:39', NULL, 'admin');
INSERT INTO `location` VALUES (99, 0.000000, 0.000000, '2023-10-27 08:26:07', NULL, 'admin');
INSERT INTO `location` VALUES (100, NULL, NULL, '2023-10-27 14:22:11', NULL, 'admin');
INSERT INTO `location` VALUES (101, NULL, NULL, '2023-10-30 02:17:25', NULL, 'admin');
INSERT INTO `location` VALUES (102, 0.000000, 0.000000, '2023-11-01 12:59:04', NULL, 'admin');
INSERT INTO `location` VALUES (103, 0.000000, 0.000000, '2023-11-01 12:59:10', NULL, 'admin');
INSERT INTO `location` VALUES (104, 0.000000, 0.000000, '2023-11-02 14:38:05', NULL, 'admin');
INSERT INTO `location` VALUES (105, 0.000000, 0.000000, '2023-11-03 02:05:47', NULL, 'admin');
INSERT INTO `location` VALUES (106, 0.000000, 0.000000, '2023-11-03 05:55:45', NULL, 'admin');
INSERT INTO `location` VALUES (107, NULL, NULL, '2023-11-03 06:15:50', NULL, 'admin');
INSERT INTO `location` VALUES (108, NULL, NULL, '2023-11-03 06:16:21', NULL, 'admin');
INSERT INTO `location` VALUES (109, NULL, NULL, '2023-11-03 06:41:21', NULL, 'admin');
INSERT INTO `location` VALUES (110, 0.000000, 0.000000, '2023-11-03 06:57:34', NULL, 'admin');
INSERT INTO `location` VALUES (111, 0.000000, 0.000000, '2023-11-03 08:05:41', NULL, 'admin');
INSERT INTO `location` VALUES (112, 0.000000, 0.000000, '2023-11-03 08:05:57', NULL, 'admin');
INSERT INTO `location` VALUES (113, 0.000000, 0.000000, '2023-11-03 08:17:01', NULL, 'admin');
INSERT INTO `location` VALUES (114, 0.000000, 0.000000, '2023-11-06 06:24:52', NULL, '');
INSERT INTO `location` VALUES (115, 0.000000, 0.000000, '2023-11-06 06:25:25', NULL, '');
INSERT INTO `location` VALUES (116, 0.000000, 0.000000, '2023-11-06 06:26:54', NULL, 'admin');
INSERT INTO `location` VALUES (117, 0.000000, 0.000000, '2023-11-06 06:27:15', NULL, '');
INSERT INTO `location` VALUES (118, 0.000000, 0.000000, '2023-11-06 06:28:34', NULL, '');
INSERT INTO `location` VALUES (119, 0.000000, 0.000000, '2023-11-06 06:28:46', NULL, '');
INSERT INTO `location` VALUES (120, 0.000000, 0.000000, '2023-11-06 06:34:23', NULL, '');
INSERT INTO `location` VALUES (121, 0.000000, 0.000000, '2023-11-06 06:36:16', NULL, 'admin');
INSERT INTO `location` VALUES (122, 0.000000, 0.000000, '2023-11-06 06:54:31', NULL, 'admi');
INSERT INTO `location` VALUES (123, 0.000000, 0.000000, '2023-11-06 06:54:33', NULL, 'admi');
INSERT INTO `location` VALUES (124, 0.000000, 0.000000, '2023-11-06 06:54:35', NULL, 'admi');
INSERT INTO `location` VALUES (125, 0.000000, 0.000000, '2023-11-06 06:54:46', NULL, 'admi');
INSERT INTO `location` VALUES (126, 0.000000, 0.000000, '2023-11-06 06:56:23', NULL, 'admi');
INSERT INTO `location` VALUES (127, 0.000000, 0.000000, '2023-11-06 06:56:45', NULL, 'admi');
INSERT INTO `location` VALUES (128, 0.000000, 0.000000, '2023-11-06 06:56:50', NULL, 'admi');
INSERT INTO `location` VALUES (129, 0.000000, 0.000000, '2023-11-06 06:58:09', NULL, 'admin');
INSERT INTO `location` VALUES (130, 0.000000, 0.000000, '2023-11-06 06:58:16', NULL, 'admin1');
INSERT INTO `location` VALUES (131, 0.000000, 0.000000, '2023-11-06 07:02:07', NULL, 'admin1');
INSERT INTO `location` VALUES (132, 0.000000, 0.000000, '2023-11-06 07:02:13', NULL, 'admin1');
INSERT INTO `location` VALUES (133, 0.000000, 0.000000, '2023-11-06 07:04:26', NULL, '111');
INSERT INTO `location` VALUES (134, 0.000000, 0.000000, '2023-11-06 07:05:26', NULL, '1111');
INSERT INTO `location` VALUES (135, 0.000000, 0.000000, '2023-11-06 07:05:49', NULL, 'admin');
INSERT INTO `location` VALUES (136, 0.000000, 0.000000, '2023-11-06 07:06:34', NULL, 'admin');
INSERT INTO `location` VALUES (137, 0.000000, 0.000000, '2023-11-06 07:06:36', NULL, 'admin');
INSERT INTO `location` VALUES (138, 0.000000, 0.000000, '2023-11-06 07:06:40', NULL, 'admin');
INSERT INTO `location` VALUES (139, 0.000000, 0.000000, '2023-11-06 07:11:40', NULL, 'admi');
INSERT INTO `location` VALUES (140, NULL, NULL, '2023-11-06 07:13:26', NULL, 'admin');
INSERT INTO `location` VALUES (141, 0.000000, 0.000000, '2023-11-06 07:18:55', NULL, 'admi');
INSERT INTO `location` VALUES (142, 0.000000, 0.000000, '2023-11-06 07:21:51', NULL, 'addd');
INSERT INTO `location` VALUES (143, 0.000000, 0.000000, '2023-11-06 07:22:56', NULL, 'aaaaaa');
INSERT INTO `location` VALUES (144, 0.000000, 0.000000, '2023-11-06 07:24:57', NULL, '1');
INSERT INTO `location` VALUES (145, 0.000000, 0.000000, '2023-11-06 07:24:59', NULL, '1');
INSERT INTO `location` VALUES (146, 0.000000, 0.000000, '2023-11-06 07:28:57', NULL, '1');
INSERT INTO `location` VALUES (147, 0.000000, 0.000000, '2023-11-06 07:29:10', NULL, '111');
INSERT INTO `location` VALUES (148, 0.000000, 0.000000, '2023-11-06 07:29:32', NULL, '1');
INSERT INTO `location` VALUES (149, 0.000000, 0.000000, '2023-11-06 07:29:49', NULL, '1');
INSERT INTO `location` VALUES (150, 0.000000, 0.000000, '2023-11-06 07:30:54', NULL, 'admin');
INSERT INTO `location` VALUES (151, 0.000000, 0.000000, '2023-11-06 07:33:05', NULL, 'admin');
INSERT INTO `location` VALUES (152, NULL, NULL, '2023-11-06 07:45:02', NULL, 'admin');
INSERT INTO `location` VALUES (153, 0.000000, 0.000000, '2023-11-06 08:12:23', NULL, 'admin');
INSERT INTO `location` VALUES (154, 0.000000, 0.000000, '2023-11-08 02:16:43', NULL, 'admin');
INSERT INTO `location` VALUES (155, 0.000000, 0.000000, '2023-11-08 02:16:53', NULL, 'admin');
INSERT INTO `location` VALUES (156, 0.000000, 0.000000, '2023-11-08 05:52:50', NULL, 'ad');
INSERT INTO `location` VALUES (157, 0.000000, 0.000000, '2023-11-08 05:53:05', NULL, 'admin');
INSERT INTO `location` VALUES (158, 0.000000, 0.000000, '2023-11-08 05:53:20', NULL, 'admin');
INSERT INTO `location` VALUES (159, NULL, NULL, '2023-11-08 16:01:29', NULL, 'admin');
INSERT INTO `location` VALUES (160, 0.000000, 0.000000, '2023-11-09 02:32:24', NULL, 'admin');
INSERT INTO `location` VALUES (161, NULL, NULL, '2023-11-10 01:49:50', NULL, 'admin');
INSERT INTO `location` VALUES (162, 0.000000, 0.000000, '2023-11-10 01:50:01', NULL, 'admin');
INSERT INTO `location` VALUES (163, 0.000000, 0.000000, '2023-11-10 01:51:40', NULL, 'admin');
INSERT INTO `location` VALUES (164, 0.000000, 0.000000, '2023-11-10 02:24:24', NULL, 'admin');
INSERT INTO `location` VALUES (165, 0.000000, 0.000000, '2023-11-10 02:31:44', NULL, 'admin');
INSERT INTO `location` VALUES (166, 0.000000, 0.000000, '2023-11-10 08:37:48', NULL, 'admin');
INSERT INTO `location` VALUES (167, 0.000000, 0.000000, '2023-11-10 08:43:39', NULL, 'admin');
INSERT INTO `location` VALUES (168, 0.000000, 0.000000, '2023-11-10 08:51:29', NULL, 'admin');
INSERT INTO `location` VALUES (169, 0.000000, 0.000000, '2023-11-10 08:54:58', NULL, 'admin');
INSERT INTO `location` VALUES (170, 0.000000, 0.000000, '2023-11-10 09:01:31', NULL, 'admin');
INSERT INTO `location` VALUES (171, 0.000000, 0.000000, '2023-11-10 09:14:43', NULL, 'admin');
INSERT INTO `location` VALUES (172, 0.000000, 0.000000, '2023-11-10 10:01:38', NULL, 'admin');
INSERT INTO `location` VALUES (173, 0.000000, 0.000000, '2023-11-10 10:49:38', NULL, 'admin');
INSERT INTO `location` VALUES (174, 0.000000, 0.000000, '2023-11-11 07:08:40', NULL, 'admin');
INSERT INTO `location` VALUES (175, NULL, NULL, '2023-11-11 07:28:14', NULL, 'admin');
INSERT INTO `location` VALUES (176, NULL, NULL, '2023-11-11 07:28:44', NULL, 'admin');
INSERT INTO `location` VALUES (177, 0.000000, 0.000000, '2023-11-11 07:37:36', NULL, 'admin');
INSERT INTO `location` VALUES (178, 0.000000, 0.000000, '2023-11-11 07:37:47', NULL, 'admin');
INSERT INTO `location` VALUES (179, 0.000000, 0.000000, '2023-11-11 09:55:55', NULL, 'admin');
INSERT INTO `location` VALUES (180, 0.000000, 0.000000, '2023-11-11 09:56:03', NULL, 'admin');
INSERT INTO `location` VALUES (181, 0.000000, 0.000000, '2023-11-11 16:06:05', NULL, 'admin');
INSERT INTO `location` VALUES (182, 0.000000, 0.000000, '2023-11-11 17:38:02', NULL, 'admin');
INSERT INTO `location` VALUES (183, 0.000000, 0.000000, '2023-11-11 17:38:29', NULL, 'admin');
INSERT INTO `location` VALUES (184, 0.000000, 0.000000, '2023-11-11 17:38:47', NULL, 'admin');
INSERT INTO `location` VALUES (185, 0.000000, 0.000000, '2023-11-11 17:39:10', NULL, 'admin');
INSERT INTO `location` VALUES (186, 0.000000, 0.000000, '2023-11-11 17:39:54', NULL, 'admin');
INSERT INTO `location` VALUES (187, NULL, NULL, '2023-11-12 09:41:37', NULL, 'admin');
INSERT INTO `location` VALUES (188, NULL, NULL, '2023-11-12 09:47:41', NULL, 'admin');
INSERT INTO `location` VALUES (189, 0.000000, 0.000000, '2023-11-12 11:24:38', NULL, 'admin');
INSERT INTO `location` VALUES (190, NULL, NULL, '2023-11-12 12:26:50', NULL, 'admin');
INSERT INTO `location` VALUES (191, 0.000000, 0.000000, '2023-11-12 12:27:26', NULL, 'admin');
INSERT INTO `location` VALUES (192, 0.000000, 0.000000, '2023-11-12 14:54:35', NULL, 'admin');
INSERT INTO `location` VALUES (193, 0.000000, 0.000000, '2023-11-12 15:05:27', NULL, 'admin');
INSERT INTO `location` VALUES (194, 0.000000, 0.000000, '2023-11-12 15:49:05', NULL, 'admin');
INSERT INTO `location` VALUES (195, 0.000000, 0.000000, '2023-11-12 15:50:03', NULL, 'admin');
INSERT INTO `location` VALUES (196, 0.000000, 0.000000, '2023-11-12 15:50:46', NULL, 'admin');
INSERT INTO `location` VALUES (197, 0.000000, 0.000000, '2023-11-12 15:53:17', NULL, 'admin');
INSERT INTO `location` VALUES (198, 0.000000, 0.000000, '2023-11-12 15:54:14', NULL, 'admin');
INSERT INTO `location` VALUES (199, 0.000000, 0.000000, '2023-11-12 15:55:04', NULL, 'admin');
INSERT INTO `location` VALUES (200, 0.000000, 0.000000, '2023-11-12 15:57:05', NULL, 'admin');
INSERT INTO `location` VALUES (201, 0.000000, 0.000000, '2023-11-12 15:59:11', NULL, 'admin');
INSERT INTO `location` VALUES (202, 0.000000, 0.000000, '2023-11-12 16:03:02', NULL, 'admin');
INSERT INTO `location` VALUES (203, 0.000000, 0.000000, '2023-11-12 16:04:07', NULL, 'admin');
INSERT INTO `location` VALUES (204, 0.000000, 0.000000, '2023-11-12 16:06:12', NULL, 'admin');
INSERT INTO `location` VALUES (205, 0.000000, 0.000000, '2023-11-12 16:33:22', NULL, 'admin');
INSERT INTO `location` VALUES (206, 0.000000, 0.000000, '2023-11-12 16:51:54', NULL, 'admin');
INSERT INTO `location` VALUES (207, 0.000000, 0.000000, '2023-11-12 16:58:34', NULL, 'admin');
INSERT INTO `location` VALUES (208, 0.000000, 0.000000, '2023-11-12 16:59:57', NULL, 'admin');
INSERT INTO `location` VALUES (209, 0.000000, 0.000000, '2023-11-13 01:48:12', NULL, 'admin');
INSERT INTO `location` VALUES (210, 0.000000, 0.000000, '2023-11-13 01:51:43', NULL, 'admin');
INSERT INTO `location` VALUES (211, 0.000000, 0.000000, '2023-11-13 02:19:19', NULL, 'admin');
INSERT INTO `location` VALUES (212, 0.000000, 0.000000, '2023-11-13 02:31:15', NULL, '');
INSERT INTO `location` VALUES (213, 0.000000, 0.000000, '2023-11-13 10:46:45', NULL, 'admin');
INSERT INTO `location` VALUES (214, 0.000000, 0.000000, '2023-11-13 13:15:43', NULL, 'admin');
INSERT INTO `location` VALUES (215, 0.000000, 0.000000, '2023-11-13 14:52:46', NULL, 'admin');
INSERT INTO `location` VALUES (216, 0.000000, 0.000000, '2023-11-13 16:34:20', NULL, 'admin');
INSERT INTO `location` VALUES (217, 0.000000, 0.000000, '2023-11-14 01:35:39', NULL, 'admin');
INSERT INTO `location` VALUES (218, 0.000000, 0.000000, '2023-11-14 02:24:23', NULL, 'dd');
INSERT INTO `location` VALUES (219, NULL, NULL, '2023-11-14 07:50:40', NULL, 'admin');
INSERT INTO `location` VALUES (220, 0.000000, 0.000000, '2023-11-14 09:12:21', NULL, 'admin');
INSERT INTO `location` VALUES (221, NULL, NULL, '2023-11-14 09:46:41', NULL, 'admin');
INSERT INTO `location` VALUES (222, 0.000000, 0.000000, '2023-11-14 10:31:36', NULL, 'admin');
INSERT INTO `location` VALUES (223, 0.000000, 0.000000, '2023-11-14 10:32:44', NULL, 'admin');
INSERT INTO `location` VALUES (224, 0.000000, 0.000000, '2023-11-14 10:33:15', NULL, 'admin');
INSERT INTO `location` VALUES (225, 0.000000, 0.000000, '2023-11-14 10:33:18', NULL, 'admin');
INSERT INTO `location` VALUES (226, 0.000000, 0.000000, '2023-11-14 10:33:46', NULL, 'admin');
INSERT INTO `location` VALUES (227, 0.000000, 0.000000, '2023-11-14 10:36:37', NULL, 'admin');
INSERT INTO `location` VALUES (228, 0.000000, 0.000000, '2023-11-14 10:36:41', NULL, 'admin');
INSERT INTO `location` VALUES (229, 0.000000, 0.000000, '2023-11-14 10:36:44', NULL, 'admin');
INSERT INTO `location` VALUES (230, 0.000000, 0.000000, '2023-11-14 10:36:47', NULL, 'admin');
INSERT INTO `location` VALUES (231, 0.000000, 0.000000, '2023-11-14 10:43:02', NULL, 'admin');
INSERT INTO `location` VALUES (232, 0.000000, 0.000000, '2023-11-14 10:43:55', NULL, 'admin');
INSERT INTO `location` VALUES (233, 0.000000, 0.000000, '2023-11-15 01:32:34', NULL, 'admin');
INSERT INTO `location` VALUES (234, 0.000000, 0.000000, '2023-11-15 01:33:56', NULL, 'admin');
INSERT INTO `location` VALUES (235, 0.000000, 0.000000, '2023-11-15 01:39:39', NULL, 'admin');
INSERT INTO `location` VALUES (236, 0.000000, 0.000000, '2023-11-15 01:40:42', NULL, 'admin');
INSERT INTO `location` VALUES (237, NULL, NULL, '2023-11-15 02:49:21', NULL, 'admin');
INSERT INTO `location` VALUES (238, 0.000000, 0.000000, '2023-11-15 02:58:50', NULL, 'admin');
INSERT INTO `location` VALUES (239, 0.000000, 0.000000, '2023-11-15 03:07:58', NULL, 'admin');
INSERT INTO `location` VALUES (240, 0.000000, 0.000000, '2023-11-15 06:18:03', NULL, 'admin');
INSERT INTO `location` VALUES (241, 0.000000, 0.000000, '2023-11-15 08:46:01', NULL, 'admin');
INSERT INTO `location` VALUES (242, 0.000000, 0.000000, '2023-11-15 09:42:04', NULL, 'admin');
INSERT INTO `location` VALUES (243, 0.000000, 0.000000, '2023-11-15 10:00:49', NULL, 'admin');
INSERT INTO `location` VALUES (244, 0.000000, 0.000000, '2023-11-15 10:02:56', NULL, 'admin');
INSERT INTO `location` VALUES (245, 0.000000, 0.000000, '2023-11-15 10:05:06', NULL, 'admin');
INSERT INTO `location` VALUES (246, 0.000000, 0.000000, '2023-11-15 10:26:10', NULL, 'admin');
INSERT INTO `location` VALUES (247, 0.000000, 0.000000, '2023-11-15 10:35:16', NULL, 'admin');
INSERT INTO `location` VALUES (248, 0.000000, 0.000000, '2023-11-15 13:00:40', NULL, 'admin');
INSERT INTO `location` VALUES (249, 0.000000, 0.000000, '2023-11-15 13:23:20', NULL, 'admin');
INSERT INTO `location` VALUES (250, 0.000000, 0.000000, '2023-11-15 13:24:28', NULL, 'admin');
INSERT INTO `location` VALUES (251, 0.000000, 0.000000, '2023-11-16 01:43:37', NULL, 'admin');
INSERT INTO `location` VALUES (252, 0.000000, 0.000000, '2023-11-16 08:14:09', NULL, 'admin');
INSERT INTO `location` VALUES (253, 0.000000, 0.000000, '2023-11-16 08:15:14', NULL, 'admin');
INSERT INTO `location` VALUES (254, 0.000000, 0.000000, '2023-11-16 10:03:54', NULL, 'admin');
INSERT INTO `location` VALUES (255, 0.000000, 0.000000, '2023-11-17 14:35:30', NULL, 'admin');
INSERT INTO `location` VALUES (256, 0.000000, 0.000000, '2023-11-17 14:53:27', NULL, 'admin');
INSERT INTO `location` VALUES (257, 0.000000, 0.000000, '2023-11-17 14:54:02', NULL, 'admin');
INSERT INTO `location` VALUES (258, 0.000000, 0.000000, '2023-11-17 16:10:14', NULL, 'admin');
INSERT INTO `location` VALUES (259, NULL, NULL, '2023-11-18 11:39:42', NULL, 'admin');
INSERT INTO `location` VALUES (260, 0.000000, 0.000000, '2023-11-18 16:49:38', NULL, 'admin');
INSERT INTO `location` VALUES (261, 0.000000, 0.000000, '2023-11-18 16:50:48', NULL, 'admin');
INSERT INTO `location` VALUES (262, 0.000000, 0.000000, '2023-11-18 16:55:32', NULL, 'admin');
INSERT INTO `location` VALUES (263, 0.000000, 0.000000, '2023-11-18 17:06:54', NULL, 'admin');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateTime` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE COMMENT 'id',
  UNIQUE INDEX `name`(`name`) USING BTREE COMMENT 'name'
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'admin', '系统管理员', '2023-04-19 19:36:15', '2023-04-20 15:29:36');
INSERT INTO `roles` VALUES (2, 'editor', '编辑人员', '2023-04-19 19:36:15', '2023-04-20 15:29:38');
INSERT INTO `roles` VALUES (3, 'author', '作者', '2023-04-19 19:36:15', '2023-04-20 15:29:39');
INSERT INTO `roles` VALUES (4, 'viewer', '查看人员', '2023-04-19 19:36:15', '2023-04-20 15:29:40');

-- ----------------------------
-- Table structure for roles_relation_api_permissions
-- ----------------------------
DROP TABLE IF EXISTS `roles_relation_api_permissions`;
CREATE TABLE `roles_relation_api_permissions`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `roleId` int(0) NOT NULL,
  `apiPermissionId` int(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE,
  INDEX `fk_rrap_roles`(`roleId`) USING BTREE,
  INDEX `fk_rrap_api_permissions`(`apiPermissionId`) USING BTREE,
  CONSTRAINT `fk_rrap_api_permissions` FOREIGN KEY (`apiPermissionId`) REFERENCES `api_permissions` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_rrap_roles` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles_relation_api_permissions
-- ----------------------------
INSERT INTO `roles_relation_api_permissions` VALUES (1, 1, 1);
INSERT INTO `roles_relation_api_permissions` VALUES (2, 1, 2);
INSERT INTO `roles_relation_api_permissions` VALUES (3, 1, 4);
INSERT INTO `roles_relation_api_permissions` VALUES (4, 1, 5);
INSERT INTO `roles_relation_api_permissions` VALUES (5, 1, 6);
INSERT INTO `roles_relation_api_permissions` VALUES (6, 1, 7);
INSERT INTO `roles_relation_api_permissions` VALUES (7, 1, 8);
INSERT INTO `roles_relation_api_permissions` VALUES (8, 1, 9);
INSERT INTO `roles_relation_api_permissions` VALUES (9, 1, 10);
INSERT INTO `roles_relation_api_permissions` VALUES (10, 1, 11);
INSERT INTO `roles_relation_api_permissions` VALUES (11, 1, 12);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `avatarUrl` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `age` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `gender` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `tag` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `roleId` int(0) NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `createTime` datetime(6) NULL DEFAULT NULL,
  `updateTime` datetime(6) NULL DEFAULT NULL,
  `status` varchar(6) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  INDEX `fk_user_role`(`roleId`) USING BTREE,
  CONSTRAINT `fk_user_role` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (5, 'test', '13800138004', '123456', 'https://example.com/avatar5.png', '38', '0', 'A', 4, '761359511@qq.com', NULL, NULL, '1');
INSERT INTO `users` VALUES (6, 'admin', '15202302804', '999310', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F3a2f9e13-ac28-467f-8ccc-e024f5e81c0a%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1701583784&t=fce52630911f67f32d2dedbb4c698867', '24', '1', 'JX,WT', 1, '761359511@qq.com', NULL, NULL, '1');

SET FOREIGN_KEY_CHECKS = 1;
