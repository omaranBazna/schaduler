CREATE TABLE Course (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_name TEXT,
    course_code TEXT,
    course_majors TEXT,
    course_years TEXT,
    course_semesters TEXT,
    has_lab INTEGER,
    course_type INTEGER,
    course_notes TEXT
);

CREATE TABLE Professors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    professor_name TEXT,
    professor_major TEXT,
    professor_courses TEXT,
    availabilities TEXT,
    professor_type TEXT,
    professor_notes TEXT
);

CREATE TABLE Availabilities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day INTEGER,
    hours INTEGER,
    minutes INTEGER,
    duration INTEGER,
    professor_id INTEGER
);

CREATE TABLE Schedules(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_modified DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER update_last_modified
AFTER UPDATE ON Schedules
FOR EACH ROW
BEGIN
    UPDATE Schedules SET last_modified = CURRENT_TIMESTAMP WHERE id = old.id;
END;

CREATE TABLE Events(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   professor_id int,
   course_id int,
   major int,
   year int,
   semester int,
   type TEXT,
   startDate TEXT,
   endDate TEXT,
   day int,
   schedule_id int
);