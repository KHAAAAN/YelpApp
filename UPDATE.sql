USE MS2;

UPDATE Businesses B
set B.stars = (SELECT AVG(R.stars)
             FROM Reviews R
             WHERE R.business_id = B.business_id
             GROUP BY B.business_id);
             
UPDATE Businesses B
set B.review_count = (SELECT COUNT(*)
                      FROM Reviews R 
                      Where R.business_id = B.business_id;
