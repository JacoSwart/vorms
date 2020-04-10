CREATE TABLE `vorms`.`trips` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `departure` VARCHAR(20) NOT NULL,
  `destination` VARCHAR(20) NOT NULL,
  `startodo` DECIMAL UNSIGNED NOT NULL,
  `endodo` DECIMAL UNSIGNED NOT NULL,
  `totalkm` DECIMAL UNSIGNED NOT null,
  `pvtkm` DECIMAL UNSIGNED NOT null,
  `client` VARCHAR(20) NOT NULL,
  `tollgates` VARCHAR(8) NOT null,
  `vehicle` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`id`));