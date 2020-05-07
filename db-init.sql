-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               8.0.19 - MySQL Community Server - GPL
-- Операционная система:         Win64
-- HeidiSQL Версия:              11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Дамп структуры базы данных developer_test
CREATE DATABASE IF NOT EXISTS `developer_test` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `developer_test`;

-- Дамп структуры для таблица developer_test.dependency
CREATE TABLE IF NOT EXISTS `dependency` (
  `id_user` int NOT NULL,
  `id_repo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Дамп данных таблицы developer_test.dependency: ~10 rows (приблизительно)
/*!40000 ALTER TABLE `dependency` DISABLE KEYS */;
INSERT INTO `dependency` (`id_user`, `id_repo`) VALUES
	(81, 23),
	(81, 24),
	(85, 1),
	(85, 24),
	(85, 22),
	(85, 23),
	(81, 31),
	(81, 32),
	(107, 46),
	(81, 1);
/*!40000 ALTER TABLE `dependency` ENABLE KEYS */;

-- Дамп структуры для таблица developer_test.user_login
CREATE TABLE IF NOT EXISTS `user_login` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `login` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Дамп данных таблицы developer_test.user_login: ~2 rows (приблизительно)
/*!40000 ALTER TABLE `user_login` DISABLE KEYS */;
INSERT INTO `user_login` (`user_id`, `login`, `password`) VALUES
	(81, 'qwe@qwe', 'qweqwe'),
	(85, 'pirozhok@kek.huek', 'asdasd');
/*!40000 ALTER TABLE `user_login` ENABLE KEYS */;

-- Дамп структуры для таблица developer_test.user_repo
CREATE TABLE IF NOT EXISTS `user_repo` (
  `repo_id` int NOT NULL AUTO_INCREMENT,
  `owner` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `repo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `stars` int NOT NULL,
  `forks` int NOT NULL,
  `issues` int NOT NULL,
  `created_at` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`repo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Дамп данных таблицы developer_test.user_repo: ~7 rows (приблизительно)
/*!40000 ALTER TABLE `user_repo` DISABLE KEYS */;
INSERT INTO `user_repo` (`repo_id`, `owner`, `repo`, `url`, `stars`, `forks`, `issues`, `created_at`) VALUES
	(1, 'MemboLembo', 'Anime-search', 'https://github.com/MemboLembo/Anime-search', 0, 0, 0, '2019-12-19T19:45:00Z'),
	(22, 'MemboLembo', 'RunSmart', 'https://github.com/MemboLembo/RunSmart', 0, 0, 1, '2020-02-15T15:51:20Z'),
	(23, 'MemboLembo', 'UberPartners', 'https://github.com/MemboLembo/UberPartners', 0, 0, 1, '2020-02-15T16:07:35Z'),
	(24, 'MemboLembo', 'Wordpress-promo', 'https://github.com/MemboLembo/Wordpress-promo', 0, 0, 0, '2020-02-15T16:18:09Z'),
	(31, 'roundoutandabout', 'Arduino', 'https://github.com/roundoutandabout/Arduino', 0, 0, 0, '2016-05-03T09:17:48Z'),
	(32, 'roundoutandabout', 'web-page-medicare', 'https://github.com/roundoutandabout/web-page-medicare', 0, 0, 0, '2018-06-18T14:40:05Z'),
	(46, 'MemboLembo', 'Yoga-travel-agency', 'https://github.com/MemboLembo/Yoga-travel-agency', 0, 0, 0, '2020-02-15T16:38:48Z');
/*!40000 ALTER TABLE `user_repo` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
