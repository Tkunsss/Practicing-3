function validateQuery(req, res, next) {
    const { minCredits, maxCredits } = req.query;
    const integerPattern = /^-?\d+$/;

    if (minCredits !== undefined && !integerPattern.test(minCredits)) {
        return res.status(400).json({
            error: "minCredits must be an integer"
        });
    }

    if (maxCredits !== undefined && !integerPattern.test(maxCredits)) {
        return res.status(400).json({
            error: "maxCredits must be an integer"
        });
    }

    const min = minCredits !== undefined ? Number(minCredits) : undefined;
    const max = maxCredits !== undefined ? Number(maxCredits) : undefined;

    if (min !== undefined && max !== undefined && min > max) {
        return res.status(400).json({
            error: "minCredits cannot be greater than maxCredits"
        });
    }

    next();
}

export default validateQuery;
