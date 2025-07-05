module.exports = function checkOwnership(dataCompanyId, req) {
  if (req.user.role === "admin") return true;
  return Number(req.user.company_id) === Number(dataCompanyId);
};
