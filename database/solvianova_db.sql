-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: solvianova_db
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `solvianova_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `solvianova_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `solvianova_db`;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('superadmin','admin') NOT NULL DEFAULT 'admin',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'Super Admin','admin','admin@solvianova.com','$2y$10$q3/0wk6Iaap8o/jCbMwTZuY3oXZVppfN3eEBmwoWKtkfLBBAv4sxS','superadmin',1,'2026-10-29 16:44:49','2026-10-29 16:52:28');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `slug` varchar(270) NOT NULL,
  `excerpt` varchar(400) DEFAULT NULL,
  `content` longtext NOT NULL,
  `thumbnail` varchar(300) DEFAULT NULL,
  `category` varchar(80) DEFAULT NULL,
  `tags` varchar(300) DEFAULT NULL,
  `meta_title` varchar(200) DEFAULT NULL,
  `meta_desc` varchar(300) DEFAULT NULL,
  `status` enum('draft','published') NOT NULL DEFAULT 'draft',
  `author_id` int(10) unsigned DEFAULT NULL,
  `views` int(10) unsigned NOT NULL DEFAULT 0,
  `published_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_slug` (`slug`),
  KEY `idx_status` (`status`),
  KEY `idx_category` (`category`),
  KEY `idx_published` (`published_at`),
  KEY `fk_article_author` (`author_id`),
  CONSTRAINT `fk_article_author` FOREIGN KEY (`author_id`) REFERENCES `admins` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `group` enum('portfolio','services','articles') NOT NULL DEFAULT 'portfolio',
  `order` int(10) unsigned NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_id` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'p-1','Website','portfolio',1,'2026-10-29 16:52:28'),(2,'p-2','Dashboard','portfolio',2,'2026-10-29 16:52:28'),(3,'p-3','Mobile','portfolio',3,'2026-10-29 16:52:28'),(4,'p-4','Automation','portfolio',5,'2026-10-29 16:52:28'),(5,'p-5','Branding','portfolio',6,'2026-10-29 16:52:28'),(6,'p-6','Enterprise','portfolio',7,'2026-10-29 16:52:28'),(7,'p-7','Internet Of Things','portfolio',7,'2026-10-29 16:52:28'),(8,'p-8','Landing Page','portfolio',8,'2026-10-29 16:52:28'),(9,'s-1','Website Development','services',1,'2026-10-29 16:52:28'),(10,'s-2','System Development','services',2,'2026-10-29 16:52:28'),(11,'s-3','Branding & Creative','services',3,'2026-10-29 16:52:28'),(12,'s-4','Automation & AI','services',4,'2026-10-29 16:52:28'),(13,'a-1','Insight','articles',1,'2026-10-29 16:52:28'),(14,'a-2','Tutorial','articles',2,'2026-10-29 16:52:28'),(15,'a-3','News','articles',3,'2026-10-29 16:52:28');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gallery` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `image` varchar(300) NOT NULL,
  `caption` varchar(200) DEFAULT NULL,
  `sort_order` smallint(6) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_items`
--

DROP TABLE IF EXISTS `invoice_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoice_items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` int(10) unsigned NOT NULL,
  `description` varchar(300) NOT NULL,
  `details` text DEFAULT NULL,
  `qty` int(10) unsigned NOT NULL DEFAULT 1,
  `price` bigint(20) NOT NULL DEFAULT 0,
  `total` bigint(20) NOT NULL DEFAULT 0,
  `sort_order` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_invoice_id` (`invoice_id`),
  CONSTRAINT `fk_invoice_items_invoice` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_items`
--

LOCK TABLES `invoice_items` WRITE;
/*!40000 ALTER TABLE `invoice_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoices` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `invoice_number` varchar(50) NOT NULL,
  `invoice_date` date NOT NULL,
  `client_name` varchar(200) NOT NULL,
  `client_address` text DEFAULT NULL,
  `client_email` varchar(150) DEFAULT NULL,
  `client_phone` varchar(50) DEFAULT NULL,
  `project_name` varchar(200) NOT NULL,
  `project_package` varchar(200) DEFAULT NULL,
  `project_duration` varchar(200) DEFAULT NULL,
  `payment_method` varchar(200) DEFAULT NULL,
  `subtotal` bigint(20) NOT NULL DEFAULT 0,
  `discount` bigint(20) NOT NULL DEFAULT 0,
  `total` bigint(20) NOT NULL DEFAULT 0,
  `bank_name` varchar(100) DEFAULT NULL,
  `bank_account` varchar(100) DEFAULT NULL,
  `bank_holder` varchar(200) DEFAULT NULL,
  `bank_type` varchar(100) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `signatory_name` varchar(200) DEFAULT NULL,
  `signatory_role` varchar(200) DEFAULT NULL,
  `signature_image` varchar(255) DEFAULT NULL,
  `status` enum('draft','sent','paid','cancelled') NOT NULL DEFAULT 'draft',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoice_number` (`invoice_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `letters`
--

DROP TABLE IF EXISTS `letters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `letters` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `letter_id` varchar(50) NOT NULL,
  `letter_no` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `type_label` varchar(100) NOT NULL,
  `classification` enum('Keluar','Masuk') NOT NULL DEFAULT 'Keluar',
  `confidentiality` enum('Biasa','Penting','Rahasia') NOT NULL DEFAULT 'Biasa',
  `subject` varchar(255) NOT NULL,
  `attachments` varchar(255) DEFAULT NULL,
  `date` varchar(50) NOT NULL,
  `recipient_name` varchar(150) NOT NULL,
  `recipient_position` varchar(150) DEFAULT NULL,
  `recipient_company` varchar(200) DEFAULT NULL,
  `recipient_address` text DEFAULT NULL,
  `recipient_city` varchar(100) DEFAULT NULL,
  `salutation` varchar(100) DEFAULT 'Dengan hormat,',
  `opening` text DEFAULT NULL,
  `points` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`points`)),
  `closing` text DEFAULT NULL,
  `sender_name` varchar(150) NOT NULL,
  `sender_position` varchar(150) DEFAULT NULL,
  `sender_location` varchar(100) DEFAULT 'Sukoharjo',
  `has_stamp` tinyint(1) NOT NULL DEFAULT 1,
  `has_signature` tinyint(1) NOT NULL DEFAULT 1,
  `status` enum('Draft','Terkirim','Disetujui','Selesai') NOT NULL DEFAULT 'Draft',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `letter_id` (`letter_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `letters`
--

LOCK TABLES `letters` WRITE;
/*!40000 ALTER TABLE `letters` DISABLE KEYS */;
INSERT INTO `letters` VALUES (1,'let-001','005/SN-PNW/X/2026','penawaran','Surat Penawaran','Keluar','Penting','Penawaran Solusi Pengembangan Sistem ERP & Warehouse Management','1 (Satu) Berkas Proposal Teknis & Biaya','28 Oktober 2026','Bpk. Hendra Pratama, S.T.','Direktur Operasional','PT. Bahtera Logistik Nusantara','Kawasan Industri Candi Blok C-12, Ngaliyan','Semarang, Jawa Tengah','Dengan hormat,','Sehubungan dengan diskusi awal mengenai rencana digitalisasi operasional pergudangan dan supply chain di PT. Bahtera Logistik Nusantara, bersama surat ini kami dari Solvia Nova mengajukan proposal penawaran teknis dan implementasi solusi digital sebagai berikut:','[{\"id\":\"p1\",\"label\":\"Ruang Lingkup Proyek\",\"value\":\"Pengembangan Custom Web ERP, Modul Barcode Scanning Real-Time, Multi-Warehouse Dashboard, dan REST API Integration.\"},{\"id\":\"p2\",\"label\":\"Teknologi yang Digunakan\",\"value\":\"Next.js App Router, Node.js Microservices, PostgreSQL Enterprise, Redis Cache, dan Docker Cloud Deployment.\"},{\"id\":\"p3\",\"label\":\"Estimasi Waktu Pengerjaan\",\"value\":\"45 (Empat Puluh Lima) Hari Kerja termasuk fase User Acceptance Testing (UAT) dan pelatihan operator.\"}]','Demikian surat penawaran ini kami sampaikan. Besar harapan kami untuk dapat menjalin kerja sama strategis dalam mendukung akselerasi digital operasional perusahaan Bapak. Atas perhatian dan kepercayaan yang diberikan, kami ucapkan terima kasih.','Nanda Ari Wahyu Widagdo','Direktur Utama','Sukoharjo',1,1,'Disetujui','2026-10-29 16:52:28',NULL);
/*!40000 ALTER TABLE `letters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `subject` varchar(200) DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_read` (`is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolios`
--

DROP TABLE IF EXISTS `portfolios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portfolios` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `slug` varchar(220) NOT NULL,
  `category` varchar(50) NOT NULL DEFAULT 'Website',
  `short_desc` varchar(300) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `tech_stack` varchar(300) DEFAULT NULL,
  `client` varchar(150) DEFAULT NULL,
  `year` year(4) DEFAULT NULL,
  `project_url` varchar(300) DEFAULT NULL,
  `thumbnail` varchar(300) DEFAULT NULL,
  `case_study` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`case_study`)),
  `sort_order` smallint(6) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_slug` (`slug`),
  KEY `idx_category` (`category`),
  KEY `idx_active` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolios`
--

LOCK TABLES `portfolios` WRITE;
/*!40000 ALTER TABLE `portfolios` DISABLE KEYS */;
INSERT INTO `portfolios` VALUES (1,'E-Commerce Platform','e-commerce-platform','Website','Platform belanja online lengkap dengan manajemen produk, payment gateway, dan laporan penjualan real-time.',NULL,'Laravel, Vue.js, MySQL, Midtrans','PT Nusantara Digital',2024,NULL,NULL,'{\"Problem\":\"UMKM fashion lokal kehilangan potensi penjualan karena tidak memiliki platform online yang proper.\",\"Analysis\":\"Analisis menunjukkan 70% pelanggan potensial mengakses via mobile dan membutuhkan proses checkout yang cepat.\",\"Solution\":\"Platform e-commerce custom dengan UX yang dioptimasi untuk konversi dan mobile-first design.\",\"Technology\":\"Laravel untuk backend, Vue.js untuk frontend interaktif, Midtrans untuk payment gateway.\",\"Result\":\"Penjualan online meningkat 300% dalam 6 bulan pertama, bounce rate turun 45%.\"}',1,1,'2026-10-29 16:44:49',NULL),(2,'ERP Manufacturing System','erp-manufacturing-system','Enterprise','Sistem ERP terintegrasi untuk manajemen produksi, inventory, dan supply chain perusahaan manufaktur.',NULL,'PHP, React, PostgreSQL, Redis','PT Maju Industri',2024,NULL,NULL,'{\"Problem\":\"Perusahaan manufaktur dengan 200+ karyawan kesulitan mengelola inventory, produksi, dan laporan secara manual.\",\"Analysis\":\"Proses manual menyebabkan kesalahan data 15% dan keterlambatan laporan 3 hari.\",\"Solution\":\"Implementasi ERP terintegrasi yang menghubungkan seluruh departemen dalam satu platform real-time.\",\"Technology\":\"PHP untuk backend, React untuk dashboard interaktif, PostgreSQL untuk database, Redis untuk caching.\",\"Result\":\"Efisiensi operasional meningkat 60%, waktu pelaporan berkurang dari 3 hari menjadi real-time.\"}',2,1,'2026-10-29 16:44:49',NULL),(3,'HR Management System','hr-management-system','Dashboard','Sistem manajemen SDM lengkap: absensi, payroll, rekrutmen, dan evaluasi kinerja karyawan.',NULL,'PHP Native, MySQL, TailwindCSS','CV Berkah Jaya',2023,NULL,NULL,'{\"Problem\":\"Proses HR yang manual menyebabkan kesalahan payroll dan ketidakakuratan data karyawan.\",\"Analysis\":\"Rata-rata 8 jam/minggu terbuang untuk rekap absensi dan kalkulasi gaji manual.\",\"Solution\":\"Sistem HR digital dengan otomasi payroll, absensi digital, dan dashboard analytics.\",\"Technology\":\"PHP Native untuk performa optimal, MySQL untuk database, TailwindCSS untuk UI modern.\",\"Result\":\"Akurasi payroll 100%, waktu proses HR berkurang 70%, kepuasan karyawan meningkat signifikan.\"}',3,1,'2026-10-29 16:44:49',NULL),(4,'Company Profile Premium','company-profile-premium','Website','Website company profile dengan CMS custom, SEO optimized, dan performa tinggi.',NULL,'PHP, TailwindCSS, AlpineJS','PT Solusi Terbaik',2024,NULL,NULL,NULL,4,1,'2026-10-29 16:44:49',NULL),(5,'Brand Identity FMCG','brand-identity-fmcg','Branding','Rebranding lengkap untuk perusahaan consumer goods ÔÇö logo, guidelines, packaging, dan aset digital.',NULL,'Figma, Illustrator, After Effects','Brand Lokal Indonesia',2023,NULL,NULL,NULL,5,1,'2026-10-29 16:44:49',NULL),(6,'WhatsApp Automation Bot','whatsapp-automation-bot','Automation','Bot WhatsApp cerdas untuk customer service otomatis, notifikasi order, dan follow-up pelanggan.',NULL,'Node.js, WhatsApp API, MySQL','Toko Online Nusantara',2024,NULL,NULL,NULL,6,1,'2026-10-29 16:44:49',NULL);
/*!40000 ALTER TABLE `portfolios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `slug` varchar(170) NOT NULL,
  `category` varchar(80) NOT NULL,
  `short_desc` varchar(300) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `sort_order` smallint(6) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_category` (`category`),
  KEY `idx_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(100) NOT NULL,
  `value` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  KEY `idx_key` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'site_name','Solvia Nova'),(2,'site_email','solvianova23@gmail.com'),(3,'site_phone','+62 831-4880-1578'),(4,'site_whatsapp','6283148801578'),(5,'site_instagram','@solvianova'),(6,'site_linkedin','solvianova'),(7,'site_address','Dusun Brambang Rt 01/02, Kelurahan Blimbing, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah'),(8,'seo_title','Solvia Nova ÔÇö Digital Solution & Software House Modern'),(9,'seo_description','Solvia Nova membantu bisnis membangun sistem digital, website, aplikasi, dan branding modern dengan visual premium dan performa profesional.'),(10,'seo_keywords','software house, digital solution, website development, system development, branding, UI/UX, automation'),(11,'google_analytics',''),(12,'google_search_console','');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_members`
--

DROP TABLE IF EXISTS `team_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_members` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `bio` text DEFAULT NULL,
  `skills` varchar(300) DEFAULT NULL,
  `photo` varchar(300) DEFAULT NULL,
  `linkedin` varchar(200) DEFAULT NULL,
  `sort_order` smallint(6) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_members`
