export const protect = (req, res, next) => {
    if (req.session && req.session.userId) {
        next(); // User is authenticated
    } else {
        res.status(401).json({ message: 'Not authorized' });
    }
};
