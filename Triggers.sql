USE MS2;

delimiter //

CREATE TRIGGER updateStarsAndReviewCountOnInsert BEFORE INSERT ON Reviews
    FOR EACH ROW 
    BEGIN
        UPDATE Businesses SET review_count = review_count + 1 WHERE business_id = NEW.business_id;
        UPDATE Businesses B SET B.stars = (SELECT SUM(stars)
                                           FROM Reviews R 
                                           Where R.business_id = B.business_id) + NEW.stars /
                                           (SELECT COUNT(*)
                                            FROM REVIEWS R 
                                            WHERE R.business_id = B.business_id) + 1;
                                           
    END;//
    
delimiter ;


delimiter //
    
CREATE TRIGGER updateStarsAndReviewCountOnDelete BEFORE DELETE ON Reviews
FOR EACH ROW 
BEGIN
    UPDATE Businesses SET review_count = review_count - 1 WHERE business_id = OLD.business_id;
    UPDATE Businesses B SET B.stars = ((SELECT SUM(stars)
                                       FROM Reviews R 
                                       Where R.business_id = B.business_id) - OLD.stars) /
                                       ((SELECT COUNT(*)
                                        FROM REVIEWS R 
                                        WHERE R.business_id = B.business_id) - 1);
                                       
END;//

delimiter ;

delimiter //

CREATE TRIGGER OpenOnly BEFORE Insert ON Reviews
FOR EACH ROW 
BEGIN
    IF true <> (SELECT open
                FROM Businesses B
                WHERE R.business_id = B.business_id)
	THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An error occured';
    END IF;
END;//

delimiter ;
