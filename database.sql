-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th3 12, 2024 lúc 04:43 PM
-- Phiên bản máy phục vụ: 10.3.39-MariaDB-cll-lve
-- Phiên bản PHP: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `tmquangt_book`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `active_key`
--

CREATE TABLE `active_key` (
  `email` varchar(255) DEFAULT NULL,
  `code` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `idCategory` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `challenges`
--

CREATE TABLE `challenges` (
  `idChallenge` int(11) NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `startDate` date NOT NULL DEFAULT current_timestamp(),
  `endDate` date NOT NULL DEFAULT current_timestamp(),
  `target` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dictionaries`
--

CREATE TABLE `dictionaries` (
  `idUser` int(11) DEFAULT NULL,
  `word` varchar(255) DEFAULT NULL,
  `meaning` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `sentenceContext` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `favourites_cat`
--

CREATE TABLE `favourites_cat` (
  `idUser` int(11) DEFAULT NULL,
  `idCategory` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `libraries`
--

CREATE TABLE `libraries` (
  `idLib` int(11) NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idBook` int(11) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `lastPageReading` text DEFAULT NULL,
  `modifiedTime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(11) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `birthDay` date NOT NULL DEFAULT '1970-01-01',
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `active_key`
--
ALTER TABLE `active_key`
  ADD KEY `email` (`email`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`idCategory`);

--
-- Chỉ mục cho bảng `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`idChallenge`),
  ADD KEY `idUser` (`idUser`);

--
-- Chỉ mục cho bảng `dictionaries`
--
ALTER TABLE `dictionaries`
  ADD KEY `idUser` (`idUser`);

--
-- Chỉ mục cho bảng `favourites_cat`
--
ALTER TABLE `favourites_cat`
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idCategory` (`idCategory`);

--
-- Chỉ mục cho bảng `libraries`
--
ALTER TABLE `libraries`
  ADD PRIMARY KEY (`idLib`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idBook_index` (`idBook`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `idCategory` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `challenges`
--
ALTER TABLE `challenges`
  MODIFY `idChallenge` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `libraries`
--
ALTER TABLE `libraries`
  MODIFY `idLib` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `active_key`
--
ALTER TABLE `active_key`
  ADD CONSTRAINT `active_key_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`);

--
-- Các ràng buộc cho bảng `challenges`
--
ALTER TABLE `challenges`
  ADD CONSTRAINT `challenges_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`);

--
-- Các ràng buộc cho bảng `dictionaries`
--
ALTER TABLE `dictionaries`
  ADD CONSTRAINT `dictionaries_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`);

--
-- Các ràng buộc cho bảng `favourites_cat`
--
ALTER TABLE `favourites_cat`
  ADD CONSTRAINT `favourites_cat_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`),
  ADD CONSTRAINT `favourites_cat_ibfk_2` FOREIGN KEY (`idCategory`) REFERENCES `categories` (`idCategory`);

--
-- Các ràng buộc cho bảng `libraries`
--
ALTER TABLE `libraries`
  ADD CONSTRAINT `libraries_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
