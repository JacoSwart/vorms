CREATE TABLE IF NOT EXISTS `vorms`.`fuel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `liters` FLOAT UNSIGNED NOT NULL,
  `amount` DECIMAL UNSIGNED NOT NULL,
  `vehicle` VARCHAR(8) NOT NULL,
  `date` DATE NOT NULL,
  `jobcard` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `vorms`.`fuel` 
  CHANGE COLUMN `amount` `amount` DECIMAL(10,2) UNSIGNED NOT NULL ;