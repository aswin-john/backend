const roleMiddleware = (allowedRole) => {
  return (req, res, next) => {
    // Check whether the user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first",
      });
    }
    // Checl whether user has required role
    if (req.user.role !== allowedRole) {
      return res.status(403).json({
        success: false,
        message:
          "Forbidden. You do not have permission to access this resource",
      });
    }

    next();
  };
};

module.exports = roleMiddleware;
