-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 26, 2026 at 07:05 PM
-- Server version: 8.4.7
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tender_automation_with_ai`
--

-- --------------------------------------------------------

--
-- Table structure for table `tender_tracker`
--

DROP TABLE IF EXISTS `tender_tracker`;
CREATE TABLE IF NOT EXISTS `tender_tracker` (
  `id` int NOT NULL,
  `bid_number` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `bid_status` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bid_validity` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bid_start_date` datetime DEFAULT NULL,
  `bid_end_date` datetime DEFAULT NULL,
  `bid_opening_date` datetime DEFAULT NULL,
  `buyer_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buyer_address` text COLLATE utf8mb4_unicode_ci,
  `buyer_ministry` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buyer_department` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buyer_organisation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buyer_office` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `techincal_evaluvation` json DEFAULT NULL,
  `financial_evaluvation` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tender_tracker`
--

INSERT INTO `tender_tracker` (`id`, `bid_number`, `status`, `remarks`, `created_date`, `updated_date`, `bid_status`, `quantity`, `bid_validity`, `bid_start_date`, `bid_end_date`, `bid_opening_date`, `buyer_name`, `buyer_address`, `buyer_ministry`, `buyer_department`, `buyer_organisation`, `buyer_office`, `techincal_evaluvation`, `financial_evaluvation`) VALUES
(1, 'GEM/2025/B/7011939', 'Bid Award', '', '2026-01-20 03:39:49', '2026-06-25 00:19:31', NULL, '750', NULL, NULL, NULL, NULL, 'Arun Kumar P', 'Arun Kumar P,arbuyer9746@npcil.co.in,KKNPP, NPCIL, KUDANKULAM, RADHAPURAM TALUK, TIRUNELVELI DIST, TAMILNADU,Tirunelveli,TAMIL NADU,627106,India,04637-282358-', 'Pmo', 'Department Of Atomic Energy', 'Nuclear Power Corporation Of India Limited', 'Tamilnadu', NULL, '[{\"Rank\": \"L1\", \"S.No.\": \"1\", \"Seller Name\": \"JAYASREE CHEM(MII) Under PMA\", \"Total Price\": \"` 15907500.00\", \"Offered Item\": \"Item Categories : sulphuric acid in tankers\"}, {\"Rank\": \"L2\", \"S.No.\": \"2\", \"Seller Name\": \"TEX CHEME ENTERPRISE (MII) Under PMA\", \"Total Price\": \"` 15927187.50\", \"Offered Item\": \"Item Categories : sulphuric acid in tankers\"}, {\"Rank\": \"L3\", \"S.No.\": \"3\", \"Seller Name\": \"Howrah Chemical Works (MSE,MII) Under PMA\", \"Total Price\": \"` 15967500.00\", \"Offered Item\": \"Item Categories : sulphuric acid in tankers\"}, {\"Rank\": \"L4\", \"S.No.\": \"4\", \"Seller Name\": \"UNITECH SALES AGENCY (MII) Under PMA\", \"Total Price\": \"` 20860500.00 (Bid Price)\", \"Offered Item\": \"Item Categories : sulphuric acid in tankers\"}]'),
(2, 'GEM/2026/B/7105768', 'Bid Award', 'Product Check', '2026-01-22 05:23:46', '2026-06-25 00:19:45', 'Active', '154', '180 ( Days)', '2026-01-21 14:17:10', '2026-01-31 15:00:00', '2026-01-31 15:30:00', '***********', '*********** JAISALMER', 'Ministry Of Defence', 'Department Of Military Affairs', 'Indian Army', '***********', '[{\"S.No.\": \"1\", \"Status\": \"Qualified\", \"Seller Name\": \"R.K. DISTRIBUTORS Under PMA\", \"Offered Item\": \"-\", \"MSE/MII Status\": \"MSE\", \"Participated On\": \"28-01-2026 13:46:36\"}, {\"S.No.\": \"2\", \"Status\": \"Disqualified\", \"Seller Name\": \"RADHEY RADHEY ENTERPRISES Under PMA\", \"Offered Item\": \"-\", \"MSE/MII Status\": \"MSE\", \"Participated On\": \"31-01-2026 12:03:40\"}, {\"S.No.\": \"3\", \"Status\": \"Disqualified\", \"Seller Name\": \"SUNIL PHARMACY Under PMA\", \"Offered Item\": \"-\", \"MSE/MII Status\": \"MSE\", \"Participated On\": \"31-01-2026 14:14:56\"}]', '[{\"Rank\": \"L1\", \"S.No.\": \"1\", \"Seller Name\": \"R.K. DISTRIBUTORS(MSE)( MSE Social Category:General ) Under PMA\", \"Total Price\": \"` 238775.00\", \"Offered Item\": \"Item Categories : Rapid test for scrub typus Tsutsugamushi antibody IgM IVD Kit of 50 tests,PTTK Reagent,PT Reagent,H\"}]'),
(3, 'GEM/2026/B/7198522', 'proceed', 'TOTAL VLAUE WISE EVALUATION', '2026-02-11 11:39:53', '2026-02-11 11:39:53', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'GEM/2026/B/7217718', 'Financial Evaluation', '', '2026-02-11 12:58:48', '2026-06-25 00:20:11', 'Active', '21', '110 ( Days)', '2026-02-10 14:53:11', '2026-02-23 15:00:00', '2026-02-23 15:30:00', '***********', '*********** NEW DELHI', 'Ministry Of Defence', 'Department Of Military Affairs', 'Indian Army', '***********', '[{\"S.No.\": \"1\", \"Status\": \"Evaluated\", \"Seller Name\": \"Namo India Enterprise Under PMA\", \"Offered Item\": \"-\", \"MSE/MII Status\": \"View\", \"Participated On\": \"22-02-2026 12:40:21\"}, {\"S.No.\": \"2\", \"Status\": \"Evaluated\", \"Seller Name\": \"RADHEY RADHEY ENTERPRISES Under PMA\", \"Offered Item\": \"-\", \"MSE/MII Status\": \"View\", \"Participated On\": \"12-02-2026 13:50:59\"}, {\"S.No.\": \"3\", \"Status\": \"Evaluated\", \"Seller Name\": \"S.K. SURGICAL CO. Under PMA\", \"Offered Item\": \"-\", \"MSE/MII Status\": \"View\", \"Participated On\": \"18-02-2026 13:52:33\"}, {\"S.No.\": \"4\", \"Status\": \"Evaluated\", \"Seller Name\": \"SARASWAT MEDICOSE Under PMA\", \"Offered Item\": \"-\", \"MSE/MII Status\": \"View\", \"Participated On\": \"23-02-2026 14:07:28\"}]', '[{\"S.No.\": \"1\", \"L1 Seller Name\": \"Namo India Enterprise\", \"Schedule Title\": \"Schedule 1\", \"Total L1 Price\": \"1890\"}, {\"S.No.\": \"2\", \"L1 Seller Name\": \"Namo India Enterprise\", \"Schedule Title\": \"Schedule 2\", \"Total L1 Price\": \"12176\"}, {\"S.No.\": \"3\", \"L1 Seller Name\": \"Namo India Enterprise\", \"Schedule Title\": \"Schedule 3\", \"Total L1 Price\": \"2624\"}, {\"S.No.\": \"4\", \"L1 Seller Name\": \"Namo India Enterprise\", \"Schedule Title\": \"Schedule 4\", \"Total L1 Price\": \"2416\"}, {\"S.No.\": \"5\", \"L1 Seller Name\": \"Namo India Enterprise\", \"Schedule Title\": \"Schedule 5\", \"Total L1 Price\": \"1701\"}, {\"S.No.\": \"6\", \"L1 Seller Name\": \"Namo India Enterprise\", \"Schedule Title\": \"Schedule 6\", \"Total L1 Price\": \"2046\"}, {\"S.No.\": \"7\", \"L1 Seller Name\": \"Namo India Enterprise\", \"Schedule Title\": \"Schedule 7\", \"Total L1 Price\": \"1155\"}]'),
(5, 'GEM/2026/B/7144502', 'Technical Evaluation', '', '2026-02-12 19:57:57', '2026-06-25 00:20:39', 'Active', '248', '90 ( Days)', '2026-02-11 15:07:15', '2026-03-04 16:00:00', '2026-03-04 16:30:00', 'Neelam Yadav', 'Neelam Yadav,neelam.yadav@esic.nic.in,ESIC Model hospital, Laxminagar, Ajmer road, Jaipur,JAIPUR CITY (SOUTH),RAJASTHAN,302006,India,0141-2223579-', 'Ministry Of Labour And Employment', 'Na', 'Employees State Insurance Corporation (esic)', 'Esic Model Hospital Jaipur', NULL, NULL),
(6, 'GEM/2026/B/7209438', 'Technical Evaluation', 'we will go for this tender', '2026-02-17 22:30:19', '2026-06-25 00:21:07', 'Active', '8', '180 ( Days)', '2026-02-08 22:57:58', '2026-03-02 11:00:00', '2026-03-02 11:30:00', 'Joy Mukherjee', 'Joy Mukherjee,joymukherjee@ncdc.gov.in,22 Shamnath Marg,North Delhi,DELHI,110054,India', 'Ministry Of Health And Family Welfare', 'Department Of Health And Family Welfare', 'N/a', 'National Centre For Disease Control Delhi', NULL, NULL),
(7, 'GEM/2026/B/7277739', 'Technical Evaluation', 'GEM/2026/B/7277739', '2026-03-10 13:13:18', '2026-06-25 00:21:35', 'Active', '1', '30 ( Days)', '2026-03-02 11:18:57', '2026-03-25 13:00:00', '2026-03-25 13:30:00', 'Ramsankar Padmanabhan', 'Ramsankar Padmanabhan,ram.sp.jir@nic.in,Jawaharlal Institute of Postgraduate Medical Education and Research, Dhanvantari Nagar, Puducherry,PONDICHERRY NORTH,PUDUCHERRY,605006,India,0413-2297288-', 'Ministry Of Health And Family Welfare', 'Department Of Health And Family Welfare', 'Jawaharlal Institute Of Postgraduate Medical Education And Research (jipmer)', 'Jawaharlal Institute Of Postgraduate Medical Education And Research', NULL, NULL),
(8, 'GEM/2026/B/7327927', 'Bid Award', 'Updated Workspace Test', '2026-03-29 05:59:30', '2026-06-25 00:21:49', NULL, '10000', NULL, NULL, NULL, NULL, 'Shiv Raj Singh', 'Shiv Raj Singh,buyer4.mhfw.lko@gembuyer.in,Dr.Shyama Prasad Mukherjee Hospital Park Road, Hazratganj,LUCKNOW,UTTAR PRADESH,226001,India,0522-4027513-', NULL, 'Medical Health And Family Welfare Department Uttar Pradesh', 'N/a', 'Dr.shyama Prasad Mukherjee Hospital', NULL, '[{\"Rank\": \"L1\", \"S.No.\": \"1\", \"Seller Name\": \"SANVI ENTERPRISES Under PMA\", \"Total Price\": \"` 28370000.00\", \"Offered Item\": \"Item Categories : Point of Care Rapid Test Kits for Humans – Dengue, Malaria, Typhoid & Others,Point of Care Rapid\"}, {\"Rank\": \"L2\", \"S.No.\": \"2\", \"Seller Name\": \"M/S S S TRADERS Under PMA\", \"Total Price\": \"` 28490000.00 (Bid Price)\", \"Offered Item\": \"Item Categories : Point of Care Rapid Test Kits for Humans – Dengue, Malaria, Typhoid & Others,Point of Care Rapid\"}, {\"Rank\": \"L3\", \"S.No.\": \"3\", \"Seller Name\": \"M/S UNIQUE LAB AID Under PMA\", \"Total Price\": \"` 28810000.00 (Bid Price)\", \"Offered Item\": \"Item Categories : Point of Care Rapid Test Kits for Humans – Dengue, Malaria, Typhoid & Others,Point of Care Rapid\"}]'),
(9, 'GEM/2026/B/7395529', 'Technical Evaluation', 'ai testing', '2026-03-30 02:54:18', '2026-06-25 00:22:16', 'Active', '70', '180 ( Days)', '2026-03-26 20:46:55', '2026-04-27 09:00:00', '2026-04-27 09:30:00', 'Chakradhar Jena', 'CHAKRADHAR JENA,dpm.nhm-bls@gov.in,Chief District Medical & Public Health Officer,Balasore,Baleswar,ODISHA,756001,India,06782-268559-', NULL, 'Health And Family Welfare Department Odisha', 'National Rural Health Mission', 'Cdm  And Pho Balasore', NULL, NULL),
(10, 'GEM/2026/B/7384679', 'Not Evaluated', 'sample', '2026-03-30 03:01:46', '2026-06-25 00:22:29', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'GEM/2025/B/6895200', 'Bid Award', 'xyzxz', '2026-03-31 11:03:53', '2026-06-25 00:22:43', NULL, '3000', NULL, NULL, NULL, NULL, 'Ramakrishna Manikyam', 'Ramakrishna Manikyam,dr.ramak.manikantam@esic.nic.in,ESIC MEDICAL COLLEGE AND HOSPITAL, Sanathanagar, Hyderabad,HYDERABAD,TELANGANA,500038,India,040-67872000-', 'Ministry Of Labour And Employment', 'Employees State Insuarnce Corporation', 'Employees State Insurance Corporation', 'Hyderabad', NULL, '[{\"Rank\": \"L1\", \"S.No.\": \"1\", \"Seller Name\": \"MERIL ENDO SURGERY PRIVATE LIMITED(MII) Under PMA\", \"Total Price\": \"` 536400.00\", \"Offered Item\": \"Item Categories : Skin Stapler (V2)\"}, {\"Rank\": \"L2\", \"S.No.\": \"2\", \"Seller Name\": \"C-MEDICS (MII) Under PMA\", \"Total Price\": \"` 537000.00\", \"Offered Item\": \"Item Categories : Skin Stapler (V2)\"}, {\"Rank\": \"L3\", \"S.No.\": \"3\", \"Seller Name\": \"SRI RAMA MEDICAL DISTRIBUTORS (MII) Under PMA\", \"Total Price\": \"` 540000.00 (Bid Price)\", \"Offered Item\": \"Item Categories : Skin Stapler (V2)\"}]'),
(12, 'GEM/2026/B/7655349', 'proceed', '', '2026-06-16 12:57:46', '2026-06-16 12:57:46', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, '2026/UMSCL/1159757/1', 'proceed', 'Live Tender', '2026-06-16 12:58:33', '2026-06-16 12:58:33', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, '2026/UMSCL/1159757/1', 'proceed', '', '2026-06-16 13:11:23', '2026-06-16 13:11:23', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, '2026/HFW/1027943/1', 'proceed', '', '2026-06-17 14:47:39', '2026-06-17 14:47:39', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'GEM/2026/B/7526963', 'proceed', '', '2026-06-17 14:58:12', '2026-06-17 14:58:12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, '2026/GMCK/559661/1', 'proceed', '', '2026-06-17 15:35:50', '2026-06-17 15:35:50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(18, '2026/HME/307205/7', 'proceed', '', '2026-06-17 16:54:15', '2026-06-17 16:54:15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'GEM/2026/B/7524601', 'proceed', '', '2026-06-22 15:26:34', '2026-06-22 15:26:34', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
