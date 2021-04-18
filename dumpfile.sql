CREATE DATABASE  IF NOT EXISTS `assignment2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `assignment2`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: assignment2
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `catid` int NOT NULL AUTO_INCREMENT,
  `catname` varchar(45) NOT NULL,
  `description` varchar(300) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`catid`),
  UNIQUE KEY `catid_UNIQUE` (`catid`),
  UNIQUE KEY `catname_UNIQUE` (`catname`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Shooter','Use weapons to engage in the action.','2021-01-28 18:07:26'),(2,'RPG','Players take an avatar/role in a game.','2021-01-28 18:08:14'),(3,'Survival','Surviving under tough conditions','2021-01-28 18:09:00'),(4,'Action','Players is in control and center of the action','2021-01-28 18:11:20'),(5,'MOBA','Two teams compete in a pre-defined terrain','2021-01-29 02:27:48'),(6,'Simulation','A simulation video game describes a diverse super-category of video games, generally designed to closely simulate real world activities.','2021-02-07 09:06:38');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `gameid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `price` decimal(65,2) NOT NULL,
  `platform` varchar(45) NOT NULL,
  `categoryid` int NOT NULL,
  `year` year NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`gameid`),
  UNIQUE KEY `gameid_UNIQUE` (`gameid`),
  UNIQUE KEY `title_UNIQUE` (`title`),
  KEY `categoryid_idx` (`categoryid`),
  CONSTRAINT `categoryid` FOREIGN KEY (`categoryid`) REFERENCES `category` (`catid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'Spider-Man: Miles Morales','Marvel\'s Spider-Man: Miles Morales is a 2020 action-adventure game, based on the Marvel Comics superhero Miles Morales, it is inspired by both the character\'s almost decade-long comic book mythology, and the 2018 animated film Spider-Man: Into the Spider-Verse, which helped to popularize him.',67.90,'PS5',4,2020,'2021-02-07 08:43:19'),(2,'Valorant','Valorant is a team-based tactical shooter and first-person shooter set in the near future. Players play as one of a set of agents, characters designed based on several countries and cultures around the world. In the main game mode, players are assigned to either the attacking or defending team with each team having five players on it.',0.00,'PC',1,2020,'2021-02-07 08:45:15'),(3,'League of Legends','League of Legends is a 2009 multiplayer online battle arena video game developed and published by Riot Games. In the game\'s main mode, Summoner\'s Rift, a team wins by pushing through to the enemy base and destroying their \"nexus\", a large structure located within it.',0.00,'PC',5,2009,'2021-02-07 08:46:58'),(4,'Pokémon Sword and Shield','Sword and Shield takes place in the Galar region, based on the United Kingdom. The driving force bringing the player to travel around the Galar region is to take part in the \"Gym Challenge\", an open-tournament to decide the greatest Pokémon Trainer in the region, dubbed the Champion.',67.49,'Nintendo Switch',2,2019,'2021-02-07 08:49:25'),(5,'Persona 5 Royal','Persona 5 takes place in modern-day Tokyo and follows a high school student known by the pseudonym Joker who transfers to a new school after being falsely accused of assault and put on probation.',59.90,'PS4',2,2020,'2021-02-07 08:50:50'),(6,'Fortnite','A cooperative shooter-survival game for up to four players to fight off zombie-like husks, defend objects with fortifications you can build, and a battle royale mode where up to 100 players fight to be the last person standing.',0.00,'PC',1,2017,'2021-02-07 08:54:05'),(7,'Counter-Strike: Global Offensive','Counter-Strike: Global Offensive pits two teams against each other: the Terrorists and the Counter-Terrorists. Both sides are tasked with eliminating the other while also completing separate objectives.',15.00,'PC',1,2012,'2021-02-07 08:55:08'),(8,'Cyberpunk 2077','Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.',69.90,'PC',2,2020,'2021-02-07 08:56:22'),(9,'Minecraft','Minecraft is a video game in which players create and break apart various kinds of blocks in three-dimensional worlds. The game\'s two main modes are Survival and Creative. In Survival, players must find their own building supplies and food. They also interact with blocklike mobs, or moving creatures.',27.00,'PC',3,2011,'2021-02-07 08:58:14'),(10,'Red Dead Redemption 2','After a botched ferry heist in 1899, the Van der Linde gang are forced to leave their substantial money stash and flee Blackwater. Realizing the progress of civilization is ending the time of outlaws, they decide to gain enough money to escape the law and retire.',59.90,'PS4',3,2018,'2021-02-07 09:00:10'),(11,'Brawl Stars','Brawl Stars is a multiplayer online battle arena and third-person hero shooter game where players battle against other players or AI opponents in multiple game modes. Players can invite friends to play with them up to the maximum team size of the game mode.',0.00,'Mobile',5,2018,'2021-02-07 09:05:17'),(12,'Animal Crossing','In Animal Crossing, the player character is a human who lives in a village inhabited by various anthropomorphic animals, carrying out various activities such as fishing, bug catching, and fossil hunting.',85.40,'Nintendo Switch',6,2020,'2021-02-07 09:08:29'),(13,'The Legend of Zelda: Breath of the Wild','Breath of the Wild is part of the Legend of Zelda franchise and is set at the end of the Zelda timeline; the player controls Link, who awakens from a hundred-year slumber to defeat Calamity Ganon and save the kingdom of Hyrule.',69.60,'Nintendo Switch',2,2017,'2021-02-07 09:10:44'),(14,'Warframe','In Warframe, players control members of the Tenno, a race of ancient warriors who have awoken from centuries of suspended animation far into Earth\'s future to find themselves at war in the planetary system with different factions.',0.00,'PC',2,2013,'2021-02-07 09:11:38'),(15,'Grand Theft Auto V','Set within the fictional state of San Andreas, based on Southern California, the single-player story follows three protagonists—retired bank robber Michael De Santa, street gangster Franklin Clinton, and drug dealer and arms smuggler Trevor Philips—and their efforts to commit heists while under pressure from a corrupt government agency and powerful criminals.',59.90,'PC',4,2013,'2021-02-07 09:12:54'),(16,'Monster Hunter: World','n an unnamed high fantasy setting, humans and other sentient races have set their eyes on the New World, a separate continent from the populated Old World. The New World is an untamed wilderness where many powerful monsters roam free, and where researchers have been drawn to uncover new mysteries. Several ocean-bound Fleets have been sent already to establish working bases, safe from monsters, and operations are led by the Research Commission.',29.90,'PS4',4,2017,'2021-02-07 09:13:58'),(17,'Dota 2','Dota 2 is a multiplayer online battle arena (MOBA) video game in which two teams of five players compete to collectively destroy a large structure defended by the opposing team known as the \"Ancient\", whilst defending their own.',0.00,'PC',5,2013,'2021-02-07 09:15:44');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hash_password`
--

DROP TABLE IF EXISTS `hash_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hash_password` (
  `hashid` int NOT NULL AUTO_INCREMENT,
  `password` varchar(45) NOT NULL,
  `user_idx` int NOT NULL,
  PRIMARY KEY (`hashid`),
  UNIQUE KEY `hashid_UNIQUE` (`hashid`),
  KEY `userid_idx` (`user_idx`),
  CONSTRAINT `userid2` FOREIGN KEY (`user_idx`) REFERENCES `users` (`userid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hash_password`
--

LOCK TABLES `hash_password` WRITE;
/*!40000 ALTER TABLE `hash_password` DISABLE KEYS */;
INSERT INTO `hash_password` VALUES (1,'password',1),(2,'abc123',2),(3,'password',3);
/*!40000 ALTER TABLE `hash_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `imgid` int NOT NULL AUTO_INCREMENT,
  `imgpath` varchar(200) NOT NULL,
  `game_id` int NOT NULL,
  PRIMARY KEY (`imgid`),
  UNIQUE KEY `imgid_UNIQUE` (`imgid`),
  KEY `game_id_idx` (`game_id`),
  CONSTRAINT `game_id` FOREIGN KEY (`game_id`) REFERENCES `game` (`gameid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (15,'/gameimg/milesmorales-1612687399344.jpg',1),(16,'/gameimg/valorant-1612687515055.jpg',2),(17,'/gameimg/league-1612687618117.jpg',3),(18,'/gameimg/pokemonswordshield-1612687765440.jpg',4),(19,'/gameimg/p5r-1612687850529.jpg',5),(20,'/gameimg/fortnite-1612688045677.jpg',6),(21,'/gameimg/csgo-1612688108510.png',7),(22,'/gameimg/cyberpunk-1612688182038.jpg',8),(23,'/gameimg/minecraft-1612688294150.jpg',9),(24,'/gameimg/reddead-1612688410526.jpg',10),(25,'/gameimg/brawl-1612688717036.jpg',11),(26,'/gameimg/animalcrossing-1612688909652.jpeg',12),(27,'/gameimg/zelda-1612689044083.jpg',13),(28,'/gameimg/warframe-1612689098038.jpg',14),(29,'/gameimg/gta-1612689174483.jpg',15),(30,'/gameimg/monsterhunterworld-1612689238513.png',16),(31,'/gameimg/dota2-1612689344152.jpg',17);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `reviewid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `gameid` int NOT NULL,
  `content` varchar(500) NOT NULL,
  `rating` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewid`),
  UNIQUE KEY `reviewid_UNIQUE` (`reviewid`),
  KEY `gameid_idx` (`gameid`),
  KEY `userid_idx` (`userid`),
  CONSTRAINT `gameid` FOREIGN KEY (`gameid`) REFERENCES `game` (`gameid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (22,1,1,'Best game ever!',5,'2021-02-07 08:56:39'),(23,1,2,'The game is devent. Much more room for improvement.',4,'2021-02-07 08:56:59'),(24,2,12,'good',5,'2021-02-07 09:16:21'),(25,2,14,'good',5,'2021-02-07 09:16:29'),(26,2,17,'good',5,'2021-02-07 09:16:38'),(27,2,1,'yes best game ever',5,'2021-02-07 09:16:48'),(28,2,11,'pew pew fun game',5,'2021-02-07 09:17:01'),(29,2,5,'i like the characters',5,'2021-02-07 09:17:11'),(30,2,8,'absolute dogshit',1,'2021-02-07 09:17:27'),(31,2,9,'best kids game',3,'2021-02-07 09:17:39'),(32,2,6,'minecraft + pubg',5,'2021-02-07 09:17:58');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(120) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `userid_UNIQUE` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'TYH','admin','tyh@gmail.com','$2b$10$gkE5mamOizWGUhN5q8Fxre9lc80hJ/vRVMYMIFIZj5T3vhZsL465q','2021-01-28 15:45:51'),(2,'terry','customer','terry@gmail.com','$2b$10$a3/u//AtwJu/dCnBfAdbgumO7lhdppqhG6NhGuPRashIx5uVX5hqy','2021-01-31 16:36:09'),(3,'bryan','customer','bryan@abc.com','$2b$10$oN/t8rHFcRIiYfF265qE1eoB6g3FbKWUdPsQVdbjj6k2O7gV11TDm','2021-02-05 12:37:44');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'assignment2'
--

--
-- Dumping routines for database 'assignment2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-07 17:50:55
