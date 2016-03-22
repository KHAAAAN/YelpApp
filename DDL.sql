CREATE TABLE Democgraphics (
    zipcode char(5) PRIMARY KEY,
    state_code char(2),
    city varchar(100),
    state varchar(20),
    population integer,
    under_18 float,
    age18_to_25 float,
    age25_to_44  float,
    age45_to_64 float,
    age65_older float,
    median_age float,
    percent_females float,
    num_employee integer,
    annual_payroll integer,
    avg_income float
);


CREATE TABLE Businesses (
    business_id varchar(30) PRIMARY KEY,
    stars float,
    full_address varchar(300),
    open boolean,
    city varchar(100),
    review_count integer,
    state char(2)
);


CREATE TABLE Attributes (
    attr_name varchar(50) PRIMARY KEY,
    attr_value varchar(50)
);


CREATE TABLE BusinessToAttributes (
    business_id varchar(30) REFERENCES Businesses(business_id),
    attr_name varchar(50) REFERENCES Attributes(attr_name),
    attr_value varchar(50) REFERENCES Attributes(attr_value),
    PRIMARY KEY (business_id, attr_name, attr_value)
);


CREATE TABLE Subattributes (
    subattr_name varchar(50),
    subattr_value varchar(50), 
    PRIMARY KEY (subattr_name, subattr_value)
);


CREATE TABLE AttributeToSub (
    attr_name varchar(50) REFERENCES Attributes(attr_name),
    subattr_name varchar(50) REFERENCES Subattributes(subattr_name),
    subattr_value varchar(50) REFERENCES Subattributes(subattr_value),
    PRIMARY KEY (attr_name, subattr_name, subattr_value)
);


CREATE TABLE SubToSub (
    parent varchar(50) REFERENCES Subattributes(parent),
    child varchar(50) REFERENCES Subattributes(child),
    PRIMARY KEY (parent, child)
);


CREATE TABLE Category (
    category varchar(50) PRIMARY KEY
);


CREATE TABLE CategoriesToBusiness(
    business_id varchar(30) REFERENCES Businesses(business_id),
    category varchar(50) REFERENCES Category(category),
    PRIMARY KEY(business_id, category)
);



CREATE TABLE AttributesToCategories (
    attr_name varchar(50) REFERENCES Attributes(attr_name),
    category varchar(50) REFERENCES Category(category),
    PRIMARY KEY (attr_name, category)
);


CREATE TABLE Users(
    user_id varchar(30) PRIMARY KEY,
    review_count integer,
    name varchar(100),
    funny integer,
    useful integer,
    cool integer,
    average_stars float,
    fans integer
);


CREATE TABLE Reviews (
    review_id varchar(30) PRIMARY KEY,
    business_id varchar(30) REFERENCES Businesses(business_id),
    user_id varchar(30) REFERENCES Users(user_id),
    stars integer,
    date char(10),
    text varchar(253),
    funny integer,
    useful integer,
    cool integer
);