--

LOCK TABLES `team_members` WRITE;
/*!40000 ALTER TABLE `team_members` DISABLE KEYS */;
INSERT INTO `team_members` VALUES (1,'Solvia Nova','Founder & CEO','Memimpin visi dan strategi Solvia Nova dalam membangun ekosistem digital yang berdampak. Berpengalaman lebih dari 5 tahun di industri teknologi dan digital business.','PHP, System Architecture, Business Strategy, Project Management',NULL,NULL,1,1,'2026-10-29 16:44:49',NULL),(2,'Dev Team','Lead Fullstack Developer','Membangun sistem dan aplikasi web dengan standar kode yang bersih dan performa tinggi. Spesialis dalam membangun aplikasi yang scalable.','Laravel, React, Vue.js, MySQL, Docker, Redis',NULL,NULL,2,1,'2026-10-29 16:44:49',NULL),(3,'Design Team','UI/UX Designer','Merancang pengalaman pengguna yang intuitif dan visual yang premium untuk setiap produk digital yang kami bangun.','Figma, Framer, TailwindCSS, Motion Design, Prototyping',NULL,NULL,3,1,'2026-10-29 16:44:49',NULL),(4,'Content Team','Content Strategist','Membangun narasi brand yang kuat dan strategi konten yang menggerakkan audiens. Spesialis SEO dan digital marketing.','Copywriting, SEO, Social Media Strategy, Analytics',NULL,NULL,4,1,'2026-10-29 16:44:49',NULL),(5,'Analyst Team','System Analyst','Menjembatani kebutuhan bisnis dengan solusi teknis. Memastikan setiap sistem yang dibangun benar-benar menjawab masalah nyata.','Business Analysis, ERD, System Design, Documentation, QA',NULL,NULL,5,1,'2026-10-29 16:44:49',NULL);
/*!40000 ALTER TABLE `team_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `testimonials` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `client_name` varchar(100) NOT NULL,
  `company` varchar(150) DEFAULT NULL,
  `testimonial` text NOT NULL,
  `rating` tinyint(4) NOT NULL DEFAULT 5,
  `photo` varchar(300) DEFAULT NULL,
  `result` varchar(200) DEFAULT NULL,
  `sort_order` smallint(6) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (1,'Budi Santoso','CEO, PT Maju Bersama','Solvia Nova benar-benar mengubah cara kami beroperasi. Sistem ERP yang mereka bangun sangat intuitif dan tim kami langsung bisa adaptasi. Highly recommended!',5,NULL,NULL,1,1,'2026-10-29 16:44:49',NULL),(2,'Rina Wijaya','Founder, Toko Online Nusantara','Website e-commerce kami sekarang jauh lebih profesional. Penjualan meningkat 40% dalam 3 bulan pertama setelah launch. Tim Solvia Nova sangat responsif dan profesional.',5,NULL,NULL,2,1,'2026-10-29 16:44:49',NULL),(3,'Ahmad Fauzi','Marketing Director, Brand Lokal','Branding yang mereka rancang benar-benar merepresentasikan nilai brand kami. Proses kerja sama sangat menyenangkan dan hasilnya melebihi ekspektasi.',5,NULL,NULL,3,1,'2026-10-29 16:44:49',NULL);
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-29 16:52:44
