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

CREATE TABLE Availability (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day INTEGER,
    hours INTEGER,
    minutes INTEGER,
    duration INTEGER
);