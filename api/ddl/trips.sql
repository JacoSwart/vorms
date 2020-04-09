CREATE TABLE `vorms`.`trips` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `departure` VARCHAR(20) NOT NULL,
  `destination` VARCHAR(20) NOT NULL,
  `startodo` decimal unsigned NOT NULL,
  `endodo` decimal unsigned NOT NULL,
  'totalkm' decimal unsigned not null,
  'pvtkm' decimal unsigned not null,
  'client' varchar(20) not NULL,
  'tollgates' varchar(8) not null,
  `vehicle` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`id`));