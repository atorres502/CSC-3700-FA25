// controllers/studentController.js
const Student = require('../models/studentModel');

/* ---------- READ: list all candies ---------- */
exports.list = async (req, res, next) => {
    try {
        let q = (req.query.q ?? '').trim().toLowerCase();

        // example abbreviation expansion (optional)
        const majorMap = { cs: "computer science" };
        if (majorMap[q]) q = majorMap[q];

        const students = await Student.findAll({ q });
        const noResults = students.length === 0;

        res.render('student', {
            title: 'Students',
            students,
            q: req.query.q ?? '',
            noResults
        });
    } catch (err) {
        next(err);
    }
};

/* ---------- READ: show one student by ID ---------- */
exports.show = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0)
            return res.status(400).send('Invalid id');

        const student = await Student.findById(id);
        if (!student)
            return res.status(404).send('Student not found');

        res.render('studentDetails', { title: `Student #${id}`, student });
    } catch (err) {
        next(err);
    }
};

/* ---------- CREATE: show new candy form ---------- */
exports.newForm = (req, res) => {
    res.render('studentForm', {
        title: 'Add Student',
        mode: 'create',
        student: { FirstName: '', LastName: '', Major: '', GPA: '' },
        action: '/student?_method=POST',
        submitLabel: 'Create'
    });
};

/* ---------- CREATE: insert new student ---------- */
exports.create = async (req, res, next) => {
    try {
        const { FirstName, LastName, Major, GPA } = scrub(req.body);
        const errors = [];

        if (!FirstName) errors.push("First Name is required.");
        if (!LastName) errors.push("Last Name is required.");

        if (Major && Major.length > 20)
            errors.push("Major must be 20 characters or less.");

        if (GPA !== null && (isNaN(GPA) || GPA < 0 || GPA > 5))
            errors.push("GPA must be a number between 0.00 and 5.00.");

        if (errors.length > 0) {
            return res.render("studentForm", {
                title: "Add Student",
                mode: "create",
                student: { FirstName, LastName, Major, GPA },
                action: "/student?_method=POST",
                submitLabel: "Create",
                errors
            });
        }

        const id = await Student.create({ FirstName, LastName, Major, GPA });
        res.redirect(`/student/${id}`);
    } catch (err) {
        next(err);
    }
};

/* ---------- UPDATE: show edit form ---------- */
exports.editForm = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0)
            return res.status(400).send('Invalid id');

        const student = await Student.findById(id);
        if (!student)
            return res.status(404).send('Student not found');

        res.render('studentForm', {
            title: `Edit Student #${id}`,
            mode: 'edit',
            student,
            action: `/student/${id}?_method=PUT`,
            submitLabel: 'Update'
        });
    } catch (err) {
        next(err);
    }
};
/* ---------- UPDATE: save updated record ---------- */
exports.update = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0)
            return res.status(400).send("Invalid id");

        const { FirstName, LastName, Major, GPA } = scrub(req.body);
        const errors = [];

        // ---- VALIDATION ----
        if (!FirstName) errors.push("First Name is required.");
        if (!LastName) errors.push("Last Name is required.");

        if (Major && Major.length > 20)
            errors.push("Major must be 20 characters or less.");

        if (GPA !== null && (isNaN(GPA) || GPA < 0 || GPA > 5))
            errors.push("GPA must be a number between 0.00 and 5.00.");

        // If validation failed
        if (errors.length > 0) {
            return res.render("studentForm", {
                title: `Edit Student #${id}`,
                mode: "edit",
                student: { FirstName, LastName, Major, GPA },
                action: `/student/${id}?_method=PUT`,
                submitLabel: "Update",
                errors
            });
        }

        // ---- SAVE ----
        const updated = await Student.updateById(id, { FirstName, LastName, Major, GPA });
        if (!updated) return res.status(404).send("Student not found");

        res.redirect(`/student/${id}`);
    } catch (err) {
        next(err);
    }
};

exports.destroy = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0)
            return res.status(400).send('Invalid id');

        const deleted = await Student.deleteById(id);
        if (!deleted)
            return res.status(404).send('Student not found');

        res.redirect('/');
    } catch (err) {
        next(err);
    }
};
function scrub({ FirstName, LastName, Major, GPA }) {
    return {
        FirstName: String(FirstName ?? '').trim(),    //?? is the nullish operator. a ?? b means: give me a if
        LastName: String(LastName ?? '').trim(),          //its not null or undefined, otherwise, use b
        Major: String(Major ?? '').trim(),            //almost like a shortened ternary operator
        GPA: Number(GPA ?? 0) || null
    };
}