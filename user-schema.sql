CREATE TABLE `usermanage`.`user` ( `id` INT NOT NULL , `first_name` VARCHAR(45) NOT NULL , `last_name` VARCHAR(45) NOT NULL , `email` VARCHAR(45) NOT NULL , `phone` INT NOT NULL , `comments` TEXT NOT NULL , `status` VARCHAR(45) NOT NULL DEFAULT 'active' ) ENGINE = InnoDB;
