const { body } = require("express-validator");

function createProjectValidator() {
  return [
    body("title").notEmpty().withMessage("عنوان پروژه نمیتواند خالی باشد"),
    body("text")
      .notEmpty()
      .isLength({ min: 20 })
      .withMessage("حداقل باید 25 نویسه داشته باشد"),
    body("tags").custom((tags) => {
      if (!tags) {
        return true;
      }
      if (Array.isArray(tags)) {
        if (tags.length > 10) throw " حداکثر استفاده از هشتگ ها 10 عدد میباشد ";
        return true
      }
      throw tags;
    }),
    body("display").isBoolean().withMessage("مقادیر معتبر نیست")
  ];
}

module.exports = {
  createProjectValidator,
};
