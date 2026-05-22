// server.js
import express from 'express';
import courses from './course.js';
import logger from './logger.js';
import validateQuery from './validateQuery.js';
import auth from './auth.js';

const app = express();
const PORT = 3000;

app.use(logger);
// Route: GET /departments/:dept/courses

app.get('/departments/:dept/courses', validateQuery, auth, (req, res) => {
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    let filteredCourses = courses.filter(course => course.department === dept);
    if (level) {
        filteredCourses = filteredCourses.filter(course => course.level === level);
    }
    if (minCredits !== undefined) {
        filteredCourses = filteredCourses.filter(course => course.credits >= Number(minCredits));
    }
    if (maxCredits !== undefined) {
        filteredCourses = filteredCourses.filter(course => course.credits <= Number(maxCredits));
    }
    if (semester) {
        filteredCourses = filteredCourses.filter(course => course.semester === semester);
    }
    if (instructor) {
        filteredCourses = filteredCourses.filter(course => course.instructor === instructor);
    }
    res.json(filteredCourses);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
