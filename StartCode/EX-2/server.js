// server.js
import express from 'express';
import courses from './course.js';
const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria
    const creditsMin = minCredits !== undefined ? Number(minCredits) : undefined;
    const creditsMax = maxCredits !== undefined ? Number(maxCredits) : undefined;

    if (
        creditsMin !== undefined && creditsMax !== undefined &&
        Number.isFinite(creditsMin) && Number.isFinite(creditsMax) &&
        creditsMin > creditsMax
    ) {
        return res.status(400).json({ error: 'Invalid credit range: minCredits cannot be greater than maxCredits.' });
    }
    let filteredCourses = courses.filter(course => course.department === dept);

    if (level) {
        filteredCourses = filteredCourses.filter(course => course.level === level);
    }
    if (minCredits) {
        filteredCourses = filteredCourses.filter(course => course.credits >= parseInt(minCredits));
    }
    if (maxCredits) {
        filteredCourses = filteredCourses.filter(course => course.credits <= parseInt(maxCredits));
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


