USE colors_test;

CREATE TABLE Users (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Login VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL
);

CREATE TABLE Colors (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    Name VARCHAR(100) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(ID)
);

INSERT INTO Users (ID, FirstName, LastName, Login, Password) VALUES
    (1, 'Test', 'User', 'testuser', 'testpass'),
    (2, 'Other', 'User', 'otheruser', 'otherpass');

INSERT INTO Colors (UserID, Name) VALUES
    (1, 'Red'),
    (1, 'Royal Blue'),
    (2, 'Private Green');
