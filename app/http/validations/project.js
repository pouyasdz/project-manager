const { body } = require("express-validator");

function createProjectValidator() {
    return [
        body('title').notEmpty().withMessage("عنوان پروژه نمیتواند خالی باشد"),
        body('text').notEmpty().isLength({min:20}).withMessage("حداقل باید 25 نویسه داشته باشد")
    ]
}

module.exports = {
    createProjectValidator
}